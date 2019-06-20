import { withStyles, Paper } from '@material-ui/core';
import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';

import { ItemGrid, RegularCard } from '../../components';
import * as React from 'react';
import { Query } from 'react-apollo';

import { gql } from 'apollo-boost';
import { Table } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Mutation from './MutationAdd';

const GET_USERS = gql`
  {
    allUsers {
      id
      name
      username
      email
      formations {
        id
        name
        Type
        Site
        Formateur
      }
      formationsfollowed {
        id
        name
        Type
        Site
        Formateur
      }
    }
  }
`;

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}

class Formation extends React.Component<Props & any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };

  render() {
    return (
      <ItemGrid xs={12} sm={6} md={6}>
        <RegularCard
          headerColor="purple"
          cardSubtitle=" List of Formation to follow"
          cardTitle="Formation List "
          content={
            <Query query={GET_USERS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                var fo = data.allUsers;
                var forma = fo.map(item => item.formations);
                var er = [];

                forma.map(x =>
                  x.map(y => {
                    const btn = <Mutation y={y} />;
                    const v = { ...y, mutation: btn };
                    er.push(v);
                  })
                );
                er.map(i => {
                  delete i.id;
                  delete i.__typename;
                });
                return (
                  <>
                    <Paper>
                      <Table
                        tableHeaderColor="warning"
                        tableData={er}
                        headRows={[
                          {
                            id: 'name',
                            numeric: false,
                            disablePadding: true,
                            label: 'Name'
                          },
                          {
                            id: 'Site',
                            numeric: false,
                            disablePadding: true,
                            label: 'Site'
                          },
                          {
                            id: 'Type',
                            numeric: false,
                            disablePadding: true,
                            label: 'Type'
                          },
                          {
                            id: 'Formateur',
                            numeric: false,
                            disablePadding: true,
                            label: 'Formateur'
                          }
                        ]}
                      />
                    </Paper>
                  </>
                );
              }}
            </Query>
          }
        />
      </ItemGrid>
    );
  }
}

Formation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Formation));
