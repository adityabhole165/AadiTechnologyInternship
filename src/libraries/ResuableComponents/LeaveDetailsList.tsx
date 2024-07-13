import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function LeaveList({
    ItemList,
    clickView,
    HeaderArray,
    clickDelete,
}) {


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
                        No record found.
                    </Typography>
                </Box>
            ) : (

                <>

                    <TableContainer component={Box}>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead>
                                <TableRow
                                    sx={{ background: (theme) => theme.palette.secondary.main }}
                                >
                                    {HeaderArray.map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                // textTransform: 'capitalize',
                                                color: (theme) => theme.palette.common.white,
                                                textAlign: i === 1 || i === 2 ? 'left' : 'left'
                                            }}
                                            align="center"
                                        >
                                            <b>{item.Header}</b>
                                        </TableCell>

                                    ))}
                                    <TableCell sx={{ background: (theme) => theme.palette.secondary.main }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => {
                                    const formattedItemDate = formatDate(new Date(item.Text2));

                                    return (
                                        <TableRow key={index} >
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '250px'
                                                }}
                                                align="left"
                                            >
                                                {item.Text1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '200px', wordWrap: 'break-word'
                                                }}
                                                align="left"
                                            >
                                                {item.Text2}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '200px', wordWrap: 'break-word'
                                                }}
                                                align="left"
                                            >
                                                {item.Text3}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '250px', wordWrap: 'break-word'
                                                }}
                                                align="left"
                                            >
                                                {item.Text4}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}
                                                align="left"
                                            >
                                                {item.Text5}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize'
                                                }}
                                                align="left"
                                            >
                                                {item.Text6}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}
                                                align="left"
                                            >
                                                {item.Text7}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={"View"}>
                                                    <IconButton
                                                        onClick={() => clickView(item.Id)}
                                                        sx={{
                                                            color: '#223354',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300'
                                                            }
                                                        }}
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    opacity: 1,
                                                }}
                                                align="center"
                                            >

                                                {item.IsApprovedByApprover == 'False' ? (
                                                    <IconButton
                                                        sx={{
                                                            color: '#223354',
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
            )
            }
        </div >
    );
}

export default LeaveList;
