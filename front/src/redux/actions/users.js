import axios from "axios";
import { USERS_DATA } from "../constants";

const receiveUsers = function (users) {
  return {
    type: USERS_DATA,
    users: users,
  };
};

export const fetchUsers = function (id) {
  return function (dispatch, getState) {
    axios.get(`/users/getAll/${id}`).then((res) => {
      dispatch(receiveUsers(res.data));
    });
  };
};
