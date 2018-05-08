import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import ReactPaginate from 'react-paginate';
import * as MovieActions from "../../actions/MovieActions";
import MovieList from "../../components/views/MovieList";
import {RaisedButton, Subheader} from "material-ui";
import {Tabs, Tab} from 'material-ui/Tabs';
import SkyLight from 'react-skylight';
import BindMovieToCinemaForm from "../../components/forms/BindMovieToCinemaForm";
import moment from 'moment';
import hasAccess from "../../helpers/Permissions";

class MovieContainer extends React.Component {

    constructor(props)
    {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.bindMovieHandler = this.bindMovieHandler.bind(this);
        this.state = {
            tab: 'showing',
        };
    }

    handleChange = async (value) => {
        this.setState({
            tab: value,
        });
        await this.loadMovies({
            type: value,
            page: 1,
            limit: 9,
        });
    };

    async bindMovieHandler(formData) {
        const movieId = formData.movieId;
        formData.showingFrom = moment(formData.showingFrom).format('MM-DD-YYYY');
        formData.showingTo = moment(formData.showingTo).format('MM-DD-YYYY');
        delete formData.movieId;
        this.props.bindMovieToCinema(movieId, formData);
    };

    async handlePageClick(data) {
        await this.loadMovies({
            type: this.state.tab,
            page: data.selected + 1,
            limit: this.props.movies.meta.limit,
        });
    };

    async loadMovies(params) {
        switch (params.type) {
            case 'showing': this.props.getShowingMovies(params); break;
            case 'all': this.props.getMovies(params); break;
        }
    }

    async componentDidMount() {
        await this.loadMovies({
            type: this.state.tab,
            page: this.props.movies.meta.page,
            limit: this.props.movies.meta.limit,
        });
    }

    renderPagination()
    {
        return (
            <ReactPaginate previousLabel={"prev"}
                           nextLabel={"next"}
                           previousClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextClassName={"page-item"}
                           nextLinkClassName={"page-link"}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           pageCount={this.props.movies.meta.pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination"}
                           subContainerClassName={"page-item"}
                           activeClassName={"active"} />
        )
    }

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}>
                <Tab label="Showing movies" value="showing">
                    <div className="movieBox">
                        <Subheader>Movies</Subheader>
                        <MovieList movies={this.props.movies.data}
                                   defaultImg={'/images/cinema.png'}
                                    role={this.props.user.data.role}/>
                        {this.renderPagination()}
                    </div>
                </Tab>
                <Tab label="All movies" value="all">
                    <div className="movieBox">
                        <Subheader>Movies</Subheader>
                        {hasAccess(this.props.user.data.role) ? (
                            <div>
                            <RaisedButton label={'Add movie'} href={'/movies/add'}/><br/>
                            <RaisedButton label={'Bind movie to cinema'} onClick={() => this.bindMovieDialog.show()}/>
                            </div>
                        ) : ('')}
                        <MovieList movies={this.props.movies.data}
                                   role={this.props.user.data.role}
                                   defaultImg={'/images/cinema.png'}/>
                        {this.renderPagination()}
                    </div>

                    <SkyLight hideOnOverlayClicked ref={ref => this.bindMovieDialog = ref}
                              title="Bind movie to cinema">
                        <BindMovieToCinemaForm formClassName={'bind-movie-form'}
                                               submitHandler={this.bindMovieHandler}/>
                    </SkyLight>
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = store => ({
    movies: store.movies,
    user: store.user,
});

const mapDispatchToProps = dispatch => ({
    getMovies: bindActionCreators(MovieActions.getMovies, dispatch),
    getShowingMovies: bindActionCreators(MovieActions.getShowingMovies, dispatch),
    bindMovieToCinema: bindActionCreators(MovieActions.bindMovieToCinema, dispatch)
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
);
