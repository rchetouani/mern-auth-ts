import { Paper } from '@material-ui/core';
import { Table } from '../../components';
import React from 'react';

class listcertification extends React.Component<any, any> {
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
              label: 'Code'
            },
            {
              id: '1',
              numeric: false,
              disablePadding: true,
              label: 'Name'
            },
            {
              id: '2',
              numeric: false,
              disablePadding: true,
              label: 'Organisme'
            }
          ]}
        />
      </Paper>
    );
  }
}
export default listcertification;
