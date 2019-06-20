import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_FORMATION = gql`
  mutation deleteProject($id: String!, $projects: [ProjectInput]) {
    deleteProject(id: $id, projects: $projects) {
      id
      name
    }
  }
`;
class removeproject extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    const id = this.props.item[0];

    return (
      <Mutation
        mutation={DELETE_FORMATION}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/projects')}
      >
        {(deleteProject, { loading, error }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteProject({
                  variables: {
                    id: this.props.data.User.id,
                    projects: {
                      id: id.toString()
                    }
                  }
                });
              }}
            >
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
removeproject.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(removeproject);
