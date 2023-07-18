import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import { createApp } from "../src/app";

describe("Testing App", () => {
    let app: Express.Application;

    beforeAll(async () => {
        const { app: serverApp } = await createApp();
        app = serverApp;
    });

    it("Responds with a 200 status for the /graphql GUI.", async () => {
        const response = await request(app).get("/graphql").set("Accept", "text/html");
        expect(response.statusCode).toBe(200);
    });

    it("Redirects to /graphql when hittin base path /.", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(302);
        expect(response.header.location).toBe("/graphql");
    });
});
