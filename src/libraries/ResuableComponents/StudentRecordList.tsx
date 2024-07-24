import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function StudentRecordList({
    ItemList,
    HeaderArray,
    ClickHeader,
    clickEdit,
    clickView
}) {
    const clickHeader = (id) => {
        const updatedHeaderArray = HeaderArray.map((item) => {
            if (item.Id === id) {
                return {
                    ...item,
                    SortOrder: item.SortOrder === 'ASC' ? 'DESC' : 'ASC'
                };
            } else {

                return { ...item, SortOrder: null };
            }
        });
        ClickHeader(updatedHeaderArray);
    }
    const asUserId = Number(localStorage.getItem('UserId'));
    const cellStyle = {
        padding: '0.2em 1.5em', // Adjust these values to reduce the height
    };
    const rowStyle = {
        height: '0.5em 1.5em', // Ensure auto height to adjust based on content
    };

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
                    <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white, ...rowStyle }}>
                                    {HeaderArray.slice(0, 6).map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}
                                            onClick={() => clickHeader(item.Id)}
                                        >
                                            <div style={{ display: 'flex', gap: 1, justifyContent: (item.Id === 1 || item.Id === 2 || item.Id === 3) ? 'left' : (item.Id === 4 || item.Header.includes('Remark Template')) ? 'left' : 'center' }}>
                                                <b>{item.Header}</b>
                                                {i < 4 && item.SortOrder !== null && (
                                                    item.SortOrder === "DESC" ? <ArrowDropDownCircleIcon /> : <ArrowCircleUpIcon />
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}
                                    {HeaderArray.slice(6).map((item, i) => (
                                        <TableCell key={i + 6} sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center', ...cellStyle }}>
                                                <b>{item.Header}</b>
                                            </div>
                                        </TableCell>
                                    ))}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell sx={{ textTransform: 'capitalize', ...cellStyle, textAlign: 'left' }}>{item.Text1}</TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', ...cellStyle, textAlign: 'left' }}>{item.Text2}</TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', ...cellStyle, textAlign: 'left' }}>{item.Text3}</TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', ...cellStyle, textAlign: 'left' }}>{item.Text4}</TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', ...cellStyle, textAlign: 'center' }}>{item.Text5}</TableCell>

                                        <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center', ...cellStyle }} align="center">
                                            {item.IsRecordFound === false ? (
                                                <Tooltip title={"Add"}>
                                                    <EditTwoTone onClick={() => clickEdit(item.Id)}
                                                        sx={{
                                                            color: '#223354',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300',
                                                                cursor: 'pointer'
                                                            }
                                                        }} />

                                                </Tooltip>
                                            ) : (
                                                <Tooltip title={"View / Edit"}>
                                                    <Visibility onClick={() => clickView(item.Id)}
                                                        sx={{
                                                            color: '#223354',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300',
                                                                cursor: 'pointer'
                                                            }
                                                        }} />
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    );
}

export default StudentRecordList;