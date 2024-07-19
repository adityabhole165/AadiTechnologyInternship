import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';

function RequisitionList1({
    ItemList,
    HeaderArray,
    ClickHeader,
    clickEdit,
    clickView,
    clickDelete,
    clickCancel
}) {
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
    }
    const asUserId = Number(localStorage.getItem('UserId'));

    return (
        <>
            <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            {HeaderArray.slice(0, 6).map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}
                                    onClick={item.Id !== 3 ? () => clickHeader(item.Id) : null}
                                >
                                    <div style={{
                                        display: 'flex', alignItems: 'left', gap: 2,
                                        justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'left'
                                    }}>
                                        <b>{item.Header}</b>
                                        {item.SortOrder !== null && item.Id !== 3 ?
                                            item.SortOrder === "desc" ? <ArrowDropDownCircleIcon /> : <ArrowCircleUpIcon />
                                            : null
                                        }
                                    </div>
                                </TableCell>

                            ))}
                            {HeaderArray.slice(6).map((item, i) => (
                                <TableCell key={i + 6} sx={{
                                    textTransform: 'capitalize',
                                    color: (theme) => theme.palette.common.white,
                                    py: 1
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'left', gap: 1, justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center' }}>
                                        <b>{item.Header}</b>
                                    </div>
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {ItemList.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.RequisitionCode}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.RequisitionName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.StatusName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.CreaterName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.Created_Date}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.ExpiryDate}</TableCell>

                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="center">
                                    {item.Editble === '1' ? (
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
                                    ) : (
                                        <Tooltip title={"View"}>
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
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.IsDelete === "True" ? (
                                        <Tooltip title={"Delete"}>
                                            <IconButton
                                                onClick={() => clickDelete(item.Id)}
                                                sx={{
                                                    color: '#223354',
                                                    '&:hover': {
                                                        color: 'red',
                                                        backgroundColor: red[100]
                                                    }
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : <span></span>
                                    }
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                    {((item.StatusID == "3" || item.StatusID == "8") && (item.CreatedId != asUserId)) ? (

                                        <Link onClick={() => clickCancel(item.Id)} sx={{ color: 'blue' }}>Cancel</Link>

                                    ) : null}



                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default RequisitionList1;