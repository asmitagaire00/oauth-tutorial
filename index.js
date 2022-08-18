const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth-routes");
const profileRouter = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");

require("dotenv").config();

//set up for view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [keys.session.cookieKey] })
);

app.use(bodyParser.json());
app.use(cookieParser());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

//create home router
app.get("/", (req, res) => {
  res.render("home");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected sucessfully"))
  .catch((err) => console.log("Could not connect to database", err));

app.listen(3001, () => {
  console.log("server running successfully");
});
