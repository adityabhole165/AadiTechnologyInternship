import AddCircleIcon from '@mui/icons-material/AddCircle';
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
        <Box>
            {ItemList.length === 0 ? (
                <Box sx={{ backgroundColor: '#D2FDFC' }}>

                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No record found.
                    </Typography>
                </Box>
            ) : (

                <>
                    <Box sx={{
                        backgroundColor: 'white', px: 2
                    }}>
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
                                                    textTransform: 'capitalize',
                                                    color: (theme) => theme.palette.common.white,
                                                    py: 1

                                                }}
                                            >
                                                <b>{item.Header}</b>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ItemList.map((item, index) => {
                                        return (
                                            <TableRow key={item.ItemID} >
                                                <TableCell
                                                    sx={{
                                                        textTransform: 'capitalize', py: 1
                                                    }}
                                                // align="left"
                                                >
                                                    {item.Text1}
                                                </TableCell>
                                                <TableCell sx={{
                                                    textTransform: 'capitalize',
                                                    py: 1, pl: 9
                                                }}>
                                                    <Tooltip title={"Performance Evaluation"}>
                                                        <IconButton
                                                            onClick={() => clickView(item.Id)}
                                                            sx={{
                                                                color: '#223354',
                                                                '&:hover': {
                                                                    color: '#223354',
                                                                    cursor: 'pointer'
                                                                }
                                                            }}
                                                        >
                                                            <AddCircleIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            )
            }
        </Box >
    );
}

export default PerformanceGradeAList;
