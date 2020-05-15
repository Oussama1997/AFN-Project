const express = require("express");
const router = express.Router();

//require the controllers which we did not create yet!
/* Partner  Router */
const Partner_controller = require("../controllers/partners.controller");
router.get("/partners", Partner_controller.findAll);
router.post("/partners/add", Partner_controller.add);
router.get("/partners/:_id", Partner_controller.details);
router.put("/partners/:_id", Partner_controller.update);
router.delete("/partners/:id", Partner_controller.delete);

/* User  Router */
const User_controller = require("../controllers/users.controller");
router.get("/users", User_controller.findAll);
router.post("/users/add", User_controller.add);
router.get("/users/:_id", User_controller.details);
router.put("/users/:_id", User_controller.update);
router.delete("/users/:id", User_controller.delete);

module.exports = router;
/*
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

module.exports = router;*/
