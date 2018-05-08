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
const cinemas = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CINEMAS:
            return action.payload;
        default:
            return state;
    }
};

export default cinemas;
