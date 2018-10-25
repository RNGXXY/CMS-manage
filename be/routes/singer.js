
var express = require("express");
var router = express.Router();
var singer_controller = require("../controllers/singer");


router.get("/list",singer_controller.list);
module.exports = router;