import { USER_DATA } from "../constants";

const inicialState = {
  user: {},
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case USER_DATA:
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
}
