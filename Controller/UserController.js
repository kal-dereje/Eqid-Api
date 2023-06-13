const User = require("../Model/User");
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30m" });
};
let emptyArray = [];

//Sign Up
const UserCreate = async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.file);
  const image = req.file.filename;
  if (!username) {
    emptyArray.push("username");
  }
  if (!password) {
    emptyArray.push("password");
  }

  if (!email) {
    emptyArray.push("email");
  }
  if (!image) {
    emptyArray.push("image");
  }

  if (emptyArray.length > 0) {
    return res.status(400).json({ error: "Please fill the form", emptyArray });
  }
  try {
    const users = await User.SignUp(username, email, password, image);

    res.status(200).json({ username, image, email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Login

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await User.Login(email, password);
    const username = users.username;
    const image = users.image;
    //token
    const token = createToken(users._id);
    res.status(200).json({ username, image, email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetUser = async (req, res) => {
  const cv = await User.find({});
  res.status(200).json(cv.image);
};
// Get one(if Super Admin is Available for the future)
const GetOneUser = async (req, res) => {
  res.status(200).json({ message: "this is one get" });
};
//Update(For password, username and avatar change for the future)
const UpdateUser = async (req, res) => {
  res.status(200).json({ message: "this is update" });
};
//Delete

const DeleteUser = async (req, res) => {
  res.status(200).json({ message: "this is delete" });
};

module.exports = {
  UserCreate,
  GetUser,
  GetOneUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
};
