import { Button } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

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

const ADD_FORMATION = gql`
  mutation addFormation($id: String!, $formations: [FormationInput]) {
    addFormation(id: $id, formations: $formations) {
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

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}
class ProposeFormation extends Component<Props & any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };

  render() {
    let name, Type, Site, Rank, startDate, Formateur, EndDate;
    return (
      <TabContainer>
        {' '}
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_FORMATION}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/formation`)}
              >
                {addFormation => (
                  <>
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              addFormation({
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
                                refetchQueries: [{ query: GET_USERS }]
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
                              <label htmlFor="Formateur">Formateur:</label>
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
                            <Button color="primary" round type="submit">
                              Add Formation
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </TabContainer>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProposeFormation);
