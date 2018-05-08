import * as ActionTypes  from "./../actions/action-types";
import {roles} from "../config/UserConstants";

const initialState = {
    isGuest: true,
    data: {role: roles.GUEST}
};
const user = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            let newState = initialState;
            newState.isGuest = false;
            newState.data = action.payload;
            return newState;
        case ActionTypes.LOGOUT_USER:
            return action.payload;
        default:
            return state;
    }
};

export default user;
