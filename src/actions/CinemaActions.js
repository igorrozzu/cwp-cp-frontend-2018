import * as ActionTypes  from "./action-types";
import {API_URI as uri} from '../config/AppConstants';
import axios from 'axios';

export function setCinemas(payload) {

    return {
        type: ActionTypes.SET_CINEMAS,
        payload: payload
    };
}


