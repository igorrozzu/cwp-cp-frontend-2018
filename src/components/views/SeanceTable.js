import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton';

export default class SeanceTable extends React.Component {

    constructor(props)
    {
        super(props);
        this.onCheck = this.onCheck.bind(this);
        this.bookingHandler = this.bookingHandler.bind(this);
        this.state = {
            seats: []
        };
    }

    initRows()
    {
        this.rows = [];
        for (let i = 0; i < this.props.seats.length; i++) {
            let seats = [];
            while (this.props.seats[i + 1] !== undefined &&
            this.props.seats[i].rawNumber === this.props.seats[i + 1].rawNumber) {
                seats.push({
                    seatId: this.props.seats[i].id,
                    seatNumber: this.props.seats[i].seatNumber,
                    booking: this.props.seats[i].booking
                });
                i++;
            }
            this.rows.push(seats);
        }
    }

    bookingHandler()
    {
        if (this.state.seats.length === 1) {
            const success = this.props.bookingHandler({
                seatId: this.state.seats[0]
            });
            if (success) {
                this.setState({seats: []});
            }
        } else {
            this.props.bookingHandler({});
        }
    }

    onCheck(event, isChecked) {
        let seatId = event.target.getAttribute('data-seatid');
        this.setState((oldState) => {
            if (isChecked) {
                return {
                    seats: [...oldState.seats, seatId]
                };
            } else {
                return {
                    seats: oldState.seats.filter((seat) => (seat !== seatId)),
                };
            }
        });
    }

    render() {
        this.initRows();
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>The seats for this seance</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>{index + 1}</TableRowColumn>
                            {row.map((seat) => (
                                <TableRowColumn>
                                    <Checkbox label={seat.seatNumber} onCheck={this.onCheck}
                                              data-seatid={seat.seatId }
                                              defaultChecked={seat.booking ? true: false}
                                              disabled={seat.booking ? true: false} />
                                </TableRowColumn>
                            ))}
                        </TableRow>

                    ))}

                </TableBody>
            </Table>
                <RaisedButton label="Book" fullWidth={true} onClick={this.bookingHandler} />
            </div>
        );
    }
}
