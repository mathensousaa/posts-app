const express = require("express");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const db = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const { init: initAuth } = require("./auth");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.use(bodyParser({ extended: false }));
// app.use(express.urlencoded({ extended: false }));
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

app.use("/", authRoutes);
app.use("/", postsRoutes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
