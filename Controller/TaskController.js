const model = require("../Model/Task");
let emptyArray = [];

//Create
const TaskCreate = async (req, res) => {
  const user_id = req.user._id;
  const { taskname, time, description } = req.body;
  if (!taskname) {
    emptyArray.push("taskname");
  }
  if (!time) {
    emptyArray.push("time");
  }
  if (!description) {
    emptyArray.push("description");
  }

  if (emptyArray.length > 0) {
    return res.status(400).json({ error: "Please fill the form", emptyArray });
  }

  try {
    const db = await model.create({ taskname, time, description, user_id });
    res.status(200).json(db);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Get all

const GetTask = async (req, res) => {
  const user_id = req.user._id;
  const db = await model.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(db);
};
// Get one
const GetOneTask = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }

  res.status(200).json(sv);
};
//Update
const UpdateTask = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await model.findByIdAndUpdate({ _id: id }, { ...req.body });

  res.status(200).json(updated);
};
//Delete

const DeleteTask = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findOneAndDelete({ _id: id });
  if (!sv) {
    return res.status(400).json({ msg: "No id found" });
  }
  res.status(200).json(sv);
};

module.exports = {
  TaskCreate,
  GetTask,
  GetOneTask,
  UpdateTask,
  DeleteTask,
};
