import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default class MovieForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                "name": this.props.movie.name || "",
                "description": this.props.movie.description || "",
                "duration": this.props.movie.duration || "",
                "slogan": this.props.movie.slogan || "",
                "rating": this.props.movie.rating || "",
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
                <h1>{this.props.action} movie</h1>
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
                    floatingLabelText="Description"
                    onChange={this.handleChange}
                    name="description"
                    value={formData.description}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Duration"
                    onChange={this.handleChange}
                    name="duration"
                    value={formData.duration}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'must be a number']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Slogan"
                    onChange={this.handleChange}
                    name="slogan"
                    value={formData.slogan}
                    validators={['required']}
                    errorMessages={[
                        'this field is required',
                    ]}
                />
                <br />
                <TextValidator
                    floatingLabelText="Rating"
                    onChange={this.handleChange}
                    name="rating"
                    value={formData.rating}
                    validators={['required', 'isNumber']}
                    errorMessages={[
                        'this field is required',
                        'rating must be a number'
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
