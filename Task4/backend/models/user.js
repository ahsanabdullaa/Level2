var mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

const User = mongoose.model("User", userSchema);
// validate user signup
function validateUserSignup(user, { abortEarly = false } = {}) {
  console.log(user);
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    role: Joi.string(),
  });
  return schema.validate(user);
}
// validate user login
function validateUserLogin(user, { abortEarly = false } = {}) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(user);
}
module.exports.User = User;
module.exports.validateSignup = validateUserSignup;
module.exports.validateLogin = validateUserLogin;
