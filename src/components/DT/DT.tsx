import { CircularProgress, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TablePagination, TableRow, styled } from '@mui/material';
import React, { useState } from 'react';
export type Column = {
    id: string;
    label: string;
    renderHeader?: () => React.ReactNode;
    cellProps?: TableCellProps;
    headerCellProps?: TableCellProps;
    renderCell?: (rowData: any, rowIndex?: number) => React.ReactNode;
};
export type RowData = {
    [key: string]: any;
};
type Props = {
    columns: Column[];
    data: RowData[];
    changeText: ([]) => void,
    isLoading?: boolean;
    isPagination?: boolean;
    GroupAmount: Number

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
const DT: React.FC<Props> = ({ columns, data, changeText, GroupAmount = 0, isLoading = false, isPagination = true }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Paper>
            <TableContainer>
                <Table >
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">No.</StyledTableCell>
                            {columns.map((column) => (
                                <StyledTableCell {...column.headerCellProps} key={column.id}>
                                    {column.renderHeader ? column.renderHeader() : column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell >Amount</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            (isPagination ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row, rowIndex) =>
                            (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, i) => (
                                        < TableCell  {...column.cellProps} key={column.id}>
                                            {column.renderCell ? column.renderCell(row, rowIndex) : row[column.id]}
                                        </TableCell >
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {isPagination && (
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    )
}

export default DT