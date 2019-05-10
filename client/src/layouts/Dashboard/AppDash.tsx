import 'assets/css/material-dashboard-react.css?v=1.2.0';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import indexRoutes from '../../routes';
import { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});
import ApolloClient from 'apollo-boost';

const hist = createBrowserHistory();
class AppDash extends Component<any, any> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={hist}>
          <Switch>
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}
export default AppDash;
