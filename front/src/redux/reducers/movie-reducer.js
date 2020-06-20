import { RECEIVE_MOVIE } from "../constants";

const inicialState = { movie: {} };

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case RECEIVE_MOVIE:
      return Object.assign({}, state, { movie: action.movie });
    default:
      return state;
  }
}
