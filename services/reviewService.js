const fragranceService = require("./fragranceService");

class Review {
  constructor(reviewID, userID, fragranceID, rating, comment) {
    this.reviewID = reviewID;
    this.userID = userID;
    this.fragranceID = fragranceID;
    this.rating = rating;
    this.comment = comment;
  }
}

const reviews = [];
let nextReviewID = 1;

function saveReview(userID, fragranceID, rating, comment) {
  if (!fragranceService.getFragranceById(fragranceID)) {
    throw new Error("Fragrance not found");
  }

  const stars = Number(rating);

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (typeof comment !== "string" ||
      !comment.trim() ||
      comment.length > 1000) {
    throw new Error("Review must contain 1–1000 characters");
  }

  const existing = reviews.find(review =>
    review.userID === userID &&
    String(review.fragranceID) === String(fragranceID)
  );

  if (existing) {
    existing.rating = stars;
    existing.comment = comment.trim();
    return existing;
  }

  const review = new Review(
    nextReviewID++,
    userID,
    String(fragranceID),
    stars,
    comment.trim()
  );

  reviews.push(review);
  return review;
}

function getReviews(fragranceID) {
  return reviews.filter(review =>
    String(review.fragranceID) === String(fragranceID)
  );
}

function getUserReview(userID, fragranceID) {
  return getReviews(fragranceID).find(
    review => review.userID === userID
  );
}

function getAverageRating(fragranceID) {
  const items = getReviews(fragranceID);

  if (items.length === 0) return null;

  const total = items.reduce(
    (sum, review) => sum + review.rating, 0
  );

  return Number((total / items.length).toFixed(1));
}

module.exports = {
  Review,
  saveReview,
  getReviews,
  getUserReview,
  getAverageRating
};