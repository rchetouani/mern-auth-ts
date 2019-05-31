import { Grid, Paper } from '@material-ui/core';
import { Button, ItemGrid, RegularCard, Table } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import Popup from 'reactjs-popup';

const DELETE_FORMATION = gql`
  mutation deleteCertification(
    $id: String!
    $certifications: [CertificationInput]
  ) {
    deleteCertification(id: $id, certifications: $certifications) {
      id
      name
    }
  }
`;
const Update_FORMATION = gql`
  mutation updateCertification(
    $id: String!
    $certifications: [CertificationInput]
  ) {
    updateCertification(id: $id, certifications: $certifications) {
      certifications {
        id
        code
        name
        organisme
        EndDate
        startDate
      }
    }
  }
`;
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      certifications {
        id
        code
        name
        EndDate
        startDate
        organisme
      }
    }
  }
`;

const ADD_FORMATION = gql`
  mutation addCertification(
    $id: String!
    $certifications: [CertificationInput]
  ) {
    addCertification(id: $id, certifications: $certifications) {
      certifications {
        id
        code
        name
        EndDate
        startDate
        organisme
      }
    }
  }
`;

class Certification extends Component<any, any> {
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
    let name, code, organisme, Rank, startDate, Formateur, EndDate;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Certification"
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
                            mutation={ADD_FORMATION}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/certifications`)
                            }
                          >
                            {(addFormation, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Certification
                                </Button>
                                <Modal
                                  visible={this.state.visible}
                                  width="400"
                                  height="450"
                                  effect="fadeInUp"
                                  onClickAway={() => this.closeModal()}
                                >
                                  <div className="container">
                                    <div className="panel panel-default">
                                      <div className="panel-body">
                                        <form
                                          onSubmit={e => {
                                            e.preventDefault();
                                            addFormation({
                                              variables: {
                                                id: data.User.id,
                                                certifications: {
                                                  name: name.value,
                                                  code: code.value,
                                                  organisme: organisme.value,
                                                  startDate: startDate.value,
                                                  EndDate: EndDate.value
                                                }
                                              },
                                              refetchQueries: [
                                                { query: GET_USERS }
                                              ]
                                            });
                                            name.value = '';
                                            code.value = '';
                                            organisme.value = '';
                                            startDate.value = '';
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
                                            <label htmlFor="code"> code:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="code"
                                              ref={node => {
                                                code = node;
                                              }}
                                              placeholder="code"
                                            />
                                          </div>

                                          <div className="form-group">
                                            <label htmlFor="organisme">
                                              {' '}
                                              organisme:
                                            </label>
                                            <input
                                              className="form-control"
                                              name="organisme"
                                              ref={node => {
                                                organisme = node;
                                              }}
                                              placeholder="organisme"
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
                                            Add certification
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
                        var fo = data.User.certifications;
                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          const id = item[0];
                          const nom = item[2];
                          const cod = item[1];
                          const organism = item[5];
                          item.push(
                            <Mutation
                              mutation={Update_FORMATION}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/certifications')
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
                                                      certifications: {
                                                        id: id,
                                                        name: name.value,
                                                        code: code.value,
                                                        organisme:
                                                          organisme.value,
                                                        startDate:
                                                          startDate.value,
                                                        EndDate: EndDate.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  name.value = '';
                                                  code.value = '';
                                                  organisme.value = '';

                                                  startDate.value = '';

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
                                                  <label htmlFor=" code">
                                                    code:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name=" code"
                                                    ref={node => {
                                                      code = node;
                                                    }}
                                                    placeholder=" code"
                                                    defaultValue={cod.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor=" organisme">
                                                    organisme:
                                                  </label>
                                                  <input
                                                    className="form-control"
                                                    name=" organisme"
                                                    ref={node => {
                                                      organisme = node;
                                                    }}
                                                    placeholder=" organisme"
                                                    defaultValue={organism.toString()}
                                                  />
                                                </div>

                                                <div className="form-group">
                                                  <label htmlFor="startDate">
                                                    startDate:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="startDate"
                                                    ref={node => {
                                                      startDate = node;
                                                    }}
                                                    placeholder="startDate"
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
                              mutation={DELETE_FORMATION}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/certifications')
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
                                          certifications: {
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
                          i.splice(2, 2);
                        });
                        array.map(i => {
                          i.splice(3, 1);
                        });
                        return (
                          <Paper>
                            <Table
                              tableHeaderColor="warning"
                              tableData={array.map(item =>
                                Object.keys(item).map(function(_) {
                                  return item[_];
                                })
                              )}
                              headRows={[
                                {
                                  id: '0',
                                  numeric: false,
                                  disablePadding: true,
                                  label: 'Code'
                                },
                                {
                                  id: '1',
                                  numeric: false,
                                  disablePadding: true,
                                  label: 'Name'
                                },
                                {
                                  id: '2',
                                  numeric: false,
                                  disablePadding: true,
                                  label: 'Organisme'
                                }
                              ]}
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

Certification.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Certification);
