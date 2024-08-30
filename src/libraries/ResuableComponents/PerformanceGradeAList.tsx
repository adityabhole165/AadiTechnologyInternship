import Visibility from '@mui/icons-material/Visibility';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function PerformanceGradeAList({
    ItemList,
    clickView,
    HeaderArray,
}) {
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
                                                // textAlign: i === 1 ? 'left' : 'left'
                                            }}
                                            align="center"
                                        >
                                            <b>{item.Header}</b>
                                        </TableCell>
                                    ))} <span></span>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => {
                                    return (
                                        <TableRow key={index} >
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '250px', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="left"
                                            >
                                                {item.Text1}
                                            </TableCell>
                                            <TableCell align="center" sx={{
                                                paddingTop: '2.5px', paddingBottom: '2.5px'
                                            }}>
                                                <Tooltip title={"View"}>
                                                    <IconButton
                                                        onClick={() => clickView(item.Id, item.Text1)}
                                                        sx={{
                                                            color: '#223354',
                                                            '&:hover': {
                                                                color: '#223354',
                                                                cursor: 'pointer'
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
                                                    opacity: 1, paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >

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

export default PerformanceGradeAList;
