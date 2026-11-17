const fs = require("fs");
const path = require("path");

// Object type 1: Brand
class Brand {
  constructor(brandID, name, country = "Not specified") {
    this.brandID = brandID;
    this.name = name;
    this.country = country;
  }
}

// Object type 2: Fragrance
class Fragrance {
  constructor(perfume) {
    this.fragranceID = perfume.id;
    this.name = perfume.name;
    this.brandID = perfume.house_id;
    this.brand = perfume.house;
    this.notes = perfume.notes || [];
    this.topNotes = perfume.top_notes || [];
    this.heartNotes = perfume.heart_notes || [];
    this.baseNotes = perfume.base_notes || [];
    this.concentration = perfume.concentration || "Not specified";
    this.family = perfume.family || "Not specified";
    this.description = perfume.description || "";
  }
}

// Read the existing fragrance dataset
const filePath = path.join(__dirname, "../data/perfumes.jsonl");
const fileContent = fs.readFileSync(filePath, "utf8");

// Create Fragrance instances
const fragrances = fileContent
  .split(/\r?\n/)
  .filter(line => line.trim() !== "")
  .map(line => new Fragrance(JSON.parse(line)));

// Create unique Brand instances
const brands = Array.from(
  new Map(
    fragrances.map(fragrance => [
      fragrance.brandID,
      new Brand(fragrance.brandID, fragrance.brand)
    ])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name));

// Retrieve fragrances, with optional filters
function getAllFragrances(brandID, search = "") {
  let results = fragrances;

  if (brandID) {
    results = results.filter(
      fragrance =>
        String(fragrance.brandID) === String(brandID)
    );
  }

  if (search) {
    const searchTerm = String(search).toLowerCase().trim();

    results = results.filter(fragrance =>
      fragrance.name.toLowerCase().includes(searchTerm) ||
      fragrance.brand.toLowerCase().includes(searchTerm)
    );
  }

  return results;
}

function getAllBrands() {
  return brands;
}

function getFragranceById(id) {
  return fragrances.find(
    fragrance =>
      String(fragrance.fragranceID) === String(id)
  );
}

module.exports = {
  Brand,
  Fragrance,
  getAllFragrances,
  getAllBrands,
  getFragranceById
};