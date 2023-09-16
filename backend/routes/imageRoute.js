const express = require("express");
const router = express.Router();
//
const { image, imageURL } = require("../controllers/imageController.js");

router.route("/").post(image);
router.route("/url").post(imageURL);

module.exports = router;
