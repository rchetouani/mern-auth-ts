import { Grid, withStyles, Paper } from '@material-ui/core';
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
import { Query, Mutation } from 'react-apollo';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { gql } from 'apollo-boost';
import { Table, Snackbar, Button } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
const ADD_FORMATION = gql`
  mutation addFormation($id: String!, $formationsfollowed: [FormationInput]) {
    addFormation(id: $id, formationsfollowed: $formationsfollowed) {
      formationsfollowed {
        id
        name
        Type
        Site
        Rank
        Formateur
        startDate
        EndDate
      }
    }
  }
`;
const GET_USERS = gql`
  {
    allUsers {
      id
      name
      username
      email
      formations {
        id
        name
        Type
        Site
        Formateur
      }
    }
  }
`;

type Positions = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}

class Dashboard extends React.Component<Props & any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props: Props) {
    super(props);

    this.state = {
      tc: false
    };
    this.showNotification = this.showNotification.bind(this);
  }

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
          <ItemGrid sm={6} md={3}>
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
          <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="User List "
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    var fo = data.allUsers;
                    return (
                      <Paper>
                        <Table
                          tableHeaderColor="warning"
                          tableHead={['ID', 'Name', 'Username', 'Email']}
                          tableData={fo.map(item =>
                            Object.keys(item)
                              .map(function(_) {
                                return item[_];
                              })
                              .slice(0, 4)
                          )}
                        />
                      </Paper>
                    );
                  }}
                </Query>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              headerColor="purple"
              cardSubtitle="New employees on 15th September, 2016"
              cardTitle="Formation List "
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    var fo = data.allUsers;
                    var forma = fo.map(item => item.formations);
                    const er = [];
                    forma.map(x =>
                      x.map(y => {
                        const btn = (
                          <Mutation mutation={ADD_FORMATION} key={y.id}>
                            {(addFormation, { loading, error }) => (
                              <>
                                <Popup
                                  open={false}
                                  trigger={
                                    <Button color="primary" round>
                                      {'Follow '}
                                    </Button>
                                  }
                                  position="top left"
                                  modal
                                  closeOnDocumentClick
                                >
                                  {close => (
                                    <div className="container">
                                      <div className="panel panel-default">
                                        <div className="panel-body">
                                          <form
                                            onSubmit={e => {
                                              e.preventDefault();
                                              addFormation({
                                                variables: {
                                                  id: this.props.auth.user.id,
                                                  formationsfollowed: {
                                                    id: y.id,
                                                    name: y.name,
                                                    Type: y.Type,
                                                    Site: y.Site,
                                                    Formateur: y.Formateur
                                                  }
                                                },
                                                refetchQueries: [
                                                  { query: GET_USERS }
                                                ]
                                              }).then(() => {
                                                close();
                                                this.showNotification('tc');
                                              });
                                            }}
                                          >
                                            <br />
                                            <div className="form-group">
                                              <h3>
                                                Are you sure you want to follow
                                                this formation ??
                                              </h3>
                                            </div>

                                            <Button
                                              color="primary"
                                              round
                                              type="submit"
                                            >
                                              {'Follow '}
                                            </Button>
                                            <Button
                                              color="primary"
                                              round
                                              onClick={() => close()}
                                            >
                                              {' Close'}
                                            </Button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Popup>

                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                              </>
                            )}
                          </Mutation>
                        );
                        const v = { ...y, mutation: btn };
                        er.push(v);
                      })
                    );
                    return (
                      <>
                        <Paper>
                          <Table
                            tableHeaderColor="warning"
                            tableHead={['Name', 'Type', 'Site', 'Rank']}
                            tableData={er.map(item =>
                              Object.keys(item).map(function(_) {
                                return item[_];
                              })
                            )}
                          />
                        </Paper>
                        <Grid container justify="center">
                          <Snackbar
                            place="tc"
                            color="success"
                            icon={CheckCircleIcon}
                            message="You have joined this formation"
                            open={this.state.tc}
                            closeNotification={() => {
                              this.setState({
                                tc: false
                              });
                            }}
                            close
                          />
                        </Grid>
                        ;
                      </>
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

  private showNotification(place: Positions) {
    /*
     * https://github.com/Microsoft/TypeScript/issues/13948#issuecomment-394527009
     *
     * Seems to be some issue here when using [dynamic] properties in setState
     * Issue is milestone'd for TS 3.0 release
     */

    // @ts-ignore
    this.setState({ [place]: true });

    // @ts-ignore
    setTimeout(() => this.setState({ [place]: false }), 6000);
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard));
