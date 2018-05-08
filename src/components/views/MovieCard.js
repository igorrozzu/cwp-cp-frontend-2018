import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import hasAccess from "../../helpers/Permissions";

export default class MovieCard extends React.Component {

    constructor(props)
    {
        super(props);
        this.updateHandler = this.updateHandler.bind(this);
    }

    updateHandler(e)
    {
        e.preventDefault();
        window.location.href = this.props.updateLink;
    }

    render() {
        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.props.movie.name}
                                        subtitle={this.props.movie.slogan} />}
                >
                    <img src={this.props.cover} alt="" />
                </CardMedia>
                <CardTitle title={'Rating: ' + this.props.movie.rating}
                           subtitle={'Duration: ' + this.props.movie.duration + 'min'} />

                {hasAccess(this.props.role) ? (
                    <CardActions>
                        <FlatButton label="Update"
                                    onClick={this.updateHandler}/>
                    </CardActions>
                ) : ('')}
            </Card>
        );
    }
}