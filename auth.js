const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

module.exports = {
  init: () => {
    passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          const user = await User.findOne({ where: { email } });
          if (!user)
            return done(null, false, {
              status: "error",
              message: "Usuário ou senha incorretos",
            });
          if (!bcrypt.compareSync(password, user.password))
            return done(null, false, {
              status: "error",
              message: "Usuário ou senha incorretos",
            });
          return done(null, user, {
            status: "success",
            message: "Usuário logado com sucesso",
          });
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    });
  },
  protectRoute: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login?next=" + req.url);
  },
};
