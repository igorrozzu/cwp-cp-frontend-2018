import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                login: '',
                password: '',
                email: '',
                phoneNumber: '',
                creditCard: '',
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit() {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        this.props.handleSubmit(this.state.formData);
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                className={"simple-form"}
                onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <TextValidator
                    floatingLabelText="Username"
                    onChange={this.handleChange}
                    name="login"
                    value={formData.login}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Phone number"
                    onChange={this.handleChange}
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    validators={['required', 'minStringLength:9', 'isNumber']}
                    errorMessages={[
                        'this field is required',
                        'number can\'t be less than 9',
                        'phone number is not valid'
                    ]}
                />
                <br />
                <TextValidator
                    floatingLabelText="Credit card"
                    onChange={this.handleChange}
                    name="creditCard"
                    value={formData.creditCard}
                    validators={['required', 'minStringLength:8', 'maxStringLength:20', 'isNumber']}
                    errorMessages={[
                        'this field is required',
                        'credit card can\'t be less than 8',
                        'credit card can\'t be more than 20',
                        'credit card is not valid'
                    ]}
                />
                <br />
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Sign up')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
        );
    }
}
