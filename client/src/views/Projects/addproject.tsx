import { Grid } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import { connect } from 'react-redux';

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      projects {
        id
        name
        description
        technology
        society
        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;
const ADD_PROJECT = gql`
  mutation addProject($id: String!, $projects: [ProjectInput]) {
    addProject(id: $id, projects: $projects) {
      projects {
        id
        name
        description
        technology
        society
        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;
class addproject extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    let name,
      description,
      Site,
      technology,
      startDate,
      society,
      EndDate,
      size,
      status,
      Progress;

    return (
      <Grid item xs={12} container>
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_PROJECT}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/projects`)}
              >
                {(addProject, { loading, error }) => (
                  <>
                    <Button
                      color="primary"
                      round
                      onClick={() => this.openModal()}
                    >
                      Add Project
                    </Button>
                    <Modal
                      visible={this.state.visible}
                      width="400"
                      height="87%"
                      effect="fadeInUp"
                      onClickAway={() => this.closeModal()}
                    >
                      <div className="container">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                addProject({
                                  variables: {
                                    id: data.User.id,
                                    projects: {
                                      name: name.value,
                                      description: description.value,
                                      Site: Site.value,
                                      size: size.value,
                                      status: status.value,
                                      technology: technology.value,
                                      startDate: startDate.value,
                                      society: society.value,
                                      EndDate: EndDate.value,
                                      Progress: Progress.value
                                    }
                                  }
                                });
                                name.value = '';
                                description.value = '';
                                Site.value = '';
                                technology.value = '';
                                startDate.value = '';
                                society.value = '';
                                EndDate.value = '';
                                status.value = '';
                                size.value = '';
                                Progress.value = '';
                              }}
                            >
                              <br />
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
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">
                                  description:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="description"
                                  ref={node => {
                                    description = node;
                                  }}
                                  placeholder="description"
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="Site">Site:</label>
                                <input
                                  className="form-control"
                                  name="Site"
                                  ref={node => {
                                    Site = node;
                                  }}
                                  placeholder="Site"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="technology">technology:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="technology"
                                  ref={node => {
                                    technology = node;
                                  }}
                                  placeholder="technology"
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="society">society:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="society"
                                  ref={node => {
                                    society = node;
                                  }}
                                  placeholder="society"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="size">size:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="size"
                                  ref={node => {
                                    size = node;
                                  }}
                                  placeholder="size"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="status">status:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="status"
                                  ref={node => {
                                    status = node;
                                  }}
                                  placeholder="status"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="Progress">Progress:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Progress"
                                  ref={node => {
                                    Progress = node;
                                  }}
                                  placeholder="Progress"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="startDate">startDate:</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="startDate"
                                  ref={node => {
                                    startDate = node;
                                  }}
                                  placeholder="startDate"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="EndDate">EndDate:</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="EndDate"
                                  ref={node => {
                                    EndDate = node;
                                  }}
                                  placeholder="EndDate"
                                />
                              </div>

                              <Button
                                color="primary"
                                round
                                type="submit"
                                onClick={() => this.closeModal()}
                              >
                                Add Project
                              </Button>
                              <Button
                                color="primary"
                                round
                                onClick={() => this.closeModal()}
                              >
                                Close{' '}
                              </Button>
                            </form>
                          </div>
                        </div>
                      </div>

                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </Modal>
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Grid>
    );
  }
}
addproject.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(addproject);
