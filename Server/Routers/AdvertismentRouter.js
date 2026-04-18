const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/UploadImg");

const {
  Create,
  GetAll,
  GetById,
  Update,
  Delete,
  GetByCategory,
  latestPost,
  SearchAds,
} = require("../Controllers/AdvertismentController");

// CREATE
router.post(
  "/",
  upload.single("advertismentimg"), //  MUST MATCH FRONTEND
  Create
);

router.get("/search", SearchAds);
router.get("/", GetAll);
router.get("/subcategory/:id",GetByCategory);
router.get("/latest/",latestPost);

router.get("/:id", GetById);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
