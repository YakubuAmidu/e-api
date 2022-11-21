const express = require("express");
const router = express.Router();

/*CRIPTOJS*/
const CryptoJS = require("crypto-js");

const User = require("../models/User");

/*REGISTER*/
router.post("/register", async (req, res) => {
  const { username, email } = req.body;

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
