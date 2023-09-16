const express = require("express");
const router = express.Router();
//
const { image } = require("../controllers/imageController.js");

router.route("/").get(image);

module.exports = router;
