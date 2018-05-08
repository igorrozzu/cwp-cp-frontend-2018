import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as MovieActions from "../../actions/MovieActions";
import * as ReviewActions from "../../actions/ReviewActions";
import MovieList from "../../components/views/MovieList";
import {Subheader} from "material-ui";
import ReviewList from "../../components/views/ReviewList";

class MoviesByCinemaContainer extends React.Component {

    constructor(props)
    {
        super(props);
    }

    async componentDidMount() {
        this.props.movieActions.getMoviesByCinema({
            cinemaId: this.props.match.params.cinemaId
        });
        this.props.reviewActions.getReviewsByCinema({
            cinemaId: this.props.match.params.cinemaId
        })

    }

    render() {
        return (
        <div className="moviesByCinemaBox">
            <Subheader>Movies</Subheader>
            <MovieList movies={this.props.movies.data} defaultImg={'/images/cinema.png'}/>
            <Subheader>Reviews</Subheader>
            <ReviewList reviews={this.props.reviews.data} defaultImg={'/images/cinema.png'}/>
        </div>
        );
    }
}

const mapStateToProps = store => ({
    movies: store.movies,
    reviews: store.reviews
});

const mapDispatchToProps = dispatch => ({
    movieActions: bindActionCreators(MovieActions, dispatch),
    reviewActions: bindActionCreators(ReviewActions, dispatch)
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MoviesByCinemaContainer)
);
