import Popup from 'reactjs-popup';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { IconButton, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../../components';
const Update_OBJECTIF = gql`
  mutation updateObjectif($id: String!, $objectifs: [ObjectifInput]) {
    updateObjectif(id: $id, objectifs: $objectifs) {
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

class updateobjectif extends React.Component<any, any> {
  static propTypes: { auth: any };
  render() {
    let name, status, Progress, EndDate;

    return (
      <Mutation
        mutation={Update_OBJECTIF}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/objectifs')}
      >
        {(updateobjectif, { loading, error }) => (
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
                            updateobjectif({
                              variables: {
                                id: this.props.data.User.id,
                                objectifs: {
                                  id: this.props.id,
                                  name: name.value,
                                  status: status.value,
                                  Progress: Progress.value,
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
                            <label htmlFor="status">status:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="status"
                              ref={node => {
                                status = node;
                              }}
                              placeholder="status"
                              defaultValue={this.props.statu.toString()}
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
                              defaultValue={this.props.progress.toString()}
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
updateobjectif.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(updateobjectif);
