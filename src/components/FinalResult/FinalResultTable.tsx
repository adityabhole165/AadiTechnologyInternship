import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import React from 'react';

export type Column = {
  id: string;
  label: string;
  renderCell?: (rowData: any) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  cellProps?: TableCellProps;
  headerCellProps?: TableCellProps;
};

export type RowData = {
  [key: string]: any;
};

type Props = {
  columns: Column[];
  data: RowData[];
  isLoading?: boolean;
  isPagination?: boolean;
  clickHeader: (value: string) => void;
  sortby: string;
  sortAsc: string;
};

export const StyledTableRow = styled(TableRow)(
  ({ theme }) => `
  background-color: ${theme.palette.secondary.main};
 `
);

export const StyledTableCell = styled(TableCell)(
  ({ theme }) => `
  color: white;
  font-weight: bold;
 `
);

const FinalResultTable: React.FC<Props> = ({ columns, data, isLoading = false, clickHeader, sortby, sortAsc }) => {


  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  {...column.headerCellProps}
                  key={column.id}
                  onClick={() => {
                    if (index < columns.length - 3) {
                      clickHeader(column.label);
                    }
                  }}
                  style={{ cursor: index < columns.length - 3 ? 'pointer' : 'default' }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {column.renderHeader ? column.renderHeader() : column.label}
                    {column.label === sortby && (
                      sortAsc === 'Desc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />
                    )}</Box>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell {...column.cellProps} key={column.id} sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                      {column.renderCell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* {isPagination && (
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )} */}
    </Paper>
  );
};

export default FinalResultTable;
