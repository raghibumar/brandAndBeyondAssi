const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verify = require("../verify");
var CryptoJS = require("crypto-js");

/* Login */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(401).json("Enter a valid email");
    var bytes = CryptoJS.AES.decrypt(user.password, "hellohowareyou");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText !== req.body.password) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      "hellopass",
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    return res.status(200).json({ ...info, accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});
/* ===== */
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//     });
//     const password = await User.findOne({
//       password: req.body.password,
//     });

//     if (!user && !password) {
//       return res.status(401).json("Invalid Credentials");
//     }
//     const accessToken = jwt.sign(
//       {
//         id: user.id,
//         isAdmin: user.isAdmin,
//       },
//       "hellopass",
//       { expiresIn: "10d" }
//     );
//     res.status(200).json({ accessToken });
//   } catch (error) {
//     return res.send(500).json(error);
//   }
// });
/* Sign up */
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "hellohowareyou"
    ).toString(),
    isAdmin: req.body.isAdmin,
  });

  try {
    const user = await newUser.save();
    res.status(201).json({
      status: "succes",
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
/* Admin */
router.get("/users", verify, async (req, res) => {
  console.log(req.user.isAdmin);
  if (req.user.isAdmin) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("Not Allowed");
  }
});

module.exports = router;
