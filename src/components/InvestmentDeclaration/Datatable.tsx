import { CircularProgress, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import IsSubmit from './IsSubmit';
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
            Amount: row.Amount || 0,
        })));
    }, [data]);


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleTextFieldChange = (e, rowIndex) => {
        const newValue = parseFloat(e.target.value) || 0;
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
                            {columns.map((column) => (
                                <StyledTableCell {...column.headerCellProps} key={column.id}>
                                    {column.renderHeader ? column.renderHeader() : column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell>Amount</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : tableData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            (isPagination ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableData).map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, i) => (<>{(GroupAmount == 0) ?

                                        < TableCell  {...column.cellProps} key={column.id}>
                                            {column.renderCell ? column.renderCell(row) : row[column.id]}
                                        </TableCell >
                                        : <>{(i != 2) &&
                                            < TableCell  {...column.cellProps} key={column.id}>
                                                {column.renderCell ? column.renderCell(row) : row[column.id]}
                                            </TableCell >}</>
                                    }
                                    </>
                                    ))}
                                    {GroupAmount != 0 &&
                                        < TableCell>
                                            {GroupAmount}
                                        </TableCell >
                                    }



                                    <TableCell sx={{paddingTop: '2.5px', paddingBottom: '2.5px'}}>
                                        <TextField
                                             size='small'
                                            value={row.Amount}
                                            onChange={(e) => handleTextFieldChange(e, rowIndex)}
                                            disabled={Data == 'True'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        <TableRow sx={{paddingTop: '2.5px', paddingBottom: '2.5px'
}}>
                            <TableCell colSpan={columns.length} align="right">
                                <Typography variant="h6" sx={{backgroundColor:"#223354", ml:80, p:0.5, color:'white', width:'auto'}}>Total Amount </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" sx={{backgroundColor:"#223354",p:0.5,  mr:10, color:'white'}}>{totalAmount}</Typography>
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
