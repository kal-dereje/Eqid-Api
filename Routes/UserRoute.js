const {
  UserCreate,
  GetUser,
  GetOneUser,
  DeleteUser,
  UpdateUser,
  LoginUser,
} = require("../Controller/UserController");
const FileUploder = require("../MiddleWare/uploders");

const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../TodoList/frontend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

const express = require("express");
const router = express.Router();

router.route("/GetUser").get(GetUser);
router.route("/UserCreate").post(upload, UserCreate);
router.route("/LoginUser").post(LoginUser);
router.route("/:id").patch(upload, UpdateUser);
router.route("/:id").get(GetOneUser).delete(DeleteUser).patch(UpdateUser);

module.exports = router;
