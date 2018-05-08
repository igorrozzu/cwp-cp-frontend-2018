import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {DatePicker} from "material-ui";

export default class BindMovieToCinemaForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                "cinemaId":  "",
                "movieId": "",
                "showingFrom": new Date(),
                "showingTo": new Date(),
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
    }

    handleChangeFrom(_, newDate) {
        const { formData } = this.state;
        formData['showingFrom'] = newDate;
        this.setState({ formData });
    }

    handleChangeTo(_, newDate) {
        const { formData } = this.state;
        formData['showingTo'] = newDate;
        this.setState({ formData });
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    submitHandler() {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        this.props.submitHandler(this.state.formData);
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                className={this.props.formClassName}
                onSubmit={this.submitHandler}>
                <TextValidator
                    floatingLabelText="Movie id"
                    onChange={this.handleChange}
                    name="movieId"
                    value={formData.movieId}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'must be a number']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Cinema id"
                    onChange={this.handleChange}
                    name="cinemaId"
                    value={formData.cinemaId}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'must be a number']}
                />
                <br />
                <DatePicker hintText="From" mode="landscape"
                            onChange={this.handleChangeFrom} value={this.state.formData.showingFrom}/>
                <DatePicker hintText="To" mode="landscape"
                            onChange={this.handleChangeTo} value={this.state.formData.showingTo}/>
                <br />
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Bind')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
        );
    }
}
