import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu'
import { bindActionCreators } from "redux";
import * as AuthActions from "../../actions/AuthActions";
import * as GlobalActions from "../../actions/GlobalActions";
import Notification from "../../helpers/Notification";
import hasAccess from "../../helpers/Permissions";

class MainContainer extends PureComponent {

    constructor(props)
    {
        super(props);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    async componentWillMount()
    {
        this.props.authActions.initUser();
    }

    componentDidMount() {
        console.log('reset');
    }

    async logoutHandler(e)
    {
        e.preventDefault();
        this.props.authActions.logout();
    }

    render() {
        if (this.props.global.message) {
            this.props.global.error ?
                Notification.error(this.props.global.message) :
                Notification.success(this.props.global.message);
            this.props.globalActions.resetState();
        }

        return (
            <div className="ui" id="outer-container">
                <Menu
                    pageWrapId={"page-wrap"}
                    outerContainerId={"outer-container"}>
                    <nav className="bm-item-list bm-nav">

                        {this.props.user.isGuest ? (
                            <div>
                                <Link to="/login" className="bm-link" >
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span>Login</span>
                                </Link>
                                <Link to="/register" className="bm-link" >
                                <i className="fas fa-user-plus"></i>
                                <span>Registration</span>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/profile" className="bm-link" >
                                <i className="fas fa-user-plus"></i>
                                <span>{this.props.user.data.login}</span>
                            </Link>
                        )}

                        <Link to="/cinemas" className="bm-link">
                            <i className="fas fa-video"></i>
                            <span>Cinemas</span>
                        </Link>
                        <Link to="/movies" className="bm-link">
                            <i className="fas fa-film"></i>
                            <span>Movies</span>
                        </Link>

                        {hasAccess(this.props.user.data.role) ? (
                            <Link to="/users" className="bm-link" >
                                <i className="fas fa-user-plus"></i>
                                <span>Users</span>
                            </Link>
                        ) : ('')}
                        {!this.props.user.isGuest ? (
                            <Link to="/logout" className="bm-link" onClick={this.logoutHandler}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Exit</span>
                            </Link>
                        ) : ('')}

                    </nav>
                </Menu>
                <div id="page-wrap" className="container main__container--top-margin">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    user: store.user,
    global: store.global
});

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(AuthActions, dispatch),
    globalActions: bindActionCreators(GlobalActions, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MainContainer)
);
