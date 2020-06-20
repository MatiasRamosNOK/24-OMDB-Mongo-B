import axios from "axios";
import { REMOVE_MOVIE } from "../constants";
const fetch = require("node-fetch");
const receiveUserOne = function (userOne) {
  return {
    type: REMOVE_MOVIE,
    userOne: userOne,
  };
};

export const removeMovie = function (idUser, idMovie) {
  return function (dispatch, getState) {
    axios
      .delete(`/users/${idUser}/${idMovie}`, {
        headers: {
          Authorization: "qcyo",
        },
        data: {
          source: "algo",
        },
      })
      .then((respuesta) => {
        var dataUser = new Object();
        dataUser.moviesData = [];
        var arrayPeliculas = [];
        axios.get(`/users/getOne/${idUser}`).then((res) => {
          dataUser = res.data;
          arrayPeliculas = res.data.moviesID;

          let peliculas = [];

          for (var i = 0; i < arrayPeliculas.length; i++) {
            let movieId = arrayPeliculas[i];
            peliculas.push(
              axios.get(`http://omdbapi.com/?apikey=20dac387&i=${movieId}`)
            );
          }

          Promise.all(peliculas).then((algo) => {
            dataUser.moviesData = algo;
            dispatch(receiveUserOne(dataUser));
          });
        });
      });
  };
};
