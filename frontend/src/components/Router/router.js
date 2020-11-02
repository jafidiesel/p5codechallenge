import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import PassengerList from '../PassengerList/PassengerList';
import NewPassenger from '../NewPassenger/NewPassenger';
import NewPackage from '../NewPackage/NewPackage';
import PackageList from '../PackageList/PackageList';
import PackagesByPassenger from '../PackagesByPassenger/PackagesByPassenger';

const Router = () => (
    <Fragment>
        <NavBar />
        <Switch>
            <Route exact path="/" component={PassengerList} />
            <Route exact path="/package-list" component={PackageList} />
            <Route exact path="/new-passenger" component={NewPassenger} />
            <Route exact path="/new-package" component={NewPackage} />
            <Route exact path="/:passengerId/packages" component={PackagesByPassenger} />
        </Switch>
        <Footer />
    </Fragment>
)

export default Router;