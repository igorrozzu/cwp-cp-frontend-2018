import { combineReducers } from 'redux'
import user from './user'
import cinemas from "./cinemas";
import movies from "./movies";
import seances from "./seances";
import cinemaSeats from "./cinemaSeats";
import reviews from "./reviews";
import users from "./users";
import global from "./global";

export default combineReducers({
    user,
    cinemas,
    movies,
    seances,
    cinemaSeats,
    reviews,
    users,
    global
})
