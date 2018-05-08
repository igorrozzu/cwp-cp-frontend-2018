import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import ReactPaginate from 'react-paginate';
import * as UserActions from "../../actions/UserActions";

import EntityTable from "../../components/views/EntityTable";

class UserContainer extends React.Component {

    constructor(props)
    {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.state = {
            headers: ['id', 'login', 'password', 'email', 'phoneNumber' ]
        }
    }

    async handlePageClick(data) {
        this.props.getUsers({
            page: parseInt(data.selected) + 1,
            limit: this.props.users.meta.limit
        });
    };

    async componentWillMount() {
        this.props.getUsers({
            page: 0,
            limit: 9
        });
    }

    render() {
        return (
        <div className="userBox">
            <EntityTable data={this.props.users.data}
                         headers={this.state.headers}/>
            <ReactPaginate previousLabel={"prev"}
                           nextLabel={"next"}
                           previousClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextClassName={"page-item"}
                           nextLinkClassName={"page-link"}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           pageCount={this.props.users.meta.pageCount}
                           initialPage={0}
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
    users: store.users
});

const mapDispatchToProps = dispatch => ({
    getUsers: bindActionCreators(UserActions.getUsers, dispatch)
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UserContainer)
);