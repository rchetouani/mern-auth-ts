import { withStyles, Paper } from '@material-ui/core';
import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';

import { ItemGrid, RegularCard, StatsCard } from '../../components';
import * as React from 'react';
import { Query } from 'react-apollo';

import { gql } from 'apollo-boost';
import { Table } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GET_USER = gql`
  query UserByPole($Pole: String!) {
    UserByPole(pole: $Pole) {
      id
      name
      email
      password
      username
      status
      agency
      gender
      birthday
    }
  }
`;
class Users extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };

  render() {
    return (
      <ItemGrid xs={12} sm={6} md={6}>
        <RegularCard
          headerColor="orange"
          cardTitle="Collaborateur List "
          cardSubtitle="List of Collaborateurs on Skill Center"
          content={
            <Query
              query={GET_USER}
              variables={{ Pole: this.props.auth.user.pole }}
            >
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                var users = data.UserByPole;
                return (
                  <Paper>
                    <Table
                      tableHeaderColor="warning"
                      headRows={[
                        {
                          id: '0',
                          numeric: false,
                          disablePadding: true,
                          label: 'Name'
                        },
                        {
                          id: '1',
                          numeric: false,
                          disablePadding: true,
                          label: 'Email'
                        }
                      ]}
                      tableData={users.map(item =>
                        Object.keys(item)
                          .map(function(_) {
                            return item[_];
                          })
                          .splice(1, 2)
                      )}
                    />
                  </Paper>
                );
              }}
            </Query>
          }
        />
      </ItemGrid>
    );
  }
}

Users.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Users));
