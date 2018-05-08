import * as ActionTypes  from "./../actions/action-types";

const initialState = {
    data: []
};
const cinemaSeats = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CINEMA_SEATS:

            return {
                data: action.payload
            };
        case ActionTypes.UNSET_CINEMA_SEATS:

            return {
                data: []
            };
        case ActionTypes.CHECK_CINEMA_SEAT:

            return {
                data: state.data.map((item) => {
                    if (item.id == action.payload.seatId) {
                        item.booking = true;
                    }
                    return item;
                })
            };
        default:
            return state;
    }
};

export default cinemaSeats;
