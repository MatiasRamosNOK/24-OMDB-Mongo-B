import { USER_DATA_ONE } from "../constants";

const inicialState = {
  userOne: {},
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case USER_DATA_ONE:
      return Object.assign({}, state, { userOne: action.userOne });
    default:
      return state;
  }
}
