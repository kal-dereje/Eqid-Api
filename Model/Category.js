const mongoose = require("mongoose");

const CategorSchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Please enter name"],
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", CategorSchema);
