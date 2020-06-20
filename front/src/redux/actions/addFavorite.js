import axios from "axios";
import { USER_DATA } from "../constants";
const receiveUser = function (user) {
  return {
    type: USER_DATA,
    user: user,
  };
};

export const addFavorite = function (idUser, idMovie) {
  return function (dispatch, getState) {
    axios.post(`/users/${idUser}/addMovie/${idMovie}`, {}).then((resp) => {
      dispatch(receiveUser(resp.data));
    });
  };
};
