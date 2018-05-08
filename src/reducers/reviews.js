import * as ActionTypes  from "./../actions/action-types";

const initialState = {
    data: [],
    isFetching: true
};
const reviews = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_REVIEWS_BY_CINEMA_FAILURE:
            return {
                data: action.payload.message,
                isFetching: null
            };
        case ActionTypes.GET_REVIEWS_BY_CINEMA_SUCCESS:
            return {
                data: action.payload,
                isFetching: false
            };
        default:
            return state;
    }
};

export default reviews;