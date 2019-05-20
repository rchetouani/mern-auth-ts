import {
  Grid,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { Button, ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import Popup from 'reactjs-popup';

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
const ADD_FORMATION = gql`
  mutation addUser($id: String!, $formations: [FormationInput]) {
    addUser(id: $id, formations: $formations) {
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
const DELETE_FORMATION = gql`
  mutation deleteUser($id: String!, $formations: [FormationInput]) {
    deleteUser(id: $id, formations: $formations) {
      id
      name
    }
  }
`;
const Update_FORMATION = gql`
  mutation updateFormation($id: String!, $formations: [FormationInput]) {
    updateFormation(id: $id, formations: $formations) {
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
class Formation extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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
    let name, Type, Site, Rank, startDate, Formateur, EndDate;
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Formation"
              content={
                <div>
                  <Grid item xs={12}  container>
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
                              this.props.history.push(`/Formation`)
                            }
                          >
                            {(addUser, { loading, error }) => (
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
                                            addUser({
                                              variables: {
                                                id: data.User.id,
                                                formations: {
                                                  name: name.value,
                                                  Type: Type.value,
                                                  Site: Site.value,
                                                  Rank: Rank.value,
                                                  startDate: startDate.value,
                                                  Formateur: Formateur.value,
                                                  EndDate: EndDate.value
                                                }
                                              },
                                              refetchQueries: [
                                                { query: GET_USERS }
                                              ]
                                            });
                                            name.value = '';
                                            Type.value = '';
                                            Site.value = '';
                                            Rank.value = '';
                                            startDate.value = '';
                                            Formateur.value = '';
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
                                            <label htmlFor="Type">Type:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Type"
                                              ref={node => {
                                                Type = node;
                                              }}
                                              placeholder="Type"
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
                                            <label htmlFor="Rank">Rank:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Rank"
                                              ref={node => {
                                                Rank = node;
                                              }}
                                              placeholder="Rank"
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
                                            <label htmlFor="Formateur">
                                              Formateur:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Formateur"
                                              ref={node => {
                                                Formateur = node;
                                              }}
                                              placeholder="Formateur"
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
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                      pollInterval={300}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        return (
                          <Paper>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>ID</TableCell>

                                  <TableCell>Name</TableCell>
                                  <TableCell>Type</TableCell>
                                  <TableCell>Site</TableCell>
                                  <TableCell>Rank</TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.User.formations.map(
                                  (
                                    n: {
                                      id: React.ReactNode;
                                      name: React.ReactNode;
                                      Type: React.ReactNode;
                                      Site: React.ReactNode;
                                      Rank: React.ReactNode;
                                      startDate: React.ReactNode;
                                      EndDate: React.ReactNode;
                                      Formateur: React.ReactNode;
                                    },
                                    index: number
                                  ) => {
                                    console.log(n.id);
                                    const id = n.id;
                                  const type = n.Type;
                                    const rank = n.Rank;
                                    const site = n.Site;
                                    const nom = n.name;
                                    return (
                                      <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                          {n.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {n.Type}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {n.Site}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {n.Rank}
                                        </TableCell>
                                        <TableCell>
                                          <Mutation
                                            mutation={DELETE_FORMATION}
                                            key={data.User.id}
                                            onCompleted={() =>
                                              this.props.history.push(
                                                '/Formation'
                                              )
                                            }
                                          >
                                            {(
                                              deleteUser,
                                              { loading, error }
                                            ) => (
                                              <div>
                                                <form
                                                  onSubmit={e => {
                                                    e.preventDefault();
                                                    deleteUser({
                                                      variables: {
                                                        id: data.User.id,
                                                        formations: {
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
                                                {error && (
                                                  <p>
                                                    Error :( Please try again
                                                  </p>
                                                )}
                                              </div>
                                            )}
                                          </Mutation>
                                        </TableCell>
                                        <TableCell>
                                          <Mutation
                                            mutation={Update_FORMATION}
                                            key={data.User.id}
                                            onCompleted={() =>
                                              this.props.history.push(
                                                '/Formation'
                                              )
                                            }
                                          >
                                            {(
                                              updateFormation,
                                              { loading, error }
                                            ) => (
                                              <>
                                          <Popup trigger={ <Button
                                  color="primary"
                                  round
                                >
Edit                                 </Button>} modal>
    {close => (
      <div >
                <div className="container">
                                                    <div className="panel panel-default">
                                                      <div className="panel-body">
                                                        <form
                                                          onSubmit={e => {
                                                            e.preventDefault();
                                                            updateFormation({
                                                              variables: {
                                                                id:
                                                                  data.User.id,
                                                                formations: {
                                                                  id: id.toString(),
                                                                  name:
                                                                    name.value,
                                                                  Type:
                                                                    Type.value,
                                                                  Site:
                                                                    Site.value,
                                                                  Rank:
                                                                    Rank.value,
                                                                  startDate:
                                                                    startDate.value,
                                                                  Formateur:
                                                                    Formateur.value,
                                                                  EndDate:
                                                                    EndDate.value
                                                                }
                                                              },
                                                              refetchQueries: [
                                                                {
                                                                  query: GET_USERS
                                                                }
                                                              ]
                                                            });
                                                            name.value = '';
                                                            Type.value = '';
                                                            Site.value = '';
                                                            Rank.value = '';
                                                            startDate.value =
                                                              '';
                                                            Formateur.value =
                                                              '';
                                                            EndDate.value = '';
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
                                                            <label htmlFor="Type">
                                                              Type:
                                                            </label>
                                                            <input
                                                              type="text"
                                                              className="form-control"
                                                              name="Type"
                                                              ref={node => {
                                                                Type = node;
                                                              }}
                                                              placeholder="Type"
                                                              defaultValue={type.toString()}
                                                            />
                                                          </div>
                                                          <div className="form-group">
                                                            <label htmlFor="Site">
                                                              Site:
                                                            </label>
                                                            <input
                                                              className="form-control"
                                                              name="Site"
                                                              ref={node => {
                                                                Site = node;
                                                              }}
                                                              placeholder="Site"
                                                              defaultValue={site.toString()}
                                                            />
                                                          </div>
                                                          <div className="form-group">
                                                            <label htmlFor="Rank">
                                                              Rank:
                                                            </label>
                                                            <input
                                                              type="text"
                                                              className="form-control"
                                                              name="Rank"
                                                              ref={node => {
                                                                Rank = node;
                                                              }}
                                                              placeholder="Rank"
                                                              defaultValue={rank.toString()}
                                                            />
                                                          </div>
                                                          <div className="form-group">
                                                            <label htmlFor="Formateur">
                                                              Formateur:
                                                            </label>
                                                            <input
                                                              type="text"
                                                              className="form-control"
                                                              name="Formateur"
                                                              ref={node => {
                                                                Formateur = node;
                                                              }}
                                                              placeholder="Formateur"
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
                                          </Mutation>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
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
