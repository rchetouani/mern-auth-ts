import { Grid } from '@material-ui/core';
import { Button, Snackbar } from '../../components';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
const UPDATE_USERS = gql`
  mutation updateUser(
    $id: String!
    $name: String!
    $username: String!
    $status: String!
    $agency: String!
    $gender: String!
    $birthday: Date!
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
type Positions = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}
class EditCard extends React.Component<Props & any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  refetch: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      tc: false
    };
    this.showNotification = this.showNotification.bind(this);
  }

  render() {
    let name, username, status, agency, gender, birthday, email;

    return (
      <Grid container>
        <Query
          query={GET_USERS}
          variables={{ Id: this.props.auth.user.id }}
          fetchPolicy="no-cache"
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            this.refetch = refetch;
            console.log(data.User.birthday);
            return (
              <Mutation
                mutation={UPDATE_USERS}
                key={data.User.id}
                awaitRefetchQueries={true}
                refetchQueries={() => {
                  return [
                    {
                      query: GET_USERS,
                      variables: { Id: this.props.auth.user.id }
                    }
                  ];
                }}
              >
                {(updateUser, { loading, error }) => (
                  <>
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <form
                            action=""
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
                              }).then(() => {
                                this.refetch();
                                this.showNotification('tc');
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
                                required
                                defaultValue={data.User.name}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="username">username:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="username"
                                ref={node => {
                                  username = node;
                                }}
                                placeholder="username"
                                defaultValue={data.User.username}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="status">status:</label>
                              <input
                                className="form-control"
                                name="status"
                                ref={node => {
                                  status = node;
                                }}
                                placeholder="status"
                                defaultValue={data.User.status}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="agency">agency:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="agency"
                                ref={node => {
                                  agency = node;
                                }}
                                placeholder="agency"
                                defaultValue={data.User.agency}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="gender">gender:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="gender"
                                ref={node => {
                                  gender = node;
                                }}
                                placeholder="gender"
                                defaultValue={data.User.gender}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="birthday">birthday:</label>
                              <input
                                type="date"
                                name="birthday"
                                pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])/(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])/(?:30))|(?:(?:0[13578]|1[02])-31))"
                                defaultValue={data.User.birthday}
                                ref={node => {
                                  birthday = node;
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">email:</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                ref={node => {
                                  email = node;
                                }}
                                placeholder="email"
                                defaultValue={data.User.email}
                                required
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
        <Snackbar
          place="tc"
          color="success"
          icon={CheckCircleIcon}
          message="you have updated your profile"
          open={this.state.tc}
          closeNotification={() => {
            this.setState({
              tc: false
            });
          }}
          close
        />
      </Grid>
    );
  }
  private showNotification(place: Positions) {
    // @ts-ignore
    this.setState({ [place]: true });

    // @ts-ignore
    setTimeout(() => this.setState({ [place]: false }), 6000);
  }
}

EditCard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(EditCard);
