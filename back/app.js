require("./models/db/index");
var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();
var LocalStrategy = require("passport-local").Strategy;
var db = require("./models/db/index");
var User = require("./models/User");
var passport = require("passport");
var bodyParser = require("body-parser");
var path = require("path");
var users = require("./routes/users");
const volleyball = require("volleyball");

app.use(volleyball);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "BootcampP5" }));
app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 3000;
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (inputEmail, inputPassword, done) {
      console.log("Estoy por buscar un usuario");

      User.findOne({
        email: inputEmail,
      })
        .then((user) => {
          if (!user) {
            console.log("No existe ese correo");
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(inputPassword)) {
            console.log("La contraseña es INCORRECTA");
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

app.use("/", routes);

app.use("/users", users);

app.listen(port);

module.exports = app;
