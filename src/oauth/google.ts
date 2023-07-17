import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user";

const googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URI as string
};

const googleCallBack = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
) => {
    let user: any = await User.find({ googleId: profile.id });
    if (!user) {
        try {
            const newUser = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                picture: profile.photos[0].value
            });

            user = await newUser.save();
        } catch (error) {
            throw new Error("Failed to create user!");
        }
    }
    return done(null, user);
};

passport.use(new GoogleStrategy(googleOptions, googleCallBack));
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));