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
router.route("/").get(GetCategory).post(categoryCreate);
router
  .route("/:id")
  .get(GetOneCategory)
  .delete(DeleteCategory)
  .patch(UpdateCategory);

module.exports = router;
