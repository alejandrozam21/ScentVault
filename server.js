
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const fragranceRoutes = require("./routes/fragranceRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const PORT = 3000;

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", pageRoutes);
app.use("/", fragranceRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`ScentVault running at http://localhost:${PORT}`);
});
