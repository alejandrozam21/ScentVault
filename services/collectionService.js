const fragranceService = require("./fragranceService");

class Collection {
  constructor(collectionID, userID, fragranceID) {
    this.collectionID = collectionID;
    this.userID = userID;
    this.fragranceID = fragranceID;
  }
}

const collections = [];
let nextCollectionID = 1;

// Add a fragrance to a user's collection
function addToCollection(userID, fragranceID) {
  const fragrance = fragranceService.getFragranceById(fragranceID);

  if (!fragrance) {
    throw new Error("Fragrance not found");
  }

  // Prevent duplicate entries
  const existing = collections.find(item =>
    item.userID === userID &&
    String(item.fragranceID) === String(fragranceID)
  );

  if (existing) {
    return existing;
  }

  const collection = new Collection(
    nextCollectionID++,
    userID,
    String(fragranceID)
  );

  collections.push(collection);
  return collection;
}

// Get all fragrances saved by a user
function getUserCollection(userID) {
  return collections
    .filter(item => item.userID === userID)
    .map(item => ({
      ...item,
      fragrance: fragranceService.getFragranceById(
        item.fragranceID
      )
    }))
    .filter(item => item.fragrance);
}

// Remove a saved fragrance
function removeFromCollection(userID, collectionID) {
  const index = collections.findIndex(item =>
    item.userID === userID &&
    item.collectionID === Number(collectionID)
  );

  if (index === -1) {
    return false;
  }

  collections.splice(index, 1);
  return true;
}

module.exports = {
  Collection,
  addToCollection,
  getUserCollection,
  removeFromCollection
};