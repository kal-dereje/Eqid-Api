const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    taskname: {
      type: String,
      required: [true, "Please enter Task Name"],
    },
    time: {
      type: String,
      required: [true, "Please enter time"],
    },
    description: {
      type: String,
      required: [true, "Please Add description of the time"],
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
