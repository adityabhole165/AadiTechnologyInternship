import { CircularProgress, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import IsSubmit from './IsSubmit';
export type Column = {
    id: string;
    label: string;
    // renderCell?: (rowData: any) => React.ReactNode;
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


const DataTable: React.FC<Props> = ({ columns, data, changeText, GroupAmount = 0, isLoading = false, isPagination = true }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const totalAmount = filteredData.reduce((acc, item) => acc + (item.Amount || 0), 0);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const [tableData, setTableData] = useState(data);

    useEffect(() => {
        setTableData(data.map(row => ({
            ...row,
            Amount: row.Amount || "",
        })));
    }, [data]);


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleTextFieldChange = (e, rowIndex) => {
        let newValue = e.target.value;
        if (newValue.length > 7) {
            newValue = newValue.slice(0, 7);
        }
        newValue = parseFloat(newValue) || "";

        const updatedData = tableData.map((row, index) => (
            index === rowIndex ? { ...row, Amount: newValue } : row
        ));
        setTableData(updatedData);
        changeText(updatedData);
    };

    const totalAmount = tableData.reduce((acc, item) => acc + (item.Amount || 0), 0);
    let Data = useContext(IsSubmit)


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
                        ) : tableData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            (isPagination ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableData).map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    <TableCell align="center">{page * rowsPerPage + rowIndex + 1}</TableCell>
                                    {columns.map((column, i) => (<>{(GroupAmount == 0) ?
                                        < TableCell  {...column.cellProps} key={column.id} >
                                            {column.renderCell ? column.renderCell(row, rowIndex) : row[column.id]}
                                        </TableCell >
                                        : <>{(i != 2) &&
                                            < TableCell  {...column.cellProps} key={column.id}>
                                                {column.renderCell ? column.renderCell(row, rowIndex) : row[column.id]}
                                            </TableCell >}</>
                                    }
                                    </>
                                    ))}

                                    {GroupAmount != 0 && rowIndex % 12 === 0 && (
                                        < TableCell rowSpan={tableData.filter(r => r.GroupAmount === row.GroupAmount).length} align='center' sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                                            {GroupAmount}
                                        </TableCell >
                                    )}

                                    {/* {GroupAmount !== 0 && isGroupAmountDifferent && (
                                            <TableCell rowSpan={tableData.filter(r => r.GroupAmount === row.GroupAmount).length}>
                                                {GroupAmount}
                                            </TableCell>
                                        )} */}

                                    <TableCell sx={{ paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                        <TextField
                                            size='small'
                                            value={row.Amount}
                                            onChange={(e) => handleTextFieldChange(e, rowIndex)}
                                            disabled={Data == 'True'}
                                            sx={{
                                                backgroundColor: Data === 'True' ? '#F4F6F6   ' : 'white',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        <TableRow sx={{
                            paddingTop: '2.5px', paddingBottom: '2.5px'
                        }}>
                            <TableCell colSpan={columns.length + 1} sx={{ textAlign: 'right' }}>
                                <Typography variant="h6" sx={{ backgroundColor: "#324b84", ml: 120, p: 0.5, color: 'white', textAlign: 'center' }}>Total Amount </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" sx={{ backgroundColor: "#324b84", p: 0.5, mr: 10, color: 'white' }}>{totalAmount}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {isPagination && (
                <TablePagination
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};

export default DataTable;
