/*IMPORT-COMPONENTS*/
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

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

/*DELETE-CART*/
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await new Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Items have been deleted from your cart...");
  } catch (err) {
    res.status(500).json(err);
  }
});

/*GET-USER-CART*/
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*GET-ALL-CART*/
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Cart.findById();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
