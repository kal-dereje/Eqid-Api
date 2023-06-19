const model = require("../Model/category");
const mongoose = require("mongoose");
let emptyArray = [];

//Create

const categoryCreate = async (req, res) => {
  const user_id = req.user._id;
  const { categoryName } = req.body;
  if (!categoryName) {
    emptyArray.push("categoryName");
  }

  if (emptyArray.length > 0) {
    return res.status(400).json({ error: "Please fill the form", emptyArray });
  }

  try {
    const db = await model.create({ categoryName, user_id });
    res.status(200).json(db);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Get all

const GetCategory = async (req, res) => {
  const user_id = req.user._id;
  const db = await model.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(db);
};
// Get one
const GetOneCategory = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }

  res.status(200).json(sv);
};
//Update
const UpdateCategory = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findById(id);
  if (!sv) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await model.findByIdAndUpdate({ _id: id }, { ...req.body });

  res.status(200).json(updated);
};
//Delete

const DeleteCategory = async (req, res) => {
  const { id } = req.params;
  const sv = await model.findOneAndDelete({ _id: id });
  if (!sv) {
    return res.status(400).json({ msg: "No id found" });
  }
  res.status(200).json(sv);
};

module.exports = {
  categoryCreate,
  GetCategory,
  GetOneCategory,
  UpdateCategory,
  DeleteCategory,
};
