import avatar from 'assets/img/faces/marc.jpg';
import { Button, ItemGrid, ProfileCard } from '../../components';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { gql } from 'apollo-boost';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
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

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}
class Profile extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    return (
      <ItemGrid xs={12} sm={12} md={4}>
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <ProfileCard
                  avatar={avatar}
                  subtitle={this.props.auth.user.role}
                  title={data.User.name}
                  // tslint:disable-next-line:max-line-length
                  description={data.User.email}
                  footer={
                    <Button color="primary" round>
                      Recommend
                    </Button>
                  }
                />
              </>
            );
          }}
        </Query>
      </ItemGrid>
    );
  }
}
Profile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
