const model = require("../Model/Task");
let emptyArray = [];

//Create
const TaskCreate = async (req, res) => {
  const category_id = req.cat[1]._id;

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
    const db = await model.create({ taskname, time, description, category_id });
    res.status(200).json(db);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Get all

const GetTask = async (req, res) => {
  let db = [];
  //const category_id = req.cat[0]._id;
  for (let x in req.cat) {
    let category_id = req.cat[x]._id;
    db[x] = await model.find({ category_id }).sort({ createdAt: -1 });
  }
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
  const { taskname, time, description, category_id } = req.body;
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await model.findByIdAndUpdate(
    { _id: id },
    { taskname, time, description, category_id: category_id }
  );

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
