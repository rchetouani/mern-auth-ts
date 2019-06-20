import { Paper } from '@material-ui/core';
import React from 'react';
import { Table } from '../../components';

class listobjectif extends React.Component<any, any> {
  render() {
    return (
      <Paper>
        <Table
          tableHeaderColor="warning"
          tableData={this.props.array.map(item =>
            Object.keys(item).map(function(_) {
              return item[_];
            })
          )}
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
              label: 'Site'
            },
            {
              id: '2',
              numeric: false,
              disablePadding: true,
              label: 'Type'
            },
            {
              id: '3',
              numeric: false,
              disablePadding: true,
              label: 'Formateur'
            }
          ]}
        />
      </Paper>
    );
  }
}
export default listobjectif;
