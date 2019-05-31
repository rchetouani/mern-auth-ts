import React, { Component } from 'react';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Modal from 'react-awesome-modal';
import { Button } from '../../components';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { any } from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      calendar {
        id
        title
        allDay
        start
        end
      }
    }
  }
`;
const ADD_FORMATION = gql`
  mutation addCalendar($id: String!, $calendar: [CertificationInput]) {
    addCalendar(id: $id, calendar: $calendar) {
      calendar {
        id
        title
        allDay
        start
        end
      }
    }
  }
`;
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: new Date(),
          end: new Date(),
          title: 'Some title',
          id: 1,
          allDay: false
        },
        {
          start: new Date('Wed Jan 30 2019 10:06:44 GMT+0200'),
          end: new Date('Thu Jan 31 2019 10:06:44 GMT+0200'),
          title: 'Some another title',
          id: 2,
          allDay: false
        }
      ]
    };
    this.onEventDrop = this.onEventDrop.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.newEvent = this.newEvent.bind(this);
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
  onEventResize({ event, start, end }) {
    const { events } = this.state;
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents
    });
  }

  onEventDrop({ event, start, end }) {
    const { events } = this.state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    this.setState({
      events: nextEvents
    });
  }
  newEvent(event) {
    let idList = this.state.events.map(a => a.id);
    let newId = Math.max(...idList) + 1;
    var txt;
    var person = prompt('Please enter Name of event:');
    if (person == null || person == '') {
      txt = 'User cancelled the prompt.';
    } else {
      txt = person;
      let hour = {
        id: newId,
        title: txt,
        allDay: event.slots.length == 1,
        start: event.start,
        end: event.end
      };
      this.setState({
        events: this.state.events.concat([hour])
      });
    }
  }
  render() {
    const { events } = this.state;
    return (
      <div>
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
          onEventResize={this.onEventResize}
          onEventDrop={this.onEventDrop}
          resizable
          selectable
          onSelectSlot={this.newEvent}
        />
      </div>
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
