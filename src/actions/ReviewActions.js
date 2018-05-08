import * as ActionTypes  from "./action-types";
import {API_URI as uri} from '../config/AppConstants';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function getReviewsByCinema(params) {
    return async (dispatch) => {
        const {data} = await axios.get(
             `${uri}/cinemas/${params.cinemaId}/reviews`
        );

        if (data.error) {
            dispatch({
                type: ActionTypes.GET_REVIEWS_BY_CINEMA_FAILURE,
                payload: data.message
            });
        } else {
            dispatch({
                type: ActionTypes.GET_REVIEWS_BY_CINEMA_SUCCESS,
                payload: data
            });
        }
    }
}