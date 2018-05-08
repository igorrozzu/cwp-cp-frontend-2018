import React from 'react';
import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import ReviewCard from "./ReviewCard";

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1100,
        height: 450,
    },
};

const ReviewList = (props) => (
    <div style={styles.root}>
        <GridList
            cols={3}
            style={styles.gridList}
        >
            {props.reviews.map((review) => (
                <ReviewCard key={review.id}
                            review={review}
                            cover={props.defaultImg}
                />
            ))}
        </GridList>
    </div>
);

export default ReviewList;