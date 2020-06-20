import { FILTER_USERS } from "../constants";

const receiveData = function (list) {
  return {
    type: FILTER_USERS,
    list: list,
  };
};

export const fetchList = function (list) {
  return function (dispatch, getState) {
    dispatch(receiveData(list));
  };
};
