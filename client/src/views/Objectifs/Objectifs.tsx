import { Grid, Paper } from '@material-ui/core';
import { Button, ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import { Table } from '../../components';
import Popup from 'reactjs-popup';

const DELETE_OBJECTIF = gql`
  mutation deleteObjectifs($id: String!, $objectifs: [ObjectifsInput]) {
    deleteObjectifs(id: $id, objectifs: $objectifs) {
      id
      name
    }
  }
`;
const Update_OBJECTIF = gql`
  mutation updateObjectifs($id: String!, $objectifs: [ObjectifsInput]) {
    updateObjectifs(id: $id, objectifs: $objectifs) {
      objectifs {
        id
        name
        status
        EndDate
        Progress
      }
    }
  }
`;
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      objectifs {
        id
        name
        status
        EndDate
        Progress
      }
    }
  }
`;

const ADD_OBJECTIF = gql`
  mutation addObjectifs($id: String!, $objectifs: [ObjectifsInput]) {
    addObjectifs(id: $id, objectifs: $objectifs) {
      objectifs {
        id
        name
        status
        EndDate
        Progress
      }
    }
  }
`;

class Objectifs extends Component<any, any> {
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
    let name, status, Progress, EndDate;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Objectifs"
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
                        return (
                          <Mutation
                            mutation={ADD_OBJECTIF}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/objectifs`)
                            }
                          >
                            {(addObjectifs, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Objectifs
                                </Button>
                                <Modal
                                  visible={this.state.visible}
                                  width="400"
                                  height="400"
                                  effect="fadeInUp"
                                  onClickAway={() => this.closeModal()}
                                >
                                  <div className="container">
                                    <div className="panel panel-default">
                                      <div className="panel-body">
                                        <form
                                          onSubmit={e => {
                                            e.preventDefault();
                                            addObjectifs({
                                              variables: {
                                                id: data.User.id,
                                                objectifs: {
                                                  name: name.value,
                                                  status: status.value,
                                                  Progress: Progress.value,

                                                  EndDate: EndDate.value
                                                }
                                              },
                                              refetchQueries: [
                                                { query: GET_USERS }
                                              ]
                                            });
                                            name.value = '';
                                            status.value = '';
                                            Progress.value = '';

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
                                            <label htmlFor="status">
                                              status:
                                            </label>
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
                                            <label htmlFor="Progress">
                                              Progress:
                                            </label>
                                            <input
                                              className="form-control"
                                              name="Progress"
                                              ref={node => {
                                                Progress = node;
                                              }}
                                              placeholder="Progress"
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
                                            Add Objectifs
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
                        var fo = data.User.objectifs;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          const id = item[0];
                          const nom = item[1];
                          const progress = item[4];
                          const statu = item[2];

                          item.push(
                            <Mutation
                              mutation={Update_OBJECTIF}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/objectifs')
                              }
                            >
                              {(updateFormation, { loading, error }) => (
                                <>
                                  <Popup
                                    open={false}
                                    trigger={
                                      <Button color="primary" round>
                                        Edit{' '}
                                      </Button>
                                    }
                                    position="top left"
                                    modal
                                    closeOnDocumentClick
                                  >
                                    {close => (
                                      <div>
                                        <div className="container">
                                          <div className="panel panel-default">
                                            <div className="panel-body">
                                              <form
                                                onSubmit={e => {
                                                  e.preventDefault();
                                                  updateFormation({
                                                    variables: {
                                                      id: data.User.id,
                                                      objectifs: {
                                                        id: id,
                                                        name: name.value,
                                                        status: status.value,
                                                        Progress:
                                                          Progress.value,
                                                        EndDate: EndDate.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  name.value = '';
                                                  status.value = '';
                                                  Progress.value = '';
                                                  EndDate.value = '';
                                                  close();
                                                }}
                                              >
                                                <br />
                                                <div className="form-group">
                                                  <label htmlFor="name">
                                                    name:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    ref={node => {
                                                      name = node;
                                                    }}
                                                    placeholder="name"
                                                    defaultValue={nom.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="status">
                                                    status:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="status"
                                                    ref={node => {
                                                      status = node;
                                                    }}
                                                    placeholder="status"
                                                    defaultValue={statu.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Progress">
                                                    Progress:
                                                  </label>
                                                  <input
                                                    className="form-control"
                                                    name="Progress"
                                                    ref={node => {
                                                      Progress = node;
                                                    }}
                                                    placeholder="Progress"
                                                    defaultValue={progress.toString()}
                                                  />
                                                </div>

                                                <div className="form-group">
                                                  <label htmlFor="EndDate">
                                                    EndDate:
                                                  </label>
                                                  <input
                                                    type="text"
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
                                                >
                                                  Edit{' '}
                                                </Button>
                                                <Button
                                                  color="primary"
                                                  round
                                                  onClick={() => {
                                                    close();
                                                  }}
                                                >
                                                  Close{' '}
                                                </Button>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Popup>
                                </>
                              )}
                            </Mutation>,
                            <Mutation
                              mutation={DELETE_OBJECTIF}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/objectifs')
                              }
                            >
                              {(deleteFormation, { loading, error }) => (
                                <div>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                      deleteFormation({
                                        variables: {
                                          id: data.User.id,
                                          objectifsobjectifs: {
                                            id: id.toString()
                                          }
                                        }
                                      });
                                    }}
                                  >
                                    &nbsp;
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </form>
                                  {loading && <p>Loading...</p>}
                                  {error && <p>Error :( Please try again</p>}
                                </div>
                              )}
                            </Mutation>
                          );
                        });

                        array.map(i => {
                          i.splice(0, 1);
                        });
                        array.map(i => {
                          i.splice(2, 1);
                        });
                        array.map(i => {
                          i.splice(3, 1);
                        });
                        console.log(array);
                        return (
                          <Paper>
                            <Table
                              tableHeaderColor="warning"
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

Objectifs.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Objectifs);
