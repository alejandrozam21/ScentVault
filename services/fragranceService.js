const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/perfumes.jsonl");

// Read the fragrance dataset
const fileContent = fs.readFileSync(filePath, "utf8");

// Convert each JSONL line into a JavaScript object
const fragrances = fileContent
  .split(/\r?\n/)
  .filter(line => line.trim() !== "")
  .map(line => JSON.parse(line))
  .map(perfume => ({
    fragranceID: perfume.id,
    name: perfume.name,
    brandID: perfume.house_id,
    brand: perfume.house,
    notes: perfume.notes || [],
    topNotes: perfume.top_notes || [],
    heartNotes: perfume.heart_notes || [],
    baseNotes: perfume.base_notes || [],
    concentration: perfume.concentration || "Not specified",
    family: perfume.family || "Not specified",
    description: perfume.description || ""
  }));

// Create a unique brand list
const brands = Array.from(
  new Map(
    fragrances.map(fragrance => [
      fragrance.brandID,
      {
        brandID: fragrance.brandID,
        name: fragrance.brand
      }
    ])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name));

// Get fragrances, optionally filtering by brand
function getAllFragrances(brandID) {
  if (!brandID) {
    return fragrances;
  }

  return fragrances.filter(
    fragrance => String(fragrance.brandID) === String(brandID)
  );
}

// Return available brands
function getAllBrands() {
  return brands;
}

// Find a fragrance by ID
function getFragranceById(id) {
  return fragrances.find(
    fragrance => String(fragrance.fragranceID) === String(id)
  );
}

module.exports = {
  getAllFragrances,
  getAllBrands,
  getFragranceById
};