
const expressAsyncHandler = require("express-async-handler");
const AdvertismentType = require("../Models/AdvertismentTypeModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await AdvertismentType.create({ name });

  res.status(201).json({
    message: "AdvertismentType Created Successfully",
    created,
  });
});


//  Get All  
const GetAll = expressAsyncHandler(async (req, res) => {
  const advertismentType = await AdvertismentType.find()
  

  res.status(200).json({
    message: "All AdvertismentType Retrieved Successfully",
    advertismentType,
  });
});


// Get  by ID 
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const advertismentType = await AdvertismentType.findById(id)

  if (!AdvertismentType) {
    res.status(404);
    throw new Error(" Not Found");
  }

  res.status(200).json({
    message: "AdvertismentType Retrieved Successfully",
    advertismentType,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name} = req.body;

  const updated = await AdvertismentType.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  )

  if (!updated) {
    res.status(404);
    throw new Error(" Not Found");
  }

  res.status(200).json({
    message: " Updated Successfully",
    advertismentType: updated,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await AdvertismentType.findByIdAndDelete(id);

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
