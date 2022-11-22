/*IMPORTED-COMPONENTS*/
const Order = require("../models/Order");
const {
  verifyToken,
  verifyAndAuthorization,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

/*IMPORTED-EXPRESS*/
const express = require("express");
const router = express.Router();

/*CREATE-ORDER*/
router.post("/:id", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*UPDATE-ORDER*/
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
