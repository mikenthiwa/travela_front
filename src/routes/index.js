import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login';
import RequireAuth from '../hoc/authHoc';
import LayoutShell from '../hoc/Layout';
import NotFound from '../views/ErrorPages';
import TravelaRoutes from './routes';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ConnectedLogin} />
    <Route path="/redirect/*" exact component={ConnectedLogin} />
    <Route>
      <LayoutShell>
        <Switch>
          {
            Object.keys(TravelaRoutes).map( (route) => {
              const [ component, auth = [] , ...otherProps] = TravelaRoutes[route];
              return (
                <Route
                  path={route}
                  key={route}
                  exact
                  {...otherProps}
                  component={RequireAuth( component, ...auth )}
                />
              );
            })
          }
          <Route component={RequireAuth(NotFound)} />
        </Switch>
      </LayoutShell>
    </Route>
  </Switch>
);


export default Routes;
