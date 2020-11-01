import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../../App';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import PassengerList from '../PassengerList/PassengerList';

const Router = () => (
    <Fragment>
        <NavBar />
        <Switch>
            <Route exact path="/" component={PassengerList} />
            <Route exact path="/new-passenger" component={App} />
            <Route exact path="/new-package" component={App} />
        </Switch>
        <Footer />
    </Fragment>
)

export default Router;