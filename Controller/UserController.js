const User = require("../Model/User");
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//Sign Up
const UserCreate = async (req, res) => {
  const { username, password, email } = req.body;

  const image1 = req.file;
  if (image1 === undefined) {
    return res.status(400).json({ message: "insert image" });
  }
  const image2 = image1.filename;

  try {
    const users = await User.SignUp(username, email, password, image2);

    res.status(200).json({ username, image2, email });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//Login

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const users = await User.Login(email, password);
    const username = users.username;
    const image = users.image;
    //token
    const token = createToken(users._id);
    res.status(200).json({ username, image: image, email, token });
  } catch (err) {
    res.status(422).json({ message: err.message });
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
  const { username, email, password } = req.body;

  const image = req.file.filename;
  const { id } = req.params;

  const result = await User.findById(id);
  if (!result) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await User.findByIdAndUpdate(
    { _id: id },
    { username, email, password, image }
  );

  const updated_2 = await User.findById(id);

  res.status(200).json(updated_2);
  // res.status(200).json({ message: "this is update" });
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
