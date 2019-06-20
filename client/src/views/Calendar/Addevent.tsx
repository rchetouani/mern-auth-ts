import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Button } from '../../components';
import Modal from 'react-awesome-modal';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Mutation, Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Grid } from '@material-ui/core';
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      calendar {
        id
        title
        start
        end
      }
    }
  }
`;
const ADD_FORMATION = gql`
  mutation addCalendar($id: String!, $calendar: [CalendarInput]) {
    addCalendar(id: $id, calendar: $calendar) {
      calendar {
        id
        title
        start
        end
      }
    }
  }
`;
class Addevent extends React.Component<any, any> {
  static propTypes: { auth: PropTypes.Validator<object> };
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
    let title, start, end;

    return (
      <Grid item xs={12} container>
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_FORMATION}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/Calendar`)}
              >
                {(addFormation, { loading, error }) => (
                  <>
                    <Button
                      color="primary"
                      round
                      onClick={() => this.openModal()}
                    >
                      Add
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
                                    calendar: {
                                      title: title.value,
                                      start: start.value,
                                      end: end.value
                                    }
                                  },
                                  refetchQueries: [{ query: GET_USERS }]
                                });
                                title.value = '';
                                start.value = '';
                                end.value = '';
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
                                    title = node;
                                  }}
                                  placeholder="name"
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="start"> start:</label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="start"
                                  ref={node => {
                                    start = node;
                                  }}
                                  placeholder="start"
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="end">end:</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="end"
                                  ref={node => {
                                    end = node;
                                  }}
                                  placeholder="end"
                                />
                              </div>
                              <Button
                                color="primary"
                                round
                                type="submit"
                                onClick={() => this.closeModal()}
                              >
                                Add
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
Addevent.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Addevent);
