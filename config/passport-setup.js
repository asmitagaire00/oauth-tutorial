const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");
const keys = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((err, user) => {
    if (err) {
      console.log("error occurred");
      return done(err);
    }
    if (user) {
      done(null, user.id);
    } else {
      done(null, false);
    }
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
      // userProfileURL: "http://localhost:3001/profile/",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile from ", profile);
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) {
            //already have a user
            console.log("user", user);
            done(null, user);
          } else {
            //create new user
            new User({ googleId: profile.id, userName: profile.displayName })
              .save()
              .then((newUser) => {
                // console.log("new user", newUser);
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
