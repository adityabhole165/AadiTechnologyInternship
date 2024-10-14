import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SentsmsList({ ItemList, HeaderArray, ClickHeader, clickEdit }) {
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
        <>
            <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}
                                    onClick={i < 3 ? () => clickHeader(item.Id) : null} // Make only the first 3 headers clickable
                                >
                                    <div style={{ display: 'flex', alignItems: 'left', gap: 2, justifyContent: 'left' }}>
                                        <b>{item.Header}</b>
                                        {item.SortOrder !== null && i < 3 ? ( // Show sorting icons only for the first 3 columns
                                            item.SortOrder === "desc" ? <ArrowCircleUpIcon /> : <ArrowCircleDown />
                                        ) : null}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.UserName}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.Subject}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.Insert_Date}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="center">
                                    <Tooltip title={"Edit"}>
                                        <IconButton
                                            onClick={() => clickEdit(item.Id)}
                                            sx={{
                                                color: '#223354',
                                                '&:hover': {
                                                    color: '#223354',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        >
                                            <EditTwoTone />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {/* Placeholder for other data */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default SentsmsList;
