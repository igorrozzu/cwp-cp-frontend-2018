import * as ActionTypes  from "./../actions/action-types";

const initialState = {
    data: [],
    meta: {
        limit: 9,
        page: 0,
        count: 0,
        pageCount: 0
    },
    isFetching: true
};
const users = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_USERS_FAILURE:
            return {
                data: action.payload.message,
                isFetching: null
            };
        case ActionTypes.GET_USERS_SUCCESS:
            return Object.assign({}, action.payload, {isFetching: false});
        default:
            return state;
    }
};

export default users;