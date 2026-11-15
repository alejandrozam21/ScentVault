const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post(
  "/fragrance/:id/review",
  requireAuth,
  reviewController.submitReview
);

module.exports = router;