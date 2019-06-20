import { Grid } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';

const GET_USER = gql`
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

const ADD_Certification = gql`
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

class addCertification extends React.Component<any, any> {
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
      <Grid item xs={12} container>
        <Query query={GET_USER} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_Certification}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/certifications`)}
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
                                  refetchQueries: [{ query: GET_USER }]
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
                                <label htmlFor="organisme"> organisme:</label>
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
    );
  }
}
addCertification.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(addCertification);
