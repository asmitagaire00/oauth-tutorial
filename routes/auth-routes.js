const express = require("express");
const passport = require("passport");
const router = express.Router();

//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send("Logging out...");
});

//auth google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/redirect", (req, res) => {
  res.send("Redirect to callback url");
});

module.exports = router;
