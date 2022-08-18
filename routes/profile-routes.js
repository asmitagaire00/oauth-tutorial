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
  try {
    res.status(200).send("You are logged in", req.user.userName);
  } catch (err) {
    console.log("error occured in profile", err);
    res.status(400).send("Could not show profile data");
  }
});

module.exports = router;
