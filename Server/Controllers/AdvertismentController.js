
const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Advertisment = require("../Models/AdvertismentModel");


// CREATE
// const Create = expressAsyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     description,
//     feature,
//     starton,
//     endon,
//     cityareaid,
//     advertismenttypeid,
//     advertismentcategory,
//   } = req.body;

//   if (!req.file) {
//     res.status(400);
//     throw new Error("Advertisement image is required");
//   }

//   if (
//     !name ||
//     !price ||
//     !description ||
//     !feature||
//     !starton ||
//     !endon ||
//     !cityareaid ||
//     !advertismenttypeid ||
//     !advertismentcategory
//   ) {
//     res.status(400);
//     throw new Error("All fields are required");
//   }

//   const defaultStatusId = new mongoose.Types.ObjectId();
//   const defaultUserId = new mongoose.Types.ObjectId();

//   const advertisment = await Advertisment.create({
//     name,
//     price,
//     description,
//     feature,
//     starton,
//     endon,
//     advertismentimgid: req.file.filename,
//     cityareaid,
//     advertismentstatusid: defaultStatusId,
//     advertismenttypeid,
//     advertismentcategory,
//     userid: defaultUserId,
//   });

//   res.status(201).json({
//     message: "Advertisment Created Successfully",
//     advertisment,
//   });
// });
// ... existing imports

const Create = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    feature,
    starton,
    endon,
    cityareaid,
    advertismenttypeid,
    advertismentcategory,
    userid, // <--- Get this from the request body or auth middleware
  } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Advertisement image is required");
  }

  // Check all fields
  if (!name || !price || !description || !feature || !starton || !endon || !cityareaid || !advertismenttypeid || !advertismentcategory || !userid) {
    res.status(400);
    throw new Error("All fields including User ID are required");
  }

  const defaultStatusId = new mongoose.Types.ObjectId();

  const advertisment = await Advertisment.create({
    name,
    price,
    description,
    feature,
    starton,
    endon,
    advertismentimgid: req.file.filename,
    cityareaid,
    advertismentstatusid: defaultStatusId,
    advertismenttypeid,
    advertismentcategory,
    userid: userid, // <--- Now saving the real User ID
  });

  res.status(201).json({
    message: "Advertisment Created Successfully",
    advertisment,
  });
});

// ... rest of the file stays same

// GET ALL
const GetAll = expressAsyncHandler(async (req, res) => {
  const advertisment = await Advertisment.find()
    .populate("cityareaid")
    .populate("advertismenttypeid")
    .populate("advertismentcategory");

  res.status(200).json({
    message: "All Advertisments Retrieved Successfully",
    advertisment,
  });
});


// GET BY ID
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const advertisment = await Advertisment.findById(id)
    .populate("cityareaid")
    .populate("advertismentstatusid")
    .populate("advertismenttypeid")
    .populate("advertismentcategory")
    .populate("userid");

  if (!advertisment) {
    res.status(404);
    throw new Error("Advertisment Not Found");
  }

  res.status(200).json({
    message: "Advertisment Retrieved Successfully",
    advertisment,
  });
});


// GET BY CATEGORY (FIXED)
const GetByCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; // category id

  const bycategory = await Advertisment.find({
    advertismentcategory: id,
  })
    .populate("cityareaid")
    .populate("advertismenttypeid")
    .populate("advertismentcategory");

  if (bycategory.length === 0) {
    res.status(404);
    throw new Error("Advertisment Category Not Found");
  }

  res.status(200).json({
    message: "Advertisment Category Retrieved Successfully",
    bycategory,
  });
});


// UPDATE
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const updated = await Advertisment.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updated) {
    res.status(404);
    throw new Error("Advertisment Not Found");
  }

  res.status(200).json({
    message: "Advertisment Updated Successfully",
    advertisment: updated,
  });
});


// DELETE
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Advertisment.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("Advertisment Not Found");
  }

  res.status(200).json({
    message: "Advertisment Deleted Successfully",
    deleted,
  });
});

const latestPost = async (req, res) => {

  try {

    const lastAdv = await Advertisment.find().sort({ createdAt: -1 }).limit(4)
    if (!lastAdv) {
      return res.status(400).json({ message: "not found" })
    }

    return res.status(200).json(lastAdv)

  } catch (err) {
    console.log(err.message)

  }

}
const SearchAds = async (req, res) => {
  try {
    const { keyword, category, city } = req.query;

    let query = {};

    // keyword search
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // category filter
    if (category) {
      query.advertismentcategory = category;
    }

    // city filter
    if (city) {
      query.cityareaid = city;
    }

    const ads = await Advertisment.find(query)
      .populate("cityareaid")
      .populate("advertismentcategory");

    res.json(ads);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  Create,
  GetAll,
  GetById,
  Update,
  Delete,
  GetByCategory,
  latestPost,
  SearchAds
};
