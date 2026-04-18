
const expressAsyncHandler = require("express-async-handler");
const Province = require("../Models/ProvinceModel");
const Country = require("../Models/CountryModel");

//  Create Province
const Create = expressAsyncHandler(async (req, res) => {
  const { name, countryid } = req.body;

  if (!name || !countryid) {
    res.status(400);
    throw new Error("Invalid Input Data: 'name' and 'countryid' are required");
  }

  const created = (await Province.create({ name, countryid }))

  res.status(201).json({
    message: "Province Created Successfully",
    created,
  });
});


//  Get All Provinces (with Populate)
const GetAll = expressAsyncHandler(async (req, res) => {
  const provinces = await Province.find().populate("countryid", "name"); 
  // populate the country name

  res.status(200).json({
    message: "All Provinces Retrieved Successfully",
    provinces,
  });
});


// Get Province by ID (with Populate)
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const province = await Province.findById(id).populate("countryid", "name");

  if (!province) {
    res.status(404);
    throw new Error("Province Not Found");
  }

  res.status(200).json({
    message: "Province Retrieved Successfully",
    province,
  });
});


//  Update Province
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, countryid } = req.body;

  const updatedProvince = await Province.findByIdAndUpdate(
    id,
    { name, countryid },
    { new: true }
  ).populate("countryid", "name");

  if (!updatedProvince) {
    res.status(404);
    throw new Error("Province Not Found");
  }

  res.status(200).json({
    message: "Province Updated Successfully",
    province: updatedProvince,
  });
});


// Delete Province
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Province.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("Province Not Found");
  }

  res.status(200).json({
    message: "Province Deleted Successfully",
    deleted,
  });
});

module.exports = { Create, GetAll, GetById, Update, Delete };
