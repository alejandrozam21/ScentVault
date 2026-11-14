const fragranceService = require("../services/fragranceService");

exports.getCatalog = (req, res) => {
  const selectedBrand = req.query.brand || "";

  const fragrances = fragranceService.getAllFragrances(selectedBrand);
  const brands = fragranceService.getAllBrands();

  res.render("catalog", {
    title: "ScentVault | Fragrance Catalog",
    fragrances,
    brands,
    selectedBrand
  });
};
