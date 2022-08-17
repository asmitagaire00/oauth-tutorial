const express = require("express");
const app = express();
const authRouter = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");

//set up for view engine
app.set("view engine", "ejs");

//set routes
app.use("/auth", authRouter);

//create home router
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3001, () => {
  console.log("server running successfully");
});
