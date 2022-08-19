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

//auth with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    // console.log("google redirect", req.user);
    res.redirect("/profile/");
  }
);

module.exports = router;
