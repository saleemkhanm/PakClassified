
const expressAsyncHandler = require("express-async-handler");
const AdvertismentSubCat = require("../Models/AdvertismentSubCatModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { name, categoryid} = req.body;

  if (!name || !categoryid) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await AdvertismentSubCat.create({ name, categoryid });

  res.status(201).json({
    message: "AdvertismentSubCat Created Successfully",
    created,
  });
});


//  Get All  
const GetAll = expressAsyncHandler(async (req, res) => {
  const advertismentsubcat = await AdvertismentSubCat.find().populate("categoryid", "name")
  

  res.status(200).json({
    message: "All AdvertismentSubCat Retrieved Successfully",
    advertismentsubcat,
  });
});


// Get  by ID 
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const advertismentsubcat = await AdvertismentSubCat.findById(id).populate("categoryid", "name")

  if (!advertismentsubcat) {
    res.status(404);
    throw new Error(" Not Found");
  }

  res.status(200).json({
    message: "AdvertismentSubCat Retrieved Successfully",
    advertismentsubcat,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name} = req.body;

  const updated = await AdvertismentSubCat.findByIdAndUpdate(
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
    advertismentsubcat: updated,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await AdvertismentSubCat.findByIdAndDelete(id);

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
