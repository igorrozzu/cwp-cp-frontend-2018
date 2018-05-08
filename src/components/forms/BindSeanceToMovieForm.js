import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {DatePicker} from "material-ui";

export default class BindSeanceToMovieForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                "cost": "",
                "showingDate": new Date(),
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleChangeDate(_, newDate) {
        const { formData } = this.state;
        formData['showingDate'] = newDate;
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
                    floatingLabelText="Cost"
                    onChange={this.handleChange}
                    name="cost"
                    value={formData.cost}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'must be a number']}
                />
                <br />
                <DatePicker hintText="Showing Date" mode="landscape"
                            onChange={this.handleChangeDate}
                            value={this.state.formData.showingDate}/>
                <br />
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Add')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
        );
    }
}
