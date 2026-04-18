
const expressAsyncHandler = require("express-async-handler");
const City = require("../Models/CityModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { name, provinceid } = req.body;

  if (!name || !provinceid) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await City.create({ name, provinceid });

  res.status(201).json({
    message: "City Created Successfully",
    created,
  });
});


//  Get All  (with Populate)
const GetAll = expressAsyncHandler(async (req, res) => {
  const city = await City.find().populate("provinceid", "name");
  // populate the city name

  res.status(200).json({
    message: "All cities Retrieved Successfully",
    city,
  });
});


// Get  by ID (with Populate)
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const city = await City.findById(id).populate("provinceid", "name");

  if (!city) {
    res.status(404);
    throw new Error("cityu Not Found");
  }

  res.status(200).json({
    message: "city Retrieved Successfully",
    city,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, provinceid } = req.body;

  const updatedcity = await City.findByIdAndUpdate(
    id,
    { name, provinceid },
    { new: true }
  ).populate("provinceid", "name");

  if (!updatedcity) {
    res.status(404);
    throw new Error("city Not Found");
  }

  res.status(200).json({
    message: "city Updated Successfully",
    city: updatedcity,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await City.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error(" Not Found");
  }

  res.status(200).json({
    message: "Deleted Successfully",
    deleted,
  });
});

module.exports = { Create, GetAll, GetById, Update, Delete };
