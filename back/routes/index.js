"use strict";
const path = require("path");
var express = require("express");
var router = express.Router();
var passport = require("passport");
// escriban sus rutas acá
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
