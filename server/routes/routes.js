const express = require("express");
const router = express.Router();

// Get POST
router.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.send("<h2>Route WORK<h2>");
});

router.get("/posts/:code", (req, res) => {
  res.setHeader("content-type", "application/json");
  var infos = {
    name: "ouss",
    email: "ouss@mimouna",
    code: req.params.code,
  };
  res.send(JSON.stringify(infos));
});

module.exports = router;
