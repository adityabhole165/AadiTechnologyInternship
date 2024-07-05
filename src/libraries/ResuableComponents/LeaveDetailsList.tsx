import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Equal, isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';

function LeaveList({
    ItemList,
    clickView,
    HeaderArray,
    clickDelete,
}) {
    console.log(ItemList, "ItemList----------");

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
                    <TableContainer component={Box}>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead>
                                <TableRow
                                    sx={{ background: (theme) => theme.palette.secondary.main, }}
                                >
                                    {HeaderArray.map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                // textTransform: 'capitalize',
                                                color: (theme) => theme.palette.common.white,
                                                textAlign: i === 2 || i === 3 ? 'center' : 'center'
                                            }}
                                            align="center"
                                        >
                                            <b>{item.Header}</b>
                                        </TableCell>

                                    ))}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => {
                                    const formattedItemDate = formatDate(new Date(item.Text2));
                                    const isCurrentDate = formattedItemDate === formattedDate;
                                    const isFuture = isFutureDateTime(new Date(item.Text2));
                                    const isPast = isPastDateTime(new Date(item.Text2));
                                    const isEqual = Equal(new Date(item.Text2))

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
                                                }}
                                                align="center"
                                            >
                                                {item.Text1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',

                                                }}
                                                align="center"
                                            >
                                                {item.Text2}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}
                                                align="center"
                                            >
                                                {item.Text3}
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}
                                                align="center"
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
                                            </TableCell>
                                            <TableCell sx={{ pl: "52px" }}>
                                                <Tooltip title="View">
                                                    <VisibilityIcon
                                                        sx={{ color: '#223354', cursor: 'pointer' }}
                                                        onClick={() => clickView(item.Id)} />
                                                </Tooltip>

                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize'
                                                }}
                                                align="center"
                                            >

                                                {item.StatusId == '1' ? (
                                                    <IconButton
                                                        sx={{
                                                            color: '#223354',
                                                            //  backgroundColor: grey[500],
                                                            '&:hover': {
                                                                color: 'red',
                                                                backgroundColor: red[100]
                                                            }
                                                        }}
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
                    </TableContainer>
                </>
            )}
        </div>
    );
}

export default LeaveList;