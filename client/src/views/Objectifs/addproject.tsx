import { Grid } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';

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
  mutation addObjectif($id: String!, $objectifs: [ObjectifInput]) {
    addObjectif(id: $id, objectifs: $objectifs) {
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
class addobjectif extends React.Component<any, any> {
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
      <Grid item xs={12} container>
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_OBJECTIF}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/objectifs`)}
              >
                {(addObjectif, { loading, error }) => (
                  <>
                    <Button
                      color="primary"
                      round
                      onClick={() => this.openModal()}
                    >
                      Add Objectif
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
                                addObjectif({
                                  variables: {
                                    id: data.User.id,
                                    objectifs: {
                                      name: name.value,
                                      status: status.value,
                                      Progress: Progress.value,

                                      EndDate: EndDate.value
                                    }
                                  },
                                  refetchQueries: [{ query: GET_USERS }]
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
                                  className="form-control"
                                  name="Progress"
                                  ref={node => {
                                    Progress = node;
                                  }}
                                  placeholder="Progress"
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
    );
  }
}
addobjectif.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(addobjectif);
