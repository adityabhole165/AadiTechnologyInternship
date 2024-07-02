import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, TablePagination, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Equal, GetScreenPermission, isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';

function LeaveList({
    ItemList,
    clickView,
    HeaderArray,
    clickDelete,
}) {
    console.log(ItemList, "ItemList----------");

    const HolidayFullAccess = GetScreenPermission('Holidays');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedItems = ItemList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    console.log(formattedDate);  // Output: 29-May-2024

    return (
        <div >
            {ItemList.length === 0 ? (
                <Box sx={{ backgroundColor: '#D2FDFC' }}>

                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No Record Found.
                    </Typography>
                </Box>
            ) : (

                <>
                    {ItemList.length >= 5 && (
                        <Typography variant="subtitle1"
                            sx={{ margin: '16px 0', textAlign: 'center' }}>
                            <Box component="span" fontWeight="fontWeightBold">{page * rowsPerPage + 1}</Box> to <Box component="span" fontWeight="fontWeightBold">{Math.min(page * rowsPerPage + rowsPerPage, ItemList.length)}</Box> Out of <Box component="span" fontWeight="fontWeightBold">{ItemList.length}</Box> records
                        </Typography>
                    )}


                    <TableContainer component={Box}>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead>
                                <TableRow
                                    sx={{ background: (theme) => theme.palette.secondary.main, }}
                                >
                                    {HeaderArray.map((item, i) => (
                                        (item.Header !== 'Delete') || (HolidayFullAccess !== 'N') ? (
                                            <TableCell
                                                key={i}
                                                sx={{
                                                    // textTransform: 'capitalize',
                                                    color: (theme) => theme.palette.common.white,
                                                    textAlign: i === 2 || i === 3 ? 'left' : 'center'
                                                }}
                                                align="center"
                                            >
                                                <b>{item.Header}</b>
                                            </TableCell>
                                        ) : <TableCell key={i} style={{ width: 0, height: 0, padding: 0, border: 0 }} />
                                    ))}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => {
                                    // const formattedItemDate = formatDate(new Date(item.Text2));
                                    // const isCurrentDate = formattedItemDate === formattedDate;
                                    // const isFuture = isFutureDateTime(new Date(item.Text2));
                                    // const isPast = isPastDateTime(new Date(item.Text2));
                                    // const isEqual = Equal(new Date(item.Text2))

                                    //const backgroundColor = isCurrentDate || (page === 0 && index === 0 && isFuture) ? '#EFDCC9 ' : isPast ? "white" : 'white';

                                    // const rowStyle = !isCurrentDate && isPast ? {
                                    //     backgroundColor: 'white',
                                    //     // opacity: 0.5,
                                    // } : { backgroundColor };

                                    return (
                                        <TableRow key={item.Id} >
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                   // backgroundColor: rowStyle.backgroundColor,
                                                    //opacity: !isCurrentDate && isPast ? 0.5 : 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {item.Text1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    //backgroundColor: rowStyle.backgroundColor,
                                                   // opacity: !isCurrentDate && isPast ? 0.5 : 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {item.Text2}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    //backgroundColor: rowStyle.backgroundColor,
                                                   // opacity: !isCurrentDate && isPast ? 0.5 : 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {item.Text3}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    //backgroundColor: rowStyle.backgroundColor,
                                                    textAlign: 'center',
                                                    //opacity: !isCurrentDate && isPast ? 0.5 : 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {item.Text4}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    //backgroundColor: rowStyle.backgroundColor,
                                                    textAlign: 'center',
                                                    //opacity: !isCurrentDate && isPast ? 0.5 : 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="left"
                                            >
                                                {item.Text5}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    //backgroundColor: rowStyle.backgroundColor,
                                                    //opacity: !isCurrentDate && isPast ? 0.5 : 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {item.Text6}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    //backgroundColor: rowStyle.backgroundColor, paddingTop: '2.5px', paddingBottom: '2.5px',
                                                    opacity: 1,
                                                }}
                                                align="center"
                                            >
                                                {item.Text7}
                                                <Tooltip title="View">
                                                    <VisibilityIcon
                                                        sx={{ color: 'black', cursor: 'pointer' }}
                                                        onClick={() => clickView(item.Id)} />
                                                </Tooltip>

                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    opacity: 1,
                                                    //backgroundColor: rowStyle.backgroundColor, paddingTop: '2.5px', paddingBottom: '2.5px'

                                                }}
                                                align="center"
                                            >
                                                {item.Text8}
                                                {HolidayFullAccess == 'Y' ? (
                                                    <IconButton
                                                        sx={{ color: 'red', cursor: 'pointer' }}
                                                        onClick={() => clickDelete(item.Id)}
                                                    >
                                                        <Tooltip title="Delete" >
                                                            <DeleteForeverIcon />
                                                        </Tooltip>
                                                    </IconButton>
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {ItemList.length >= 5 && (
                            <TablePagination
                                // rowsPerPageOptions={[5, 10, 15, 20]}
                                component="div"
                                count={ItemList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </TableContainer>
                </>
            )}
        </div>
    );
}

export default LeaveList;