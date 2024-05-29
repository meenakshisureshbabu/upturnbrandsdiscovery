const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  checktoken,
  resetpwd,
  signUp,
  saveProfile,
};

async function create(req, res) {
  try {
    const foundUser = await User.findOne({
      "profile.username": req.params.user,
    });
    console.log("After finding a user", foundUser);
    if (foundUser !== null) throw new Error();
    const token = createJWT(req.params.user);
    console.log("TOKEN:::", token);
    res.header("X-Auth-Token", token);
    res.json();
  } catch (err) {
    console.log("here in catch.....", err);
    res.status(400).json({ message: "Username not available" });
  }
}

async function signUp(req, res) {
  try {
    console.log("req.body", req.params.user);
    const userData = await User.create({
      currents: [],
      email: req.body.email,
      feed: [],
      hashedPassword: req.body.password,
      id: "",
      notifications: [],
      profile: {
        email: req.body.email,
        organization: "",
        username: req.params.user,
      },
      shared: [],
    });
    console.log("After creating a user", userData);
    console.log(userData);
    res.json(userData);
  } catch (err) {
    console.log("here in catch.....", err);
    res.status(400).json(err);
  }
}

async function saveProfile(req, res) {
  try {
    console.log("req profile", req);
    const userData = await User.findOneAndUpdate(
      { "profile.username": req.params.user },
      {
        currents: [],
        email: req.body.email,
        feed: [],
        hashedPassword: req.body.password,
        id: "",
        notifications: [],
        profile: {
          email: req.body.email,
          organization: req.body.organization,
          username: req.params.user,
        },
        shared: [],
      }
    );
    console.log("After updating profile for a user", userData);
    console.log(userData);
    res.json(userData);
  } catch (err) {
    console.log("here in catch.....", err);
    res.status(400).json(err);
  }
}

//Restting the password
async function resetpwd(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.updateOne(
      { email: req.body.email },
      { $set: { password: hash } }
    );
    res.json(user);
  } catch (err) {
    //console.log("here.....")
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    console.log("REQQQQQQQQ",req.body.username);
    const foundUser = await User.findOne({
      $or: [
        // { email: req.body.username },
        { "profile.username": req.body.username },
      ],
    });
    console.log("Found User::",foundUser);
    if (foundUser === null || !foundUser) throw new Error();
    const match = await bcrypt.compare(
      req.body.password,
      foundUser.hashedPassword
    );
    if (!match) throw new Error();
    const token = createJWT(foundUser);
    res.header("X-Auth-Token", token);
    res.json(foundUser);
  } catch (err) {
    res.status(400).json(err);
  }
}

function checktoken(req, res) {
  // req.user will always be there for you when a token is sent
  //console.log('req.user', req.user);
  res.json(req.exp);
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
