const express = require("express");
const router = express.Router();

router.get("/usertest", (req, res) => {
  res.send("User test is successful...");
});

router.post("/userpost", (req, res) => {
  const username = req.body.username;
  res.send("Your username is " + username);
});

module.exports = router;
