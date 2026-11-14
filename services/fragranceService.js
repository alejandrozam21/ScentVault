const brands = [
  { brandID: 1, name: "Xerjoff", country: "Italy" },
  { brandID: 2, name: "Parfums de Marly", country: "France" },
  { brandID: 3, name: "Lattafa", country: "United Arab Emirates" }
];

const fragrances = [
  {
    fragranceID: 1,
    name: "Naxos",
    brandID: 1,
    notes: ["Honey", "Tobacco", "Vanilla", "Lavender"],
    concentration: "Eau de Parfum"
  },
  {
    fragranceID: 2,
    name: "40 Knots",
    brandID: 1,
    notes: ["Marine Notes", "Woody Notes", "Salt"],
    concentration: "Eau de Parfum"
  },
  {
    fragranceID: 3,
    name: "Layton",
    brandID: 2,
    notes: ["Apple", "Vanilla", "Cardamom", "Lavender"],
    concentration: "Eau de Parfum"
  },
  {
    fragranceID: 4,
    name: "Khamrah Qahwa",
    brandID: 3,
    notes: ["Coffee", "Praline", "Vanilla", "Cinnamon"],
    concentration: "Eau de Parfum"
  }
];

function getAllFragrances(brandID) {
  if (!brandID) return fragrances;

  return fragrances.filter(
    fragrance => fragrance.brandID === Number(brandID)
  );
}

function getAllBrands() {
  return brands;
}

module.exports = {
  getAllFragrances,
  getAllBrands
};
