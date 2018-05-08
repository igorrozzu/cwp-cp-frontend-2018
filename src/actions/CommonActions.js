import * as ActionTypes  from "./action-types";

export function errorAction(error)
{
    const message = error.response && error.response.data ?
        (error.response.data.message || error.response.data.statusText) :
        error.message;

    return {
        type: ActionTypes.SERVER_FAILURE,
        payload: {error: message}
    };
}