const express = require("express");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const db = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const { init: initAuth } = require("./auth");
const bodyParser = require("body-parser");
const { protectRoute } = require("./auth");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");

initAuth();

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static("static"));

app.get("/", protectRoute, (req, res) => {
  res.redirect("posts");
});
app.use("/", authRoutes);
app.use("/", postsRoutes);

db.sync({ force: false })
  // .then(() => {
  //   return db.drop();
  // });
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
