import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default class CinemaForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                "name": this.props.cinema.name || "",
                "manager": this.props.cinema.manager || "",
                "address": this.props.cinema.address || "",
                "phone": this.props.cinema.phone || "",
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
                <h1>{this.props.action} cinema</h1>
                <TextValidator
                    floatingLabelText="Name"
                    onChange={this.handleChange}
                    name="name"
                    value={formData.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Manager"
                    onChange={this.handleChange}
                    name="manager"
                    value={formData.manager}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Address"
                    onChange={this.handleChange}
                    name="address"
                    value={formData.address}
                    validators={['required']}
                    errorMessages={[
                        'this field is required',
                    ]}
                />
                <br />
                <TextValidator
                    floatingLabelText="Phone"
                    onChange={this.handleChange}
                    name="phone"
                    value={formData.phone}
                    validators={['required', 'isNumber']}
                    errorMessages={[
                        'this field is required',
                        'phone must be a number'
                    ]}
                />
                <br />
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Your form is submitted!')
                        || (!submitted && this.props.action)
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
        );
    }
}