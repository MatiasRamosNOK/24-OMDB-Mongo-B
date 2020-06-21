const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var userSchema = new Schema({
  sessionID: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  moviesID: [
    {
      type: String,
    },
  ],
});

userSchema.methods.setPassword = function (pass) {
  return crypto.createHmac("sha1", this.salt).update(pass).digest("hex");
};

userSchema.methods.validPassword = function (password) {
  return this.password === this.setPassword(password);
};

userSchema.pre("save", function (next) {
  console.log("ENTRO AL PRE");
  this.salt = crypto.randomBytes(20).toString("hex");
  this.password = this.setPassword(this.password);
  next();
});
const User = mongoose.model("Users", userSchema);
module.exports = User;
