const userService = require("../services/userService");

exports.showRegister = (req, res) => {
  res.render("register", {
    title: "ScentVault | Register",
    error: null
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      return res.status(400).render("register", {
        title: "ScentVault | Register",
        error: "Enter your name, email, and a password of at least 8 characters."
      });
    }

    const user = await userService.registerUser(
      name,
      email,
      password
    );

    req.session.userID = user.userID;
    res.redirect("/");
  } catch (error) {
    if (error.message === "Email is already registered") {
      return res.status(400).render("register", {
        title: "ScentVault | Register",
        error: error.message
      });
    }
    console.error("Registration Error:", error);
    res.status(500).render("register", {
      title: "ScentVault | Register",
    });
  }
};

exports.showLogin = (req, res) => {
  res.render("login", {
    title: "ScentVault | Login",
    error: null
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).render("login", {
        title: "ScentVault | Login",
        error: "Enter a valid email and password."
      });
    }

    const user = await userService.loginUser(email, password);

    if (!user) {
      return res.status(401).render("login", {
        title: "ScentVault | Login",
        error: "Invalid email or password."
      });
    }

    req.session.regenerate(error => {
      if (error) return next(error);

      req.session.userID = user.userID;
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(error => {
    if (error) return next(error);

    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};