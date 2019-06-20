import { Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Editformation from './editformation';
import Deleteformation from './deleteformation';
import Tableformation from './Tableformation';
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      formations {
        id
        name
        Type
        Site
        Rank
        Formateur
        startDate
        EndDate
      }
    }
  }
`;

interface TabContainerProps {
  children?: React.ReactNode;
}
function TabContainer(props: TabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class ListFormation extends Component<any, any> {
  props: any;
  static propTypes: { auth: PropTypes.Validator<object> };

  render() {
    return (
      <TabContainer>
        {' '}
        <Grid>
          <Query
            query={GET_USERS}
            variables={{ Id: this.props.auth.user.id }}
            pollInterval={300}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              var fo = data.User.formations;

              var array = fo.map(item =>
                Object.keys(item).map(function(_) {
                  return item[_];
                })
              );
              array.map(item => {
                const id = item[0];
                const nom = item[1];
                const rank = item[2];
                const type = item[3];
                const site = item[4];
                const formateur = item[5];
                const startdate = item[6];
                const enddate = item[7];

                item.push(
                  <Editformation
                    data={data}
                    id={id}
                    nom={nom}
                    rank={rank}
                    type={type}
                    site={site}
                    formateur={formateur}
                    startdate={startdate}
                    enddate={enddate}
                    history={this.props.history}
                  />,
                  <Deleteformation
                    data={data}
                    id={id}
                    history={this.props.history}
                  />
                );
              });

              array.map(i => {
                i.splice(0, 1);
              });
              array.map(i => {
                i.splice(5, 3);
              });
              return <Tableformation array={array} />;
            }}
          </Query>
        </Grid>
      </TabContainer>
    );
  }
}

ListFormation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ListFormation);
