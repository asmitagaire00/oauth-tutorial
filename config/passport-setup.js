const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");

require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((err, user) => {
    if (err) {
      done(null, err);
    }
    if (user) {
      done(null, user.id);
    }
    //  else {
    //   done(null, false);
    // }
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: "/auth/google/redirect",
      // userProfileURL: "http://localhost:3001/profile/",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("latest profile data ", profile);
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) {
            //already have a user
            console.log("user from database", user);
            done(null, user);
          } else {
            //create new user
            new User({ googleId: profile.id, userName: profile.displayName })
              .save()
              .then((newUser) => {
                done(null, newUser);
              })
              .catch((err) => console.log("error occurred", err));
          }
        })
        .catch((e) => {
          console.log("error passport: ", e);
        });
    }
  )
);
