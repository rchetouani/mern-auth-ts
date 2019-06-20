import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Addevent from './Addevent';
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

const Update_Calendar = gql`
  mutation updateCalendar($id: String!, $calendar: [CalendarInput]) {
    updateCalendar(id: $id, calendar: $calendar) {
      calendar {
        id
        title
        start
        end
      }
    }
  }
`;
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);
class Calendar extends Component<any, any> {
  static propTypes: { auth: PropTypes.Validator<object> };

  constructor(props) {
    super(props);
    this.props.data.push();
    this.state = {
      events: this.props.data
    };
    this.onEventDrop = this.onEventDrop.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
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

  onEventResize({ event, start, end }, updateCalendar, id) {
    const { events } = this.state;
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    nextEvents.forEach(element => {
      console.log(element.start);
      updateCalendar({
        variables: {
          id: id,
          calendar: {
            title: element.title,
            id: element.id,
            start: new Date(element.start),
            end: new Date(element.end)
          }
        }
      });
    });

    this.setState({
      events: nextEvents
    });
  }

  onEventDrop({ event, start, end }, updateCalendar, id) {
    const { events } = this.state;
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    nextEvents.forEach(element => {
      updateCalendar({
        variables: {
          id: id,
          calendar: {
            title: element.title,
            id: element.id,
            start: new Date(element.start),
            end: new Date(element.end)
          }
        }
      });
    });
    this.setState({
      events: nextEvents
    });
  }

  render() {
    const { events } = this.state;
    return (
      <>
        <Grid>
          <div>
            <Addevent history={this.props.history} />
            <Query
              query={GET_USERS}
              variables={{ Id: this.props.auth.user.id }}
            >
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                  <Mutation
                    mutation={Update_Calendar}
                    key={data.User.id}
                    onCompleted={() => this.props.history.push(`/Calendar`)}
                  >
                    {updateCalendar => (
                      <>
                        <DragAndDropCalendar
                          style={{ height: '100vh' }}
                          localizer={localizer}
                          culture="en-GB"
                          events={events}
                          defaultDate={new Date()}
                          defaultView="month"
                          startAccessor="start"
                          endAccessor="end"
                          titleAccessor="title"
                          onEventResize={({ event, start, end }) => {
                            this.onEventResize(
                              { event, start, end },
                              updateCalendar,
                              data.User.id
                            );
                          }}
                          onEventDrop={({ event, start, end }) => {
                            this.onEventDrop(
                              { event, start, end },
                              updateCalendar,
                              data.User.id
                            );
                          }}
                          resizable
                          selectable
                        />
                      </>
                    )}
                  </Mutation>
                );
              }}
            </Query>
          </div>
        </Grid>
      </>
    );
  }
}

Calendar.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Calendar);
