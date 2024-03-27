const {
  categoryCreate,
  GetCategory,
  GetOneCategory,
  DeleteCategory,
  UpdateCategory,
} = require("../Controller/CategoryController");
const Authentication = require("../MiddleWare/Authentication");
const express = require("express");
const router = express.Router();

router.use(Authentication);
router.route("/CreateCategory").post(categoryCreate);
router.route("/AllCategory").get(GetCategory);
router.route("/UpdateCategory/:id").patch(UpdateCategory);
router.route("/DeleteCategory/:id").delete(DeleteCategory);
router.route("/GetOneCategory/:id").get(GetOneCategory);

module.exports = router;
