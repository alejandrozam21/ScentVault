const express = require("express");
const router = express.Router();

const fragranceController = require("../controllers/fragranceController");

router.get("/catalog", fragranceController.getCatalog);

module.exports = router;