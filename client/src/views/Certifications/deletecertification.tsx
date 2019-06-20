import { IconButton, Icon } from '@material-ui/core';
import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_FORMATION = gql`
  mutation deleteCertification(
    $id: String!
    $certifications: [CertificationInput]
  ) {
    deleteCertification(id: $id, certifications: $certifications) {
      id
      name
    }
  }
`;

class deletecertification extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_FORMATION}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/certifications')}
      >
        {(deleteFormation, { loading, error }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteFormation({
                  variables: {
                    id: this.props.data.User.id,
                    certifications: {
                      id: this.props.id.toString()
                    }
                  }
                });
              }}
            >
              &nbsp;
              <IconButton color="secondary" type="submit" aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </div>
        )}
      </Mutation>
    );
  }
}
deletecertification.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(deletecertification);
