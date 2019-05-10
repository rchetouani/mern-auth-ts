import {
  Grid,
  withStyles,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { Table } from '@material-ui/core';
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
import { ItemGrid, RegularCard, StatsCard } from '../../components';
import * as React from 'react';
// react plugin for creating charts
import { Query } from 'react-apollo';

import { gql } from 'apollo-boost';

const GET_USERS = gql`
  {
    allUsers {
      id
      name
      username
      email
    }
  }
`;
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
          <ItemGrid>
            <RegularCard
              headerColor="orange"
              cardTitle="User List "
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Username</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.allUsers.map(
                              (
                                n: {
                                  id: React.ReactNode;
                                  name: React.ReactNode;
                                  email: React.ReactNode;
                                  username: React.ReactNode;
                                },
                                index: number
                              ) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                      {n.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {n.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {n.email}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {n.username}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                    );
                  }}
                </Query>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
