import axios from "axios";
import { RECEIVE_MOVIE } from "../constants";

const receiveMovie = function (movie) {
  return {
    type: RECEIVE_MOVIE,
    movie: movie,
  };
};

export const fetchMovie = function (id) {
  return function (dispatch, getState) {
    axios
      .get(`https://www.omdbapi.com/?apikey=20dac387&i=${id}`)
      .then((res) => {
        dispatch(receiveMovie(res.data));
      });
  };
};
