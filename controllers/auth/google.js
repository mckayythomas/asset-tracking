const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongodb = require('../../db/connect')

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                picture: profile.photos[0].value
            }

            try {
                let user = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('user').findOne({ googleId: newUser.googleId });

                if(user) {
                    done(null, user)
                } else {
                    user = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('user').insertOne(newUser);
                    done(null, user)
                }
            } catch(err) {
                console.error(err);
            }
        }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

module.exports = passport