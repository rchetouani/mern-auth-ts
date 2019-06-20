import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  TableSortLabel
} from '@material-ui/core';
import tableStyle from '../../assets/jss/material-dashboard-react/tableStyle';
import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';

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
  tableData?: string[];
  headRows?: HeadRow[];
}
function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (
  a: { [key in K]: number | string },
  b: { [key in K]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

interface HeadRow {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headRows?: HeadRow[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, headRows } = props;
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const CustomTable: React.SFC<Props> = props => {
  const { classes, tableData, headRows } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('0');

  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: string
  ) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  var keys = [];
  tableData.map(i => (keys = Object.keys(i)));

  function renameKeys(arrayObject, newKeys, index = false) {
    let newArray = [];
    arrayObject.forEach((obj, item) => {
      const keyValues = Object.keys(obj).map((key, i) => {
        return { [newKeys[i] || key]: obj[key] };
      });
      let id = index ? { ID: item } : {};
      newArray.push(Object.assign(id, ...keyValues));
    });
    return newArray;
  }
  const renamedObj = renameKeys(tableData, keys);
  return (
    <>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={renamedObj.length}
            headRows={headRows}
          />

          <TableBody>
            {stableSort(renamedObj, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowProp, rowKey) => {
                return (
                  <TableRow key={rowKey}>
                    {Object.keys(rowProp).map(v => {
                      return (
                        <TableCell className={classes.tableCell} key={v}>
                          {rowProp[v]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
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
      </div>
    </>
  );
};

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

export default withStyles(tableStyle)(CustomTable);
