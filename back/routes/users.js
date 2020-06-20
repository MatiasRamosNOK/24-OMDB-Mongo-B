var express = require("express");
var router = express.Router();
var path = require("path");
const User = require("../models/User.js");
var passport = require("passport");

router.get("/login", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../public", "logout.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
  }
});

router.get("/isAutenticated", (req, res, next) => {
  if (req.isAuthenticated()) {
    var data = req.session.passport;
    var obj = new Object();
    User.findById(data.user).then((user) => {
      console.log("El usuario es:", user);
      obj.id = user._id;
      obj.sessionID = user.sessionID;
      obj.moviesID = user.moviesID;
      obj.email = user.email;
      console.log("El objeto en el back es:", obj);
      res.status(200).send(obj);
    });
  } else {
    res.status(204).send("No esta autenticado");
  }
});

router.get("/getOne/:id", (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    var obj = new Object();
    obj.email = user.email;
    obj.moviesID = user.moviesID;
    res.send(obj);
  });
});

router.get("/getAll/:id", (req, res, next) => {
  var idUser = req.params.id;

  User.find().then((users) => {
    var array = [];
    for (var i = 0; i < users.length; i++) {
      var user = new Object();
      user.id = users[i]._id;
      user.moviesID = users[i].moviesID;
      user.email = users[i].email;
      array[i] = user;
    }
    array = array.filter((x) => x._id != idUser);
    res.send(array);
  });
});

router.post("/login", passport.authenticate("local"), function (
  req,
  res,
  next
) {
  console.log("Log OK!");
  User.findByIdAndUpdate(req.session.passport.user, {
    sessionID: req.sessionID,
  }).then(() => {
    res.redirect("/");
  });
});

router.get("/register", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../public", "autenticado.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public", "register.html"));
  }
});

router.post("/register", function (req, res, next) {
  console.log("ID SESSION REGISTER:", req.sessionID);
  var obj = req.body;
  obj.sessionID = req.sessionID;
  User.create(obj)
    .then((user) => {
      console.log(user);
      res.status(200).send("Ok");
    })
    .catch((err) => {
      console.log("EL ERROR AL REGISTRAR ES:", err);
      console.log("it comes from catch");
      res.status(205).send("Email is already in use");
    });
});

router.post("/:idUser/addMovie/:idMovie", (req, res, next) => {
  var idUser = req.params.idUser;
  var idMovie = req.params.idMovie;
  User.findByIdAndUpdate(
    { _id: idUser },
    { $push: { moviesID: idMovie } }
  ).then(() => {
    User.findById(idUser).then((user) => {
      console.log("EL USUARIO ACTUALIZADO ES:", user);
      res.status(201).send(user);
    });
  });
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    var obj = new Object();
    obj.movies = user.moviesID;
    obj.email = user.email;
    res.send(obj);
  });
});

router.delete("/:idUser/:idMovie", (req, res, next) => {
  User.updateOne(
    { _id: req.params.idUser },
    { $pullAll: { moviesID: [req.params.idMovie] } }
  ).then((user) => {
    var obj = new Object();
    obj.email = user.email;
    obj.moviesID = user.moviesID;
    console.log("User despues del delete:", user);
    res.send(obj);
  });
  /*
  User.findByIdAndUpdate(
    { _id: req.params.idUser },
    {
      $pull: { movies: { $in: req.params.idMovie } },
    }
  ).then(() => {
    User.findById(req.params.idUser).then((user) => {
      var obj = new Object();
      obj.email = user.email;
      obj.moviesID = user.moviesID;
      console.log("User despues del delete:", user);
      res.send(obj);
    });
  });
  */
});

module.exports = router;
