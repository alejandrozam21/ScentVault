const fragranceService = require("../services/fragranceService");

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
    return res.status(404).send("Fragrance not found");
  }

  res.render("details", {
    title: `ScentVault | ${fragrance.name}`,
    fragrance
  });
};
