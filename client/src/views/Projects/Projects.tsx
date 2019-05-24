import { Grid, Paper } from '@material-ui/core';
import { Button, ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import { Table } from '../../components';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      projects {
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
        id: String
        name: String
        description: String
        technology: String
        society: String
        size: String
        Site: String
        startDate: String
        EndDate: String
        status: String
        Progress: String
      }
    }
  }
`;

class Formation extends Component<any, any> {
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
    let name, description, Site, technology, startDate, society, EndDate;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Formation"
              content={
                <div>
                  <Grid item xs={12} container>
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
                            mutation={ADD_PROJECT}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/Formation`)
                            }
                          >
                            {(addProject, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Formation
                                </Button>
                                <Modal
                                  visible={this.state.visible}
                                  width="400"
                                  height="620"
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
                                                formations: {
                                                  name: name.value,
                                                  description:
                                                    description.value,
                                                  Site: Site.value,
                                                  technology: technology.value,
                                                  startDate: startDate.value,
                                                  society: society.value,
                                                  EndDate: EndDate.value
                                                }
                                              },
                                              refetchQueries: [
                                                { query: GET_USERS }
                                              ]
                                            }).then(
                                              console.log(data.User.projects)
                                            );
                                            name.value = '';
                                            description.value = '';
                                            Site.value = '';
                                            technology.value = '';
                                            startDate.value = '';
                                            society.value = '';
                                            EndDate.value = '';
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
                                            <label htmlFor="technology">
                                              technology:
                                            </label>
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
                                            <label htmlFor="startDate">
                                              startDate:
                                            </label>
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
                                            <label htmlFor="society">
                                              society:
                                            </label>
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
                                            <label htmlFor="EndDate">
                                              EndDate:
                                            </label>
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
                                            Add Formation
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
                  <Grid>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                      pollInterval={300}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        var fo = data.User.projects;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );

                        return (
                          <Paper>
                            <Table
                              tableHeaderColor="warning"
                              tableHead={[
                                'Name',
                                'description',
                                'Site',
                                'technology',
                                'society',
                                'actions'
                              ]}
                              tableData={array}
                            />
                          </Paper>
                        );
                      }}
                    </Query>
                  </Grid>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Formation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Formation);
