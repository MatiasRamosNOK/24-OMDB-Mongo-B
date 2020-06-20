import { combineReducers } from "redux";
import moviesReducer from "../reducers/movies-reducer";
import movieReducer from "../reducers/movie-reducer";
import userReducer from "../reducers/user-reducer";
import usersReducer from "../reducers/users-reducer";
import userOneReducer from "../reducers/userOne-reducer";
import filterUser from "../reducers/filterList-reducer";
import addFavorite from "../reducers/addFavorite-reducer";
import deleteMovie from "../reducers/deleteMovie-reducer";

export default combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  user: userReducer,
  users: usersReducer,
  userOne: userOneReducer,
  filterUser: filterUser,
  addFavorite: addFavorite,
});
