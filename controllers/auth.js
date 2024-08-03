const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

module.exports = {
  registerView: (req, res) => {
    res.render("register");
  },

  loginView: (req, res) => {
    res.render("login");
  },

  registerUser: (req, res) => {},

  loginUser: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/?loginsuccess",
      failureRedirect: "/login?error",
    })(req, res);
  },

  logoutUser: (req, res) => {
    // TODO: complete
    res.redirect("login");
  },
};
