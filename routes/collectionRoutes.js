const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collectionController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get(
  "/collection",
  requireAuth,
  collectionController.getCollection
);

router.post(
  "/collection/add/:id",
  requireAuth,
  collectionController.addFragrance
);

router.post(
  "/collection/remove/:id",
  requireAuth,
  collectionController.removeFragrance
);

module.exports = router;