/*IMPORT-COMPONENTS*/
const Cart = require("../models/Cart");
const { verifyToken } = require("./verifyToken");

/*IMPORTED-EXPRESS*/
const express = require("express");
const router = express.Router();

/*ADD-CART*/
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
    console.log(saveCart);
  } catch (err) {
    re.status(500).json(err);
  }
});

/*UPDATE*/
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
