import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
import ListContainer from '../components/User/List';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={ListContainer} queries={ViewerQuery} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />
    <Redirect from='*' to='/' />
  </Route>
);

