import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as SeanceApi from "../../api/SeanceApi";
import SheduleTable from "../../components/views/SheduleTable";
import * as SeanceActions from "../../actions/SeanceActions";
import SkyLight from 'react-skylight';
import BindSeanceToMovieForm from "../../components/forms/BindSeanceToMovieForm";
//import SheduleDatePickers from "../../components/forms/SheduleDatePickers";

class SheduleContainer extends React.Component {

    constructor(props)
    {
        super(props);
        this.addingHandler = this.addingHandler.bind(this);
        this.bindSeanceHandler = this.bindSeanceHandler.bind(this);
    }

    async loadFromServer(movieId) {

        const {data} = await SeanceApi.getSeances({movieId: movieId});
        this.props.setSeances(data);
    }

    async componentDidMount() {
        await this.loadFromServer(
            this.props.match.params.id
        );
    }

    addingHandler(showingId) {

        this.setState({showingId: showingId});
        this.bindSeanceDialog.show();

    }

    bindSeanceHandler(formData) {
        formData.movieShowingId = this.state.showingId;
        this.props.seanceActions.addSeance(formData);
    }

    render() {
        if (this.props.seances.data.length === 0) {
            return (
                <div className="sheduleBox">
                    <h1>Showing shedule is empty</h1>
                </div>
            );
        }

        return (
            <div className="sheduleBox">
                <SheduleTable data={this.props.seances.data}
                              role={this.props.user.data.role}
                              movieId={this.props.match.params.id}
                              addingHandler={this.addingHandler}/>
                <SkyLight hideOnOverlayClicked ref={ref => this.bindSeanceDialog = ref}
                          title="Add seance to movie">
                    <BindSeanceToMovieForm formClassName={'bind-movie-form'}
                                           submitHandler={this.bindSeanceHandler}/>
                </SkyLight>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    seances: store.seances,
    user: store.user,
});

const mapDispatchToProps = dispatch => ({
    setSeances: bindActionCreators(SeanceActions.setSeances, dispatch),
    seanceActions: bindActionCreators(SeanceActions, dispatch)
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SheduleContainer)
);
