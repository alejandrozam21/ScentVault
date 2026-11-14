exports.getHome = (req, res) => {
  res.render("home", {
    title: "ScentVault | Home"
  });
};
