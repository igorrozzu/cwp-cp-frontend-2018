import * as ActionTypes  from "./action-types";
import {API_URI as uri} from '../config/AppConstants';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function getUsers(params) {
    return async (dispatch) => {
        const {data} = await axios.get(
             `${uri}/users?page=${params.page}&limit=${params.limit}`
        );

        if (data.error) {
            dispatch({
                type: ActionTypes.GET_USERS_FAILURE,
                payload: data.message
            });
        } else {
            dispatch({
                type: ActionTypes.GET_USERS_SUCCESS,
                payload: data
            });
        }
    }
}