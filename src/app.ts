import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schemas/schemas";
import { resolvers } from "./graphql/resolvers/resolvers";
import { buildContext } from "graphql-passport";
import "./oauth/google";

async function createApp() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        introspection: true
    });

    app.use(
        session({ secret: process.env.SECRET as string, resave: false, saveUninitialized: false })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await server.start();
    app.use(
        "/graphql",
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => buildContext({ req, res })
        })
    );

    app.get("/", (req, res) => {
        res.redirect("/graphql");
    });

    app.get("/login", passport.authenticate("google", { scope: ["profile"] }));
    app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/login" }),
        (req, res) => res.redirect("/graphql")
    );
    app.get("/logout", (req, res) => {
        req.logout(() => res.redirect("/graphql"));
    });

    return { app, server };
}

export { createApp };
