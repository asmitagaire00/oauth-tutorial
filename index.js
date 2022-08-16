const express = require("express");
const app = express();

//set up for view engine
app.set("view engine", "ejs");

//create home router
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3001, () => {
  console.log("server running successfully");
});
