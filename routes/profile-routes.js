const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  // try {
  //   console.log("user data from profile routes", req.user);
  //   res.send("You are logged in", req.user);
  // } catch (err) {
  //   console.log("error occured in profile", err);
  //   res.status(400).send("Could not show profile data");
  // }
  console.log("profile route", req.user);
  res.render("profile", { user: req.user });
});

module.exports = router;
