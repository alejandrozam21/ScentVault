const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");

const userService = require("./services/userService");

const pageRoutes = require("./routes/pageRoutes");
const fragranceRoutes = require("./routes/fragranceRoutes");
const authRoutes = require("./routes/authRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Security and request-processing middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET ||
    "scentvault-local-development-only",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
}));

// Make logged-in user available to EJS
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userID
    ? userService.getUserById(req.session.userID)
    : null;

  next();
});

// Application routes
app.use("/", pageRoutes);
app.use("/", fragranceRoutes);
app.use("/", authRoutes);
app.use("/", collectionRoutes);
app.use("/", reviewRoutes);

// Handle pages that do not exist
app.use((req, res) => {
  res.status(404).render("404", {
    title: "ScentVault | Page Not Found"
  });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error("ScentVault Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).render("error", {
    title: "ScentVault | Error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`ScentVault running at http://localhost:${PORT}`);
});