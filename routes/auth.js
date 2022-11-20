const express = require('express');
const router = express.Router();

const User = require("../models/User");

/*REGISTER*/
router.post("/register", (req, res) => {
  const { username, email, password, } = req.body;

  const newUser = new User({
    username,
    email,
    password
  });

  console.log(newUser);
})

module.exports = router;