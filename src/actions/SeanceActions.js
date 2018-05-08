import * as ActionTypes  from "./action-types";
import {API_URI as uri} from '../config/AppConstants';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function addSeance(params) {
    return (dispatch) => {
        axios.post(
            `${uri}/seances`, {
                data: params,
            }
        ).then(data => {
            dispatch({
                type: ActionTypes.SERVER_SUCCESS,
                payload: {message: `Seance has successfully added`}
            });
        }).catch(error => {
            const message = error.response && error.response.data ?
                (error.response.data.message || error.response.data.statusText) :
                error.message;
            dispatch({
                type: ActionTypes.SERVER_FAILURE,
                payload: {error: message}
            });
        });
    }
}

export function setSeances(payload) {

    return {
        type: ActionTypes.SET_SEANCES,
        payload: payload
    };
}

export function setCinemaSeats(payload) {

    return {
        type: ActionTypes.SET_CINEMA_SEATS,
        payload: payload
    };
}

export function unsetCinemaSeats() {

    return {
        type: ActionTypes.UNSET_CINEMA_SEATS,
        payload: {}
    };
}

export function checkSeat(seatId) {

    return {
        type: ActionTypes.CHECK_CINEMA_SEAT,
        payload: {
            seatId: seatId
        }
    };
}

