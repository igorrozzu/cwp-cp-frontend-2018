import React from 'react';
import {GridList} from 'material-ui/GridList';
import CinemaCard from "./CinemaCard";
import {Link} from "react-router-dom";

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1100,
    },
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const CinemaList = (props) => (
    <div style={styles.root}>
        <GridList
            cols={3}
            cellHeight={400}
            style={styles.gridList}
        >
            {props.cinemas.map((cinema) => (
                <Link to={`/cinemas/${cinema.id}/movies`} className="bm-link" key={cinema.id}>
                    <CinemaCard key={cinema.id}
                                cinema={cinema}
                                role={props.role}
                                updateLink={`/cinemas/update/${cinema.id}`}
                                cover={cinema.img ? cinema.img : props.defaultImg}
                    />
                </Link>
            ))}
        </GridList>
    </div>
);

export default CinemaList;
