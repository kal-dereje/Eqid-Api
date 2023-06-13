const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter user Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please Add password"],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);
//static
userSchema.statics.SignUp = async function (username, email, password, image) {
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const users = await this.create({
    username,
    email,
    password: hash,
    image: { data: image, contentType: "image/png" },
  });
  return users;
};

//Static LOgin Method

userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All files are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email ");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password ");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
