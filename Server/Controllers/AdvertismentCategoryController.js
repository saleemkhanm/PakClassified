

const AdvertismentCategory = require("../Models/AdvertismentlCategoryModel");

// CREATE
const Create = async (req, res) => {
  try {
    const category = await AdvertismentCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL (MOST IMPORTANT)
const GetAll = async (req, res) => {
  try {
    const categories = await AdvertismentCategory.find();
    res.status(200).json(categories); // MUST BE ARRAY
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const GetById = async (req, res) => {
  try {
    const category = await AdvertismentCategory.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const Update = async (req, res) => {
  try {
    const category = await AdvertismentCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
const Delete = async (req, res) => {
  try {
    await AdvertismentCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Create,
  GetAll,
  GetById,
  Update,
  Delete,
};
