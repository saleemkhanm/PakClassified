
const express = require("express");
const upload = require("../Middlewares/UploadImg");
const {
  SignUp,
  Login,
  GetAll,
  GetById,
} = require("../Controllers/UserController");

const router = express.Router();

// USER SIGNUP
router.post("/signup", upload.single("img"), SignUp);

//  USER LOGIN
router.post("/login", Login);

// GET USERS
router.get("/", GetAll);
router.get("/:id", GetById);

module.exports = router;
