import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import Tableformation from './Tableformation';

const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
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

class FormationFollowed extends Component<any, any> {
  props: any;
  static propTypes: { auth: PropTypes.Validator<object> };

  render() {
    return (
      <TabContainer>
        <Query
          query={GET_USERS}
          variables={{ Id: this.props.auth.user.id }}
          pollInterval={300}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            var fo = data.User.formationsfollowed;

            var array = fo.map(item =>
              Object.keys(item).map(function(_) {
                return item[_];
              })
            );
            array.map(i => {
              i.splice(0, 1);
            });
            array.map(i => {
              i.splice(5, 3);
            });
            return <Tableformation array={array} />;
          }}
        </Query>
      </TabContainer>
    );
  }
}
FormationFollowed.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FormationFollowed);
