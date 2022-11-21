/*IMPORTED-EXPRESS*/
const express = require("express");
const router = express.Router();

/*IMPORTED-JSONWEBTOKEN*/
const jwt = require("jsonwebtoken");

/*IMPORTED-CRIPTOJS*/
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

/*LOGIN*/
router.post("/login", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    !user && res.status(401).json("Wrong credentials...");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials...");

    const AccessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, AccessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
