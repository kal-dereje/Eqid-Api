const {
  TaskCreate,
  GetTask,
  GetOneTask,
  DeleteTask,
  UpdateTask,
} = require("../Controller/TaskController");
const Authentication = require("../MiddleWare/Authentication");
const express = require("express");
const router = express.Router();
router.use(Authentication);
router.route("/").get(GetTask).post(TaskCreate);
router.route("/:id").get(GetOneTask).delete(DeleteTask).patch(UpdateTask);

module.exports = router;
