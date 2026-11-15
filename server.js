
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const userService = require("./services/userService");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const fragranceRoutes = require("./routes/fragranceRoutes");
const pageRoutes = require("./routes/pageRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
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
app.use(session({
  secret: process.env.SESSION_SECRET || "scentvault-local-development-only",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  }
}));
app.use("/", reviewRoutes);

// Make the logged-in user available to EJS pages
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userID
    ? userService.getUserById(req.session.userID)
    : null;

  next();
});

// Routes
app.use("/", pageRoutes);
app.use("/", fragranceRoutes);
app.use("/", authRoutes);
app.use("/", collectionRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`ScentVault running at http://localhost:${PORT}`);
});