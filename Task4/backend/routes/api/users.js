var express = require("express");
var router = express.Router();
var { User } = require("../../models/user");
var {
  validateUserSignup,
  validateUserLogin,
} = require("../../middlewares/validateUser");
var bcrypt = require("bcryptjs");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var config = require("config");

/* GET users listing */
router.get("/", async function (req, res, next) {
  let users = await User.find();
  res.send(users);
});

/* GET single users listing. */
router.get("/:id", async function (req, res, next) {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User with given ID not found");
    res.send(user);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

/* Create user. */
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already registered");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();

  await user.save();
  let token = await jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    config.get("jwtPrivateKey")
  );
  let dataToReturn = {
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
  res.send(dataToReturn);
});

// Login user.
router.post("/login", validateUserLogin, async function (req, res, next) {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid password");
  let token = await jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

/* Update user. */
router.put("/:id", async function (req, res, next) {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User with given ID not found");
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save();
  res.send(user);
});

router.delete("/:id", async function (req, res, next) {
  let user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User with given ID not found");
  res.send(user);
});

module.exports = router;
