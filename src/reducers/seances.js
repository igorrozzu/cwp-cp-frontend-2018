import * as ActionTypes  from "./../actions/action-types";

const initialState = {
    data: []
};
const seances = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SEANCES:

            return {
                data: action.payload
            };
        default:
            return state;
    }
};

export default seances;
