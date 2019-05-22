import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import tableStyle from '../../assets/jss/material-dashboard-react/tableStyle';
import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

interface Props {
  classes: {
    table: string;
    tableResponsive: string;
    tableCell: string;
    tableHeadCell: string;
  };

  tableHeaderColor?:
    | 'warning'
    | 'primary'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';
  tableHead?: string[];
  tableData?: string[][];
}

const CustomTable: React.SFC<Props> = props => {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    console.log(event.target.value);
    setRowsPerPage(event.target.value);
  }
  const tableRows =
    tableData &&
    tableData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((rowProp, rowKey) => {
        const rowCells = rowProp.map((cellProp, cellKey) => (
          <TableCell className={classes.tableCell} key={cellKey}>
            {cellProp}
          </TableCell>
        ));

        return <TableRow key={rowKey}>{rowCells}</TableRow>;
      });
  console.log(tableData.length);
  return (
    <>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead && (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow>
                {tableHead.map((prop, key) => (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}

          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

export default withStyles(tableStyle)(CustomTable);
