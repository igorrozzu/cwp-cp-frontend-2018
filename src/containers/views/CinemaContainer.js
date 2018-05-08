import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import CinemaList from "../../components/views/CinemaList";

import ReactPaginate from 'react-paginate';
import * as Cinema from "../../api/Cinema";
import * as CinemaAction from "../../actions/CinemaActions";
import {RaisedButton, Subheader} from "material-ui";
import hasAccess from "../../helpers/Permissions";

class CinemaContainer extends React.Component {

    constructor(props)
    {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    async handlePageClick(data) {
        await this.loadCinemasFromServer(data.selected + 1, this.props.cinemas.meta.limit);
    };

    async loadCinemasFromServer(page, limit) {

        const {data} = await Cinema.getAll({page: page, limit: limit});
        this.props.setCinemas(data);
    }

    async componentDidMount() {
        await this.loadCinemasFromServer(
            this.props.cinemas.meta.page,
            this.props.cinemas.meta.limit
        );
    }

    render() {
        return (
        <div className="cinemaBox">
            <Subheader>Cinemas</Subheader>
            {hasAccess(this.props.user.data.role) ? (
                <RaisedButton label={'Add cinema'} href={'/cinemas/add'}/>
            ) : ('')}
            <CinemaList cinemas={this.props.cinemas.data}
                        role={this.props.user.data.role}
                        defaultImg={'/images/cinema.png'}/>
            <ReactPaginate previousLabel={"prev"}
                           nextLabel={"next"}
                           previousClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextClassName={"page-item"}
                           nextLinkClassName={"page-link"}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           pageCount={this.props.cinemas.meta.pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination"}
                           subContainerClassName={"page-item"}
                           activeClassName={"active"} />
        </div>
        );
    }
}

const mapStateToProps = store => ({
    cinemas: store.cinemas,
    user: store.user,
});

const mapDispatchToProps = dispatch => ({
    setCinemas: bindActionCreators(CinemaAction.setCinemas, dispatch)
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CinemaContainer)
);
