import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginContainer from './containers/forms/LoginContainer'
import MainLayout from './containers/layouts/MainContainer'
import Alert from 'react-s-alert';
import RegisterContainer from "./containers/forms/RegisterContainer";
import CinemaContainer from "./containers/views/CinemaContainer";
import MovieContainer from "./containers/views/MovieContainer";
import SheduleContainer from "./containers/views/SheduleContainer";
import SeanceContainer from "./containers/views/SeanceContainer";
import MoviesByCinemaContainer from "./containers/views/MoviesByCinemaContainer";
import FormContainer from "./containers/forms/FormContainer";
import UserContainer from "./containers/views/UserContainer";

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <MuiThemeProvider>
            <MainLayout>
                <Switch>
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/register" component={RegisterContainer} />
                    <Route path="/movies/:id(\d+)" component={SheduleContainer} />
                    <Route path="/:entity(movies|cinemas)/:action(add)"
                           component={FormContainer} />
                    <Route path="/:entity(movies|cinemas)/:action(update)/:id(\d+)"
                           component={FormContainer} />
                    <Route path="/movies" component={MovieContainer} />
                    <Route path="/cinemas/:cinemaId/seances/:seanceId"
                           component={SeanceContainer} />
                    <Route path="/cinemas/:cinemaId/movies"
                           component={MoviesByCinemaContainer} />
                    <Route path="/cinemas" component={CinemaContainer} />
                    <Route path="/users" component={UserContainer} />
                    {/*<Route component={Error404} />*/}
                </Switch>
                <Alert stack={{limit: 3}} />
            </MainLayout>
            </MuiThemeProvider>
        </Router>
    </Provider>
);


export default Root
