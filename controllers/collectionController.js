const collectionService = require("../services/collectionService");

// Display the logged-in user's collection
exports.getCollection = (req, res) => {
  const collection = collectionService.getUserCollection(
    req.session.userID
  );

  res.render("collection", {
    title: "ScentVault | My Collection",
    collection
  });
};

// Add a fragrance
exports.addFragrance = (req, res) => {
  try {
    collectionService.addToCollection(
      req.session.userID,
      req.params.id
    );

    res.redirect("/collection");
  } catch (error) {
    console.error(error);
    res.status(404).send("Unable to add fragrance.");
  }
};

// Remove a fragrance
exports.removeFragrance = (req, res) => {
  const removed = collectionService.removeFromCollection(
    req.session.userID,
    req.params.id
  );

  if (!removed) {
    return res.status(404).send("Collection item not found.");
  }

  res.redirect("/collection");
};