const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verify = require("../verify");

/* Login */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const password = await User.findOne({
      password: req.body.password,
    });

    if (!user && !password) {
      return res.status(401).json("Invalid Credentials");
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      "hellopass",
      { expiresIn: "10d" }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    return res.send(500).json(error);
  }
});
/* Sign up */
router.post("/register", async (req, res) => {
  //   const newUser = await userModel.create(req.body);
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
   return res.status(200).json({
      status: "success",
      newUser,
    });
  } catch (error) {
   return  res.status(500).json({
      status: error,
    });
  }
});
/* Admin */
router.get("/users", verify, async (req, res) => {
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
