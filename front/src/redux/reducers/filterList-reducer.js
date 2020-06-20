import { FILTER_USERS } from "../constants";

const inicialState = { list: [] };

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case FILTER_USERS:
      return Object.assign({}, state, { list: action.list });
    default:
      return state;
  }
}
