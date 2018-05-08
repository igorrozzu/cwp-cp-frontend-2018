import * as ActionTypes  from "./action-types";
import {API_URI as uri} from '../config/AppConstants';
import {errorAction} from "./CommonActions";
import axios from 'axios';
axios.defaults.withCredentials = true;

export function showingMovieAction(payload) {
    return {
        type: ActionTypes.GET_SHOWING_MOVIES,
        payload: payload
    }
}

export function movieAction(payload) {
    return {
        type: ActionTypes.GET_MOVIES,
        payload: payload
    }
}

export function bindMovieToCinema(movieId, params) {
    return (dispatch) => {
        axios.post(
            `${uri}/movies/${movieId}/showing`, {
                data: params,
            }
        ).then(data => {
            dispatch({
                type: ActionTypes.SERVER_SUCCESS,
                payload: {message: 'Movie has successfully bound'}
            });
        }).catch(error => {
            dispatch(errorAction(error));
        });
    }
}

export function getShowingMovies(params) {
    return async (dispatch) => {
        dispatch(showingMovieAction({isFetching: true}));
        const {data} = await axios.get(
            `${uri}/movies/showing?page=${params.page}&limit=${params.limit}`
        );

        if (data.error) {
            dispatch(showingMovieAction({error: data.message}));
        } else {
            dispatch(showingMovieAction({
                ...data,
                isFetching: false,
            }));
        }
    }
}

export function getMovies(params) {
    return async (dispatch) => {
        dispatch(movieAction({isFetching: true}));
        const {data} = await axios.get(
            `${uri}/movies?withMeta=true&page=${params.page}&limit=${params.limit}`
        );

        if (data.error) {
            dispatch(movieAction({error: data.message}));
        } else {
            dispatch(movieAction({
                ...data,
                isFetching: false,
            }));
        }
    }
}

export function getMoviesByCinema(params) {
    return async (dispatch) => {
        const {data} = await axios.get(
             `${uri}/cinemas/${params.cinemaId}/showing-movies`
        );

        if (data.error) {
            dispatch({
                type: ActionTypes.MOVIES_BY_CINEMA_FAILURE,
                payload: data.message
            });
        } else {
            dispatch({
                type: ActionTypes.MOVIES_BY_CINEMA_SUCCESS,
                payload: data
            });
        }
    }
}