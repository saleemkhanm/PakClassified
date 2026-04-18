
const expressAsyncHandler = require("express-async-handler");
const AdvertismentStatus = require("../Models/AdvertismentStatusModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await AdvertismentStatus.create({ name });

  res.status(201).json({
    message: "Advertisment Created Successfully",
    created,
  });
});


//  Get All  
const GetAll = expressAsyncHandler(async (req, res) => {
  const advertismentstatus = await AdvertismentStatus.find()
  

  res.status(200).json({
    message: "All AdvertismentStatus Retrieved Successfully",
    advertismentstatus,
  });
});


// Get  by ID 
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const advertismentstatus = await AdvertismentStatus.findById(id)

  if (!advertismentstatus) {
    res.status(404);
    throw new Error(" Not Found");
  }

  res.status(200).json({
    message: "AdvertismentStatus Retrieved Successfully",
    advertismentstatus,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name} = req.body;

  const updated = await AdvertismentStatus.findByIdAndUpdate(
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
    advertismentstatus: updated,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await AdvertismentStatus.findByIdAndDelete(id);

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
