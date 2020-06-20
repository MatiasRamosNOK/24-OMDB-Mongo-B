"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/usersOMDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Arrancamos la DB");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Conectado a la DB");
});
