import axios from "axios";
import { USER_DATA_ONE } from "../constants";
const fetch = require("node-fetch");
const receiveUserOne = function (userOne) {
  return {
    type: USER_DATA_ONE,
    userOne: userOne,
  };
};

export const fetchUserOne = function (id) {
  return function (dispatch, getState) {
    var dataUser = new Object();
    dataUser.moviesData = [];
    var arrayPeliculas = [];
    axios.get(`/users/getOne/${id}`).then((res) => {
      dataUser = res.data;
      arrayPeliculas = res.data.moviesID;

      let peliculas = [];

      for (var i = 0; i < arrayPeliculas.length; i++) {
        let movieId = arrayPeliculas[i];
        peliculas.push(
          axios.get(`https://omdbapi.com/?apikey=20dac387&i=${movieId}`)
        );
      }

      Promise.all(peliculas).then((algo) => {
        dataUser.moviesData = algo;
        dispatch(receiveUserOne(dataUser));
      });
    });
  };
};
