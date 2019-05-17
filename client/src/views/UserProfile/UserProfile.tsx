import { Grid } from '@material-ui/core';
import avatar from 'assets/img/faces/marc.jpg';
import { Button, ItemGrid, ProfileCard, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import { gql } from 'apollo-boost';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      name
      email
      password
    }
  }
`;
const UPDATE_USERS = gql`
  mutation updateUser(
    $id: String!
    $name: String!
    $username: String!
    $status: String!
    $agency: String!
    $gender: String!
    $birthday: String!
    $email: String!
  ) {
    updateUser(
      id: $id
      name: $name
      username: $username
      status: $status
      agency: $agency
      gender: $gender
      birthday: $birthday
      email: $email
    ) {
      id
      name
      username
      status
      agency
      gender
      birthday
      email
    }
  }
`;
class UserProfile extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    let name, username, status, agency, gender, birthday, email;
    console.log(this.props.auth.user);
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Edit Profile"
              cardSubtitle="Complete your profile"
              content={
                <div>
                  <Grid container>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        console.log(data.User.id);
                        return (
                          <Mutation
                            mutation={UPDATE_USERS}
                            key={data.User.id}
                            onCompleted={() => this.props.history.push(`/`)}
                          >
                            {(updateUser, { loading, error }) => (
                              <>
                                <div className="container">
                                  <div className="panel panel-default">
                                    <div className="panel-body">
                                      <form
                                        onSubmit={e => {
                                          e.preventDefault();
                                          updateUser({
                                            variables: {
                                              id: data.User.id,
                                              name: name.value,
                                              username: username.value,
                                              status: status.value,
                                              agency: agency.value,
                                              gender: gender.value,
                                              birthday: birthday.value,
                                              email: email.value
                                            }
                                          });
                                          name.value = '';
                                          username.value = '';
                                          status.value = '';
                                          agency.value = '';
                                          gender.value = '';
                                          birthday.value = '';
                                          email.value = '';
                                        }}
                                      >
                                        <div className="form-group">
                                          <label htmlFor="name">name:</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            ref={node => {
                                              name = node;
                                            }}
                                            placeholder="name"
                                            defaultValue={data.User.name}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="username">
                                            username:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            ref={node => {
                                              username = node;
                                            }}
                                            placeholder="username"
                                            defaultValue={data.User.username}
                                          />
                                        </div>

                                        <div className="form-group">
                                          <label htmlFor="status">
                                            status:
                                          </label>
                                          <input
                                            className="form-control"
                                            name="status"
                                            ref={node => {
                                              status = node;
                                            }}
                                            placeholder="status"
                                            defaultValue={data.User.status}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="agency">
                                            agency:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="agency"
                                            ref={node => {
                                              agency = node;
                                            }}
                                            placeholder="agency"
                                            defaultValue={data.User.agency}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="gender">
                                            gender:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="gender"
                                            ref={node => {
                                              gender = node;
                                            }}
                                            placeholder="gender"
                                            defaultValue={data.User.gender}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="birthday">
                                            birthday:
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control"
                                            name="birthday"
                                            ref={node => {
                                              birthday = node;
                                            }}
                                            placeholder="birthday"
                                            defaultValue={data.User.birthday}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="email">email:</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            ref={node => {
                                              email = node;
                                            }}
                                            placeholder="email"
                                            defaultValue={data.User.email}
                                          />
                                        </div>

                                        <Button color="primary" type="submit">
                                          Update Profile
                                        </Button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                              </>
                            )}
                          </Mutation>
                        );
                      }}
                    </Query>
                  </Grid>
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <Query
              query={GET_USERS}
              variables={{ Id: this.props.auth.user.id }}
            >
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                console.log(data.User.name);
                return (
                  <ProfileCard
                    avatar={avatar}
                    subtitle="CEO / CO-FOUNDER"
                    title={data.User.name}
                    // tslint:disable-next-line:max-line-length
                    description={data.User.email}
                    footer={
                      <Button color="primary" round>
                        Follow
                      </Button>
                    }
                  />
                );
              }}
            </Query>
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserProfile);
