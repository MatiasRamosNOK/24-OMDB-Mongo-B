import { RECEIVE_MOVIES } from "../constants";

const inicialState = { Search: [] };

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case RECEIVE_MOVIES:
      return Object.assign({}, state, { Search: action.movies });
    default:
      return state;
  }
}
