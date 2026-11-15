const express = require("express");
const router = express.Router();

const fragranceController = require("../controllers/fragranceController");

// Fragrance catalog
router.get("/catalog", fragranceController.getCatalog);

// Individual fragrance details
router.get("/fragrance/:id", fragranceController.getFragranceDetails);

module.exports = router;