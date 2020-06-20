import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PageBody from './PageBody';
import '../NotFound/NotFound.scss';

const history = createBrowserHistory();
 
class Maintenance extends Component {
  render() {
    history.push('/maintenance');
    return (
      <BrowserRouter>
        <Route
          path="/maintenance"
          exact
          component={PageBody}
        />
      </BrowserRouter>
      
    );
  }
}

export default Maintenance;
