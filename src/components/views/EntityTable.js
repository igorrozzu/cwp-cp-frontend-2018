import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Chip} from "material-ui";
import moment from 'moment';
import {Link} from "react-router-dom";

export default class EntityTable extends React.Component {

    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        {this.props.headers.map((header) => (
                            <TableRowColumn>
                                {header}
                            </TableRowColumn>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.data.map((item) => (
                        <TableRow key={item.id}>
                            {this.props.headers.map((column) => (
                                <TableRowColumn>
                                    {item[column]}
                                </TableRowColumn>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}
