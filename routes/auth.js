const express = require("express");
const router = express.Router();

const User = require("../models/User");

/*REGISTER*/
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    const saveUser = await newUser.save();
     res.status(200).json(saveUser);
  } catch(err){
    res.status(500).json(err);
  } 
});

module.exports = router;
