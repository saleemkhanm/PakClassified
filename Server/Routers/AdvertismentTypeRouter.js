const express = require("express");
const {
  Create,
  GetAll,
  GetById,
  Update,
  Delete,
} = require("../Controllers/AdvertismentTypeController");

const router = express.Router();

// Routes
router.post("/", Create);
router.get("/", GetAll);
router.get("/:id", GetById);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router; 
