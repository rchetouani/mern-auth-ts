import { IconButton, withStyles } from '@material-ui/core';

import * as React from 'react';
import { Mutation } from 'react-apollo';

import { gql } from 'apollo-boost';
import { Button } from '../../components';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import RssFeed from '@material-ui/icons/RssFeed';
import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';
import { connect } from 'react-redux';

const ADD_FORMATIONFollowed = gql`
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
type Positions = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

class MutationAdd extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    const y = this.props.y;

    return (
      <Mutation mutation={ADD_FORMATIONFollowed} key={y.id}>
        {(addFormationfollowed, { loading, error }) => (
          <>
            <Popup
              open={false}
              trigger={
                <IconButton color="secondary" aria-label="Delete">
                  <RssFeed>follow</RssFeed>
                </IconButton>
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
                            Are you sure you want to follow this formation ??
                          </h4>
                        </div>

                        <Button color="primary" round type="submit">
                          {'Follow '}
                        </Button>
                        <Button color="primary" round onClick={() => close()}>
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
  }
  private showNotification(place: Positions) {
    // @ts-ignore
    this.setState({ [place]: true });

    // @ts-ignore
    setTimeout(() => this.setState({ [place]: false }), 6000);
  }
}

MutationAdd.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  withStyles(dashboardStyle)(MutationAdd)
);
