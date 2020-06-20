import axios from "axios";
import { USER_DATA } from "../constants";

const receiveUser = function (user) {
  return {
    type: USER_DATA,
    user: user,
  };
};

export const fetchUser = function () {
  return function (dispatch, getState) {
    axios.get(`/users/isAutenticated`).then((res) => {
      dispatch(receiveUser(res.data));
    });
  };
};
