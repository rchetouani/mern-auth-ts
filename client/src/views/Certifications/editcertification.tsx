import { IconButton, Icon } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class editcertification extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    let name, code, organisme, Rank, startDate, Formateur, EndDate;
    return (
      <Mutation
        mutation={Update_FORMATION}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/certifications')}
      >
        {(updateFormation, { loading, error }) => (
          <>
            <Popup
              open={false}
              trigger={
                <IconButton color="secondary" aria-label="Delete">
                  <Icon>edit_icon</Icon>
                </IconButton>
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
                                id: this.props.data.User.id,
                                certifications: {
                                  id: this.props.id,
                                  name: name.value,
                                  code: code.value,
                                  organisme: organisme.value,
                                  startDate: startDate.value,
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
                            <label htmlFor="name">name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              ref={node => {
                                name = node;
                              }}
                              placeholder="name"
                              defaultValue={this.props.nom.toString()}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor=" code">code:</label>
                            <input
                              type="text"
                              className="form-control"
                              name=" code"
                              ref={node => {
                                code = node;
                              }}
                              placeholder=" code"
                              defaultValue={this.props.cod.toString()}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor=" organisme">organisme:</label>
                            <input
                              className="form-control"
                              name=" organisme"
                              ref={node => {
                                organisme = node;
                              }}
                              placeholder=" organisme"
                              defaultValue={this.props.organism.toString()}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="startDate">startDate:</label>
                            <input
                              type="Date"
                              className="form-control"
                              name="startDate"
                              ref={node => {
                                startDate = node;
                              }}
                              placeholder="startDate"
                              defaultValue={this.props.startDate}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="EndDate">EndDate:</label>
                            <input
                              type="Date"
                              className="form-control"
                              name="EndDate"
                              ref={node => {
                                EndDate = node;
                              }}
                              placeholder="EndDate"
                              defaultValue={this.props.EndDate}
                            />
                          </div>
                          <Button color="primary" round type="submit">
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
      </Mutation>
    );
  }
}
editcertification.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(editcertification);
