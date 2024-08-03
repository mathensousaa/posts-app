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

  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("register", {
        error: "Por favor, preencha todos os campos",
      });
    }

    if (await User.findOne({ where: { email } })) {
      return res.render("register", {
        error: "Email já cadastrado",
      });
    }

    await User.create({ name, email, password: bcrypt.hashSync(password, 8) });

    const user = await User.findOne({
      where: { email },
    });

    res.redirect("/login?registrationdone");
  },

  loginUser: (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (info.status === "error") {
        return res.render("login", { error: info.message });
      }

      req.login(user, (err) => {
        if (err) return res.render("login", { error: err.message });
        res.redirect("/posts");
      });
    })(req, res);
  },

  logoutUser: (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
};
