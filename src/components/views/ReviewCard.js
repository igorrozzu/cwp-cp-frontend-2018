import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const ReviewCard = (props) => (
    <Card>
        <CardHeader
            title={props.review.user.login}
            subtitle={props.review.mark}
            avatar={props.cover}
            actAsExpander={true}
            showExpandableButton={false}
        />
        <CardText expandable={false}>
            {props.review.text}
        </CardText>
    </Card>
);

export default ReviewCard;