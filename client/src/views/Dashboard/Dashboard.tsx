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
  mutation addFormationfollowed(
    $id: String!
    $formationsfollowed: [FormationInput]
  ) {
    addFormationfollowed(id: $id, formationsfollowed: $formationsfollowed) {
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
      formationsfollowed {
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
          <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="User List "
              cardSubtitle="List of Users on Skill Center"
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    var users = data.allUsers;

                    return (
                      <Paper>
                        <Table
                          tableHeaderColor="warning"
                          headRows={[
                            {
                              id: '0',
                              numeric: false,
                              disablePadding: true,
                              label: 'Name'
                            },
                            {
                              id: '1',
                              numeric: false,
                              disablePadding: true,
                              label: 'username'
                            },
                            {
                              id: '2',
                              numeric: false,
                              disablePadding: true,
                              label: 'Email'
                            }
                          ]}
                          tableData={users.map(item =>
                            Object.keys(item)
                              .map(function(_) {
                                return item[_];
                              })
                              .splice(1, 3)
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
              cardSubtitle=" List of Formation to follow"
              cardTitle="Formation List "
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    var fo = data.allUsers;
                    var forma = fo.map(item => item.formations);
                    var er = [];

                    forma.map(x =>
                      x.map(y => {
                        const btn = (
                          <Mutation mutation={ADD_FORMATION} key={y.id}>
                            {(addFormationfollowed, { loading, error }) => (
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
                                              addFormationfollowed({
                                                variables: {
                                                  id: this.props.auth.user.id,
                                                  formationsfollowed: {
                                                    id: y.id,
                                                    name: y.name,
                                                    Type: y.Type,
                                                    Site: y.Site,
                                                    Formateur: y.Formateur
                                                  }
                                                }
                                              }).then(() => {
                                                close();
                                                this.showNotification('tc');
                                              });
                                            }}
                                          >
                                            <br />
                                            <div className="form-group">
                                              <h4>
                                                Are you sure you want to follow
                                                this formation ??
                                              </h4>
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
                    er.map(i => {
                      delete i.id;
                      delete i.__typename;
                    });
                    console.log(er);
                    return (
                      <>
                        <Paper>
                          <Table
                            tableHeaderColor="warning"
                            tableData={er}
                            headRows={[
                              {
                                id: 'name',
                                numeric: false,
                                disablePadding: true,
                                label: 'Name'
                              },
                              {
                                id: 'Site',
                                numeric: false,
                                disablePadding: true,
                                label: 'Site'
                              },
                              {
                                id: 'Type',
                                numeric: false,
                                disablePadding: true,
                                label: 'Type'
                              },
                              {
                                id: 'Formateur',
                                numeric: false,
                                disablePadding: true,
                                label: 'Formateur'
                              }
                            ]}
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
