import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as SeanceActions from "../../actions/SeanceActions";
import * as SeanceApi from "../../api/SeanceApi";
import Notification from "../../helpers/Notification";
import SeanceTable from "../../components/views/SeanceTable";

class SeanceContainer extends React.Component {

    constructor(props)
    {
        super(props);
        this.bookingHandler = this.bookingHandler.bind(this);
    }

    async componentDidMount() {
        const {data} = await SeanceApi.getCinemaSeats({
            cinemaId: this.props.match.params.cinemaId,
            seanceId: this.props.match.params.seanceId,
        });

        this.props.seance.setCinemaSeats(data);
    }

    componentWillUnmount()
    {
        this.props.seance.unsetCinemaSeats();
    }

    async bookingHandler(options)
    {
        if (options.seatId !== undefined) {
            const {data} = await SeanceApi.bookCinemaSeat({
                seanceId: this.props.match.params.seanceId,
                seatId: options.seatId
            });

            if (data.error) {
                Notification.error('Something went wrong');
                return false;
            } else {
                Notification.success('The seat had successfully booked');
                this.props.seance.checkSeat(options.seatId);
                return true;
            }
        } else {
            Notification.error('You must chose one free seat');
            return false;
        }
    }
    

    render() {
        return (
        <div className="seanceBox">
            <SeanceTable seats={this.props.cinemaSeats.data}
                         bookingHandler={this.bookingHandler}/>
        </div>
        );
    }
}

const mapStateToProps = store => ({
    cinemaSeats: store.cinemaSeats
});

const mapDispatchToProps = dispatch => ({
    seance: bindActionCreators(SeanceActions, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SeanceContainer)
);
