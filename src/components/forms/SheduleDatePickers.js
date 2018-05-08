import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

export default class SheduleDatePickers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dates: {
                from: new Date(),
                to: new Date(),
            },
        };

        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFrom(_, newDate) {
        const { dates } = this.state;
        dates['from'] = newDate;
        this.setState({ dates });
    }

    handleChangeTo(_, newDate) {
        const { dates } = this.state;
        dates['to'] = newDate;
        this.setState({ dates });
    }

    handleSubmit() {
        this.props.onSubmit(this.state.dates);
    }

    render() {
        const { dates } = this.state;
        return (
            <div className={"shedulePanel"}>
                <DatePicker hintText="From" mode="landscape"
                            onChange={this.handleChangeFrom} value={dates.from}/>
                <DatePicker hintText="To" mode="landscape"
                            onChange={this.handleChangeTo} value={dates.to}/>
                <RaisedButton onClick={this.handleSubmit}>Filter</RaisedButton>
            </div>
        );
    }
}
