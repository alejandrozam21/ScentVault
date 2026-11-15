const reviewService = require("../services/reviewService");

exports.submitReview = (req, res) => {
  const fragranceID = req.params.id;

  try {
    reviewService.saveReview(
      req.session.userID,
      fragranceID,
      req.body.rating,
      req.body.comment
    );

    res.redirect(
      `/fragrance/${encodeURIComponent(fragranceID)}#reviews`
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};