import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Chip, RaisedButton} from "material-ui";
import moment from 'moment';
import {Link} from "react-router-dom";
import hasAccess from "../../helpers/Permissions";

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default class SheduleTable extends React.Component {

    constructor(props) {
        super(props);

        this.addingHandler = this.addingHandler.bind(this);
    }

    addingHandler(e)
    {
        const showingId = e.currentTarget.getAttribute('data-showingId');
        this.props.addingHandler(showingId);
    }

    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Cinema</TableHeaderColumn>
                        <TableHeaderColumn>Showing period</TableHeaderColumn>
                        <TableHeaderColumn>Seances</TableHeaderColumn>
                        {hasAccess(this.props.role) ? (
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        ) : ('')}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableRowColumn>
                                <Link to={`/cinemas/${item.cinema.id}/movies`} className="bm-link">
                                    {item.cinema.name}
                                </Link>
                            </TableRowColumn>
                            <TableRowColumn>
                                From: {moment(item.showingFrom).format('MMMM Do YYYY, h:mm a')} <br/>
                                To: {moment(item.showingTo).format('MMMM Do YYYY, h:mm a')}
                            </TableRowColumn>
                            <TableRowColumn>
                                {item.seances.map((seance) => (
                                    <Link to={`/cinemas/${item.cinema.id}/seances/${seance.id}`}
                                          className="bm-link" key={seance.id}>
                                        <Chip style={styles.chip}>
                                            {moment(seance.showingDate).format('MMMM Do YYYY, h:mm a')}<br/>
                                            {'cost: ' + seance.cost}
                                        </Chip>
                                    </Link>
                                ))}
                            </TableRowColumn>
                            {hasAccess(this.props.role) ? (
                                <TableRowColumn>
                                    <RaisedButton label={'Add seance'}
                                                  containerElement={<div data-showingId={item.id}></div>}
                                                  onClick={this.addingHandler}/>
                                </TableRowColumn>
                            ) : ('')}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}