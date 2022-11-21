/*IMPORT-COMPONENTS*/
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("../models/Product");

/*IMPORTED-EXPRESS*/
const express = require("express");
const router = express.Router();

module.exports = router;
