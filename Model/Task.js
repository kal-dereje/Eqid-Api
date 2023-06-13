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
    user_id: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
