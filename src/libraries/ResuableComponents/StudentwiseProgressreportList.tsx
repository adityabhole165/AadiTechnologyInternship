import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditOffIcon from '@mui/icons-material/EditOff';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function StudentwiseProgressreportList({
    ItemList,
    HeaderArray,
    ClickHeader,
    clickEdit,
    clickDelete
}) {

    const clickHeader = (value) => {
        if (value !== undefined) {
            const updatedHeaderArray = HeaderArray.map((item) => {
                return item.SortOrder === undefined ? item : { ...item, SortOrder: item.SortOrder === "Roll_No" ? "Roll_No desc" : "Roll_No" }
            });
            ClickHeader(updatedHeaderArray);
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', py: 4 }}>
            <Paper sx={{ width: '80%', p: 2, backgroundColor: 'white', boxShadow: 3 }}>
                {/* Legend and space above the table */}
                <Box sx={{ mb: 2 }}>
                    {/* Add your legend content here */}
                    <Typography variant="h6"></Typography>
                    {/* Add spacing here */}
                </Box>
                <TableContainer component={Box} sx={{ border: '1px solid', borderColor: 'grey.300' }}>
                    <Table aria-label="simple table" sx={{ minWidth: 650, tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                {HeaderArray.map((item, i) => (
                                    <TableCell
                                        key={i}
                                        sx={{
                                            textTransform: 'capitalize',
                                            fontWeight: 'bold',
                                            py: 0.5,  // Reduce padding for header cells
                                            textAlign: item.Header === 'Roll No' || item.Header === 'Student Name' ? 'left' : 'center',
                                            paddingLeft: item.Header === 'Roll No' || item.Header === 'Student Name' ? 2 : 0,
                                            backgroundColor: 'inherit',
                                            color: 'inherit',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            minWidth: 50, // Minimize the width of columns
                                            maxWidth: 150
                                        }}
                                        onClick={() => clickHeader(item.Id)}
                                    >
                                        {item.Header}
                                        {item.SortOrder !== undefined &&
                                            (item.SortOrder === "Roll_No" ?
                                                <ArrowCircleUpIcon sx={{ ml: 1, color: '#ffffff' }} /> :
                                                <ArrowDropDownCircleIcon sx={{ ml: 1, color: '#ffffff' }} />
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ItemList.map((item, i) => (
                                <TableRow key={i} sx={{ height: '36px' }}>
                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', py: 0.5, minWidth: 50, maxWidth: 150 }}>{item.RollNo}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', py: 0.5, minWidth: 50, maxWidth: 150 }}>
                                        <Typography noWrap>{item.StudentName}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', py: 0.5, minWidth: 50, maxWidth: 150 }}>
                                        {item.EditStatus === "1" ? (
                                            <Tooltip title="Marks entry not started">
                                                <EditOffIcon
                                                    onClick={() => clickEdit(item.Id)}
                                                    sx={{
                                                        color: '#f44336',
                                                        '&:hover': {
                                                            bgcolor: 'grey.300'
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : item.EditStatus === "2" ? (
                                            <Tooltip title="Marks entry partially done">
                                                <DesignServicesIcon
                                                    onClick={() => clickEdit(item.Id)}
                                                    sx={{
                                                        color: '#ff9800',
                                                        '&:hover': {
                                                            bgcolor: 'grey.300'
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        ) :

                                            item.EditStatus === "3" ? (
                                                <Tooltip title='Marks entry completed'>
                                                    <CheckIcon style={{ color: '#07bc0c', cursor: 'pointer' }}
                                                        onClick={() => clickEdit(item.Id)}
                                                        sx={{
                                                            color: '#ff9800',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300'
                                                            }
                                                        }}
                                                    />
                                                </Tooltip>) : 'null'
                                        }
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', py: 0.5, minWidth: 50, maxWidth: 150 }}>
                                        {item.EditStatus !== "1" && item.ShowProgressReport !== "Y" && (
                                            <Tooltip title="Delete">
                                                <DeleteForeverIcon
                                                    onClick={() => clickDelete(item.Id)}
                                                    sx={{
                                                        color: '#223354',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            color: 'red',
                                                            backgroundColor: red[100],
                                                        },
                                                    }}
                                                />
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default StudentwiseProgressreportList;

