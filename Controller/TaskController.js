const model = require("../Model/Task");
let emptyArray = [];

//Create
const TaskCreate = async (req, res) => {
  //const category_id = req.cat[0]._id;
  //console.log(category_id);
  console.log(req.body);
  const { taskname, time, description, category_id } = req.body;

  try {
    const db = await model.create({ taskname, time, description, category_id });
    res.status(200).json(db);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Get all

const GetTask = async (req, res) => {
  const { id } = req.params;
  const category_id = id;

  const db = await model.find({ category_id }).sort({ createdAt: -1 });

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
  const { taskname, time, description } = req.body;
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await model.findByIdAndUpdate(
    { _id: id },
    { taskname, time, description }
  );

  const updated_2 = await model.findById(id);

  res.status(200).json(updated_2);
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
