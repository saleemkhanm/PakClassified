

// const expressAsyncHandler = require("express-async-handler");
// const User = require("../Models/UserModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// const SignUp = expressAsyncHandler(async (req, res) => {
//   const {
//     firstname, lastname, email, password,
//     contact, dob, securityquestions,
//     securityanswers, adress, roleid
//   } = req.body;

//   const img = req.file ? req.file.filename : null;

//   if (!firstname || !lastname || !email || !password ||
//       !contact || !dob || !securityquestions ||
//       !securityanswers || !adress) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const existUser = await User.findOne({ email });
//   if (existUser) {
//     return res.status(409).json({ message: "Email already registered" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const hashedAnswer = await bcrypt.hash(securityanswers, 10);

//   const user = await User.create({
//     firstname,
//     lastname,
//     email,
//     password: hashedPassword,
//     contact,
//     dob,
//     img,
//     securityquestions,
//     securityanswers: hashedAnswer,
//     adress,
//     roleid,
//   });

//   res.status(201).json({
//     message: "Signup Successful",
//     user,
//   });
// });

// // LOGIN
// const Login = expressAsyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//   const token = jwt.sign(
//     { _id: user._id, email: user.email },
//     process.env.JWT_SECRET_KEY,
//     { expiresIn: "1d" }
//   );

//   res.json({ message: "Login Successful", token, user });
// });

// const GetAll = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

// const GetById = async (req, res) => {
//   const user = await User.findById(req.params.id);
//   res.json(user);
// };

// module.exports = { SignUp, Login, GetAll, GetById };
const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP
const SignUp = expressAsyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    contact,
    dob,
    securityquestions,
    securityanswers,
    adress,
    roleid,
  } = req.body;

  const img = req.file ? req.file.filename : null;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !contact ||
    !dob ||
    !securityquestions ||
    !securityanswers ||
    !adress
  ) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedAnswer = await bcrypt.hash(securityanswers, 10);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    contact,
    dob,
    img,
    securityquestions,
    securityanswers: hashedAnswer,
    adress,
    roleid,
  });

  res.status(201).json({
    message: "Signup Successful",
    user,
  });
});

// LOGIN
const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login Successful",
    token,
    user,
  });
});

// GET ALL USERS
const GetAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET BY ID
const GetById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

module.exports = { SignUp, Login, GetAll, GetById };