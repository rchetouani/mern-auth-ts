import { Grid } from '@material-ui/core';
import { Button, ItemGrid, RegularCard, Table } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      formations {
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
    addUser(
      id: $id

      formations: $formations
    ) {
      formations {
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
    let name, Type, Site, Rank, startDate, Formateur, EndDate;
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
                            mutation={ADD_FORMATION}
                            key={data.User.id}
                            onCompleted={() => this.props.history.push(`/`)}
                          >
                            {(updateUser, { loading, error }) => (
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
                                            updateUser({
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
                                              }
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
                                              defaultValue={data.User.name}
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
                                              defaultValue={data.User.Type}
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
                                              defaultValue={data.User.Site}
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
                                              defaultValue={data.User.Rank}
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
                                              defaultValue={data.User.startDate}
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
                                              defaultValue={data.User.Formateur}
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
                                              defaultValue={data.User.EndDate}
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
                                </Modal>
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
            <RegularCard
              headerColor="orange"
              cardTitle="Employees Stats"
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Query
                  query={GET_USERS}
                  variables={{ Id: this.props.auth.user.id }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    console.log(data.User.formations);
                    return (
                      <Table
                        tableHeaderColor="warning"
                        tableHead={['ID', 'Name', 'Salary', 'Country']}
                        tableData={[
                          ['1', 'Dakota Rice', '$36,738', 'Niger'],
                          ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                          ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                          ['4', 'Philip Chaney', '$38,735', 'Korea, South']
                        ]}
                      />
                    );
                  }}
                </Query>
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
