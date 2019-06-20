import { Grid } from '@material-ui/core';
import { ItemGrid, RegularCard, Table } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Editcertification from './editcertification';
import Deletecertification from './deletecertification';
import Listcertification from './listcertification';
import Addcertification from './addcertification';
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      certifications {
        id
        code
        name
        EndDate
        startDate
        organisme
      }
    }
  }
`;

class Certification extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
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

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Certification"
              content={
                <div>
                  <Addcertification history={this.props.history} />
                  <Grid>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                      pollInterval={300}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        var fo = data.User.certifications;
                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          const id = item[0];
                          const nom = item[2];
                          const cod = item[1];
                          const organism = item[5];
                          item.push(
                            <Editcertification
                              data={data}
                              id={id}
                              nom={nom}
                              cod={cod}
                              organism={organism}
                              history={this.props.history}
                            />,
                            <Deletecertification
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
                          i.splice(2, 2);
                        });
                        array.map(i => {
                          i.splice(3, 1);
                        });
                        return <Listcertification array={array} />;
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

Certification.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Certification);
