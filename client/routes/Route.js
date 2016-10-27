import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import App from '../components/App/App';
import List from '../components/User/List';

export default (
  <Route path='/' component={App} queries={ViewerQuery}>
    <IndexRoute component={List} queries={ViewerQuery} />
    <Redirect from='*' to='/' />
  </Route>
);

