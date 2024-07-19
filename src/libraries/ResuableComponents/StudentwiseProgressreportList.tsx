import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditOffIcon from '@mui/icons-material/EditOff';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';

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
        <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
            <Table aria-label="simple table">
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
                                    paddingLeft: item.Header === 'Roll No' ? 2 : 0, // Adjust padding for Roll No header
                                    backgroundColor: 'inherit',
                                    color: 'inherit',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    minWidth: 50, // Minimize the width of columns
                                    maxWidth: 150 // Adjust max width for better display
                                }}
                                onClick={() => clickHeader(item.Id)}
                            >
                                {item.Header}
                                {item.SortOrder !== undefined &&
                                    (item.SortOrder === "Roll_No" ?
                                        <ArrowCircleUpIcon sx={{ ml: 1, color: '#ffffff', verticalAlign: 'middle' }} /> :
                                        <ArrowDropDownCircleIcon sx={{ ml: 1, color: '#ffffff', verticalAlign: 'middle' }} />
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
                                        </Tooltip>) : null
                                }
                            </TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', py: 0.5, minWidth: 50, maxWidth: 150 }}>
                                {item.EditStatus !== "1" && item.ShowProgressReport !== "Y" && (
                                    <Tooltip title="Delete">
                                        <DeleteForeverIcon
                                            onClick={() => clickDelete(item.Id)}
                                            sx={{
                                                color: 'red',
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
    );
}

export default StudentwiseProgressreportList;
