const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
  },
  googleId: {
    type: String,
  },
  email: {
    type: String,
  },
});
// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
