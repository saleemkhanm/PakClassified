
const expressAsyncHandler = require("express-async-handler");
const CityArea = require("../Models/CityAreaModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { name, cityid } = req.body;

  if (!name || !cityid) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await CityArea.create({ name, cityid });

  res.status(201).json({
    message: "CityArea Created Successfully",
    created,
  });
});


//  Get All  (with Populate)
const GetAll = expressAsyncHandler(async (req, res) => {
  const cityarea = await CityArea.find().populate("cityid", "name"); 
  // populate the cityarea name

  res.status(200).json(
    // message: "All cityareas Retrieved Successfully",
    cityarea,
  );
});


// Get  by ID (with Populate)
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const cityarea = await CityArea.findById(id).populate("cityid", "name");

  if (!cityarea) {
    res.status(404);
    throw new Error("cityarea Not Found");
  }

  res.status(200).json({
    message: "cityarea Retrieved Successfully",
    cityarea,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, cityid } = req.body;

  const updatedcityarea = await CityArea.findByIdAndUpdate(
    id,
    { name, cityid },
    { new: true }
  ).populate("cityid", "name");

  if (!updatedcityarea) {
    res.status(404);
    throw new Error("cityarea Not Found");
  }

  res.status(200).json({
    message: "cityarea Updated Successfully",
    cityarea: updatedcityarea,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await CityArea.findByIdAndDelete(id);

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
 