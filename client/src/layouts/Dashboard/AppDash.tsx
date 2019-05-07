import 'assets/css/material-dashboard-react.css?v=1.2.0';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import indexRoutes from '../../routes';
import { Component } from 'react';

const hist = createBrowserHistory();
class AppDash extends Component<any, any> {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} component={prop.component} key={key} />
            );
          })}
        </Switch>
      </Router>
    );
  }
}
export default AppDash;
