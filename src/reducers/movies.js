import * as ActionTypes  from "./../actions/action-types";

const initialState = {
    data: [],
    meta: {
        limit: 9,
        page: 1,
        count: 0,
        pageCount: 0
    },
};
const movies = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_MOVIES:
        case ActionTypes.GET_SHOWING_MOVIES:
            if (action.payload.isFetching) {
                action.payload.meta = {
                    page: initialState.meta.page,
                    limit: initialState.meta.limit,
                }
            }
            return Object.assign({}, state, action.payload);
        case ActionTypes.MOVIES_BY_CINEMA_FAILURE:
            return action.payload;
        case ActionTypes.MOVIES_BY_CINEMA_SUCCESS:
            return Object.assign({}, state, {data: action.payload});
        default:
            return state;
    }
};

export default movies;
