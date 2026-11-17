const fragranceService = require("../services/fragranceService");
const reviewService = require("../services/reviewService");
const userService = require("../services/userService");

// Display fragrance catalog
exports.getCatalog = (req, res) => {
  const selectedBrand = req.query.brand || "";
  const search = req.query.search || "";

  const fragrances = fragranceService.getAllFragrances(
    selectedBrand,
    search
  );

  const brands = fragranceService.getAllBrands();

  res.render("catalog", {
    title: "ScentVault | Fragrance Catalog",
    fragrances,
    brands,
    selectedBrand,
    search
  });
};

// Display individual fragrance details
exports.getFragranceDetails = (req, res) => {
  const fragrance = fragranceService.getFragranceById(
    req.params.id
  );

  if (!fragrance) {
  return res.status(404).render("404", {
    title: "ScentVault | Fragrance Not Found"
  });
}

  const reviews = reviewService
    .getReviews(fragrance.fragranceID)
    .map(review => ({
      ...review,
      userName:
        userService.getUserById(review.userID)?.name ||
        "Unknown User"
    }));

  const averageRating = reviewService.getAverageRating(
    fragrance.fragranceID
  );

  const userReview = req.session.userID
    ? reviewService.getUserReview(
        req.session.userID,
        fragrance.fragranceID
      )
    : null;

  res.render("details", {
    title: `ScentVault | ${fragrance.name}`,
    fragrance,
    reviews,
    averageRating,
    userReview
  });
};
