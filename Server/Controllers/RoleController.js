
const expressAsyncHandler = require("express-async-handler");
const Role = require("../Models/RoleModel");

//  Create 
const Create = expressAsyncHandler(async (req, res) => {
  const { name} = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Invalid Input Data:  are required");
  }

  const created = await Role.create({ name });

  res.status(201).json({
    message: "Role Created Successfully",
    created,
  });
});


//  Get All  
const GetAll = expressAsyncHandler(async (req, res) => {
  const role = await Role.find()
  

  res.status(200).json({
    message: "All roles Retrieved Successfully",
    role,
  });
});


// Get  by ID 
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id)

  if (!role) {
    res.status(404);
    throw new Error("role Not Found");
  }

  res.status(200).json({
    message: "Role Retrieved Successfully",
    role,
  });
});


//  Update 
const Update = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = await Role.findByIdAndUpdate(
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
    role: updated,
  });
});


// Delete 
const Delete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Role.findByIdAndDelete(id);

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
