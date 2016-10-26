import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import App from '../components/App/AppComponent';
import ListContainer from '../components/User/List';

export default (
  <Route path='/' component={App} queries={ViewerQuery}>
    <IndexRoute component={ListContainer} queries={ViewerQuery} />
    <Redirect from='*' to='/' />
  </Route>
);

