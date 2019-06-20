import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Calendar from './Calendar';
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
class Data extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
  }
  render() {
    var dat2;

    return (
      <div>
        <Query
          query={GET_USERS}
          variables={{ Id: this.props.auth.user.id }}
          pollInterval={300}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            var dat = data.User.calendar;
            dat2 = dat.map(i => {
              const ii = { ...i };
              ii.start = new Date(
                moment.unix(i.start / 1000).format('YYYY-MM-DD HH:mm:ss')
              );
              ii.end = new Date(
                moment.unix(i.end / 1000).format('YYYY-MM-DD HH:mm:ss')
              );

              return ii;
            });
            return <Calendar data={dat2} history={this.props.history} />;
          }}
        </Query>
        ;
      </div>
    );
  }
}
Data.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Data);
