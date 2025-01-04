import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

function RegenerateRollNoList2({
    ItemList,
    HeaderArray,
    ClickHeader,
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

    const clickHeader = (id) => {
        const updatedHeaderArray = HeaderArray.map((item) => {
            if (item.Id === id) {
                return {
                    ...item,
                    SortOrder: item.SortOrder === 'desc' ? 'asc' : 'desc'
                };
            } else {
                return { ...item, SortOrder: null };
            }
        });
        ClickHeader(updatedHeaderArray);
    };

    return (
        <div>
            {ItemList.length === 0 ? (
                <Box sx={{ backgroundColor: '#D2FDFC' }}>
                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        No record found.
                    </Typography>
                </Box>
            ) : (
                <>
                    <TableContainer component={Box}>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead sx={{ overflow: 'auto' }}>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
                                    {HeaderArray.map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                color: (theme) => theme.palette.common.white,
                                                textAlign: [1].includes(i) ? 'left' : [2, 3, 4, 6].includes(i) ? 'left' : 'center',py: 1
                                            }}
                                            onClick={i !== 3 ? () => clickHeader(item.Id) : null}
                                        >
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <b>{item.Header}</b>
                                                {item.SortOrder !== null && item.Id !== 8 && item.Id !== 9 ?
                                                    item.SortOrder === "desc" ? <ArrowCircleUpIcon /> : <ArrowCircleDown />
                                                    : null
                                                }
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ width: '100px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                {item.RegNo}
                                            </TableCell>
                                            <TableCell sx={{ width: '100px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                {item.Class}
                                            </TableCell>
                                            <TableCell sx={{ width: '100px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                {item.RollNo}
                                            </TableCell>
                                            {/* TextField for 4th position (Text4) with numeric input */}
                                            <TableCell sx={{ width: '100px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    value={item.NewRollNo || ''}
                                                    onChange={(e) => {
                                                        // Ensure only numeric values are allowed
                                                        if (/^\d*$/.test(e.target.value)) {
                                                            item.NewRollNo = e.target.value; // Update the value
                                                        }
                                                    }}
                                                    type="number"
                                                    fullWidth
                                                    sx={{
                                                        '& .MuiInputBase-root': {
                                                            height: '25px', // Adjust the input height
                                                        },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: '300px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                {item.StudentName}
                                            </TableCell>
                                            <TableCell sx={{ width: '300px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                {moment(item.Text5).format('DD MMM YYYY   h:mm A')}
                                            </TableCell>
                                            {/* New Field: Text6 */}
                                            <TableCell sx={{ width: '150px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                {item.Category}
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

export default RegenerateRollNoList2;
