const express = require("express");
const router = express.Router();
//
const { image } = require("../controllers/imageController.js");

router.route("/image").post(image);

module.exports = router;