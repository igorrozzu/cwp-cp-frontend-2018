import React, { PureComponent } from "react";
import * as Auth from "../../api/Auth";
import Register from "../../components/forms/Register";

import Notification from "../../helpers/Notification";
class RegisterContainer extends PureComponent {

    constructor()
    {
        super();
        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(formData)
    {
        let { data } = await Auth.Register(formData);
        if (data.error) {
            Notification.error(data.messages || data.message);
        } else {
            Notification.success('User has successfully created');
        }
    }

    render() {
        return (
            <Register handleSubmit={this.submitHandler} />
        );
    }
}

export default RegisterContainer;
