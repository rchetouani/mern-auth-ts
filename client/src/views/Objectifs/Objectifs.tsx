import { Grid, Paper } from '@material-ui/core';
import { ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Updateobjectif from './updateobjectif';
import Deleteobjectif from './deleteobjectif';
import Listobjectif from './listobjectifs';
import Addobjectif from './addproject';
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      objectifs {
        id
        name
        status
        EndDate
        Progress
      }
    }
  }
`;

class Objectifs extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Objectifs"
              content={
                <div>
                  <Addobjectif history={this.props.history} />
                  <Grid>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                      pollInterval={300}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        var fo = data.User.objectifs;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          const id = item[0];
                          const nom = item[1];
                          const progress = item[4];
                          const statu = item[2];

                          item.push(
                            <Updateobjectif
                              data={data}
                              id={id}
                              nom={nom}
                              progress={progress}
                              statu={statu}
                              history={this.props.history}
                            />,
                            <Deleteobjectif
                              data={data}
                              id={id}
                              history={this.props.history}
                            />
                          );
                        });

                        array.map(i => {
                          i.splice(0, 1);
                        });
                        array.map(i => {
                          i.splice(2, 1);
                        });
                        array.map(i => {
                          i.splice(3, 1);
                        });
                        return (
                          <Listobjectif
                            array={array}
                            history={this.props.history}
                          />
                        );
                      }}
                    </Query>
                  </Grid>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Objectifs.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Objectifs);
