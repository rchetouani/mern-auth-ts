import { Grid, withStyles } from '@material-ui/core';
import {
  Accessibility,
  ContentCopy,
  DateRange,
  InfoOutline,
  LocalOffer,
  Store,
  Update,
  Warning
} from '@material-ui/icons';
import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';
import { ItemGrid, StatsCard } from '../../components';
import * as React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Formation from './Formation';
import Users from './Users';

class Dashboard extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };

  render() {
    if (this.props.auth.user.role === 'manager') {
      return (
        <div>
          <Grid container>
            <ItemGrid xs={12} sm={6} md={3}>
              <StatsCard
                icon={ContentCopy}
                iconColor="orange"
                title="Used Space"
                description="49/50"
                small="GB"
                statIcon={Warning}
                statIconColor="danger"
                statLink={{ text: 'Get More Space...', href: '#pablo' }}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={3}>
              <StatsCard
                icon={Store}
                iconColor="green"
                title="Revenue"
                description="$34,245"
                statIcon={DateRange}
                statText="Last 24 Hours"
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={3}>
              <StatsCard
                icon={InfoOutline}
                iconColor="red"
                title="Fixed Issues"
                description="75"
                statIcon={LocalOffer}
                statText="Tracked from Github"
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={3}>
              <StatsCard
                icon={Accessibility}
                iconColor="blue"
                title="Followers"
                description="+245"
                statIcon={Update}
                statText="Just Updated"
              />
            </ItemGrid>
          </Grid>

          <Grid container>
            <Formation />
            <Users />
          </Grid>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard));
