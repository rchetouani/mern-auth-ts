import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { IconButton, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_OBJECTIF = gql`
  mutation deleteObjectif($id: String!, $objectifs: [ObjectifInput]) {
    deleteObjectif(id: $id, objectifs: $objectifs) {
      id
      name
    }
  }
`;

class deleteobjectif extends React.Component<any, any> {
  static propTypes: { auth: any };
  render() {
    return (
      <Mutation
        mutation={DELETE_OBJECTIF}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/objectifs')}
      >
        {(deleteFormation, { loading, error }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteFormation({
                  variables: {
                    id: this.props.data.User.id,
                    objectifs: {
                      id: this.props.id.toString()
                    }
                  }
                });
              }}
            >
              &nbsp;
              <IconButton color="secondary" aria-label="Delete" type="submit">
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
deleteobjectif.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(deleteobjectif);
