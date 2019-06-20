import { IconButton } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import { Mutation } from 'react-apollo';
import Popup from 'reactjs-popup';
import Divinput from '../../components/divinput';
import Icon from '@material-ui/core/Icon';
import { gql } from 'apollo-boost';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_FORMATION = gql`
  mutation deleteFormation($id: String!, $formations: [FormationInput]) {
    deleteFormation(id: $id, formations: $formations) {
      id
      name
    }
  }
`;

class deleteformation extends React.Component<any, any> {
  render() {
    return (
      <Mutation
        mutation={DELETE_FORMATION}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/Formation')}
      >
        {(deleteFormation, { loading, error }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteFormation({
                  variables: {
                    id: this.props.data.User.id,
                    formations: {
                      id: this.props.id.toString()
                    }
                  }
                });
              }}
            >
              <IconButton color="secondary" aria-label="Delete">
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
export default deleteformation;
