/*IMPORTED-VERIFY-TOKEN*/
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

/*IMPORT-EXPRESS*/
const express = require("express");
const User = require("../models/User");
const router = express.Router();

/*UPDATE*/
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
