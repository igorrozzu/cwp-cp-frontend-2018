import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

import * as AuthActions from "../../actions/AuthActions";
import * as Auth from "../../api/Auth";
import Login from "../../components/forms/Login";

import Notification from "../../helpers/Notification";
class LoginContainer extends PureComponent {

    constructor()
    {
        super();
        this.loginHandler = this.loginHandler.bind(this);
    }

    async loginHandler(formData)
    {
        this.props.authActions.login(formData);

       /* let {data} = await Auth.Login(formData);

        if (data.error) {
            Notification.error(data.message);
        } else {

            const cookies = new Cookies();
            cookies.set('connect.sid', data.sessionId, { path: '/' });
            this.props.authAction.login(data.user);
            Notification.success('You has successfully logged in');
        }*/
    }

    render() {
        return (
            <Login handleSubmit={this.loginHandler} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(AuthActions, dispatch)
});

export default withRouter(
    connect(null, mapDispatchToProps)(LoginContainer)
);
