const expressAsyncHandler = require("express-async-handler");
const Country = require("../Models/CountryModel");

// Create Country
const Create = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Invalid Input Data");
  }

  const created = await Country.create({ name });

  res.status(201).json({
    message: "Country Created Successfully",
    created,
  });
});

// Get All Countries
const GetAll = expressAsyncHandler(async (req, res) => {
  const getall = await Country.find();
  res.status(200).json({
    message: "All Countries Retrieved Successfully",
    getall,
  });
});

// Get Country By ID
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const country = await Country.findById(id);

  if (!country) {
    res.status(404);
    throw new Error("Country Not Found");
  }

  res.status(200).json({
    message: "Country Retrieved Successfully",
    country,
  });
});

// Update Country
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const country = await Country.findByIdAndUpdate(id, { name }, { new: true });

  if (!country) {
    res.status(404);
    throw new Error("Country Not Found");
  }

  res.status(200).json({
    message: "Country Updated Successfully",
    country,
  });
});

// Delete Country
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Country.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("Country Not Found");
  }

  res.status(200).json({
    message: "Country Deleted Successfully",
    deleted,
  });
});

module.exports = { Create, GetAll, GetById, Update, Delete };
