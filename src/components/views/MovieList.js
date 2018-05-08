import React from 'react';
import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import MovieCard from "./MovieCard";
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
const MovieList = (props) => (
    <div style={styles.root}>
        <GridList
            cols={3}
            cellHeight={400}
            style={styles.gridList}
        >
            {props.movies.map((movie) => (
                <Link to={`/movies/${movie.id}`} className="bm-link" key={movie.id}>
                <MovieCard key={movie.id}
                            movie={movie}
                           role={props.role}
                           updateLink={`/movies/update/${movie.id}`}
                            cover={movie.img ? movie.img : props.defaultImg}
                />
                </Link>
            ))}
        </GridList>
    </div>
);

export default MovieList;
