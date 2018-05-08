import * as ActionTypes  from "./../actions/action-types";

const global = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SERVER_FAILURE:
            return {...state, message: action.payload.error, error: true};
        case ActionTypes.SERVER_SUCCESS:
            return {...state, message: action.payload.message, error: false};
        case ActionTypes.RESET_MESSAGE:
            return Object.assign({}, state, {message: null});
        case ActionTypes.GET_ENTITY:
            return Object.assign({}, state, {entity: action.payload});
        default:
            return state;
    }
};

export default global;