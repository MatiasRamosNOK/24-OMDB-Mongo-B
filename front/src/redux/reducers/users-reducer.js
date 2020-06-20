import { USERS_DATA } from "../constants";

const inicialState = {
  users: { users: [] },
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case USERS_DATA:
      return Object.assign({}, state, { users: action.users });
    default:
      return state;
  }
}
