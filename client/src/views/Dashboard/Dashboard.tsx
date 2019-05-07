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
import {
  ItemGrid,
  RegularCard,
  StatsCard,
  Table,
  TasksCard
} from '../../components';
import * as React from 'react';
// react plugin for creating charts

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}

class Dashboard extends React.Component<Props, any> {
  render() {
    //  const { classes } = this.props;

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
          <ItemGrid xs={12} sm={12} md={4} />
          <ItemGrid xs={12} sm={12} md={4} />
          <ItemGrid xs={12} sm={12} md={4} />
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <TasksCard />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="Employees Stats"
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={['ID', 'Name', 'Salary', 'Country']}
                  tableData={[
                    ['1', 'Dakota Rice', '$36,738', 'Niger'],
                    ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                    ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                    ['4', 'Philip Chaney', '$38,735', 'Korea, South']
                  ]}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
