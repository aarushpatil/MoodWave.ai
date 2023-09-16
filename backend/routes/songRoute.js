const express = require("express");
const router = express.Router();
//
const { song } = require("../controllers/songController.js");

router.route("/").post(song);

module.exports = router;
