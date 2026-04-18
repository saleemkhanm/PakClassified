
const expressAsyncHandler = require("express-async-handler");
const Advertismentimage = require("../Models/AdvertismentimageModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { img, rank, caption } = req.body;

  if (!img || !rank || !caption) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await Advertismentimage.create({ img, rank, caption });

  res.status(201).json({
    message: "Advertismentimage Created Successfully",
    created,
  });
});


//  Get All  
const GetAll = expressAsyncHandler(async (req, res) => {
  const advertismentimage = await Advertismentimage.find()
  

  res.status(200).json({
    message: "All AdvertismentStatus Retrieved Successfully",
    advertismentimage,
  });
});


// Get  by ID 
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const advertismentimage = await Advertismentimage.findById(id)

  if (!advertismentimage) {
    res.status(404);
    throw new Error(" Not Found");
  }

  res.status(200).json({
    message: "Advertismentimage Retrieved Successfully",
    advertismentimage,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name} = req.body;

  const updated = await Advertismentimage.findByIdAndUpdate(
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
    advertismentimage: updated,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Advertismentimage.findByIdAndDelete(id);

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
