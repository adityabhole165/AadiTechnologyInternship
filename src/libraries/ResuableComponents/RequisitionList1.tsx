import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Link, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
                            {HeaderArray.slice(0, 5).map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}
                                    onClick={item.Id !== 3 ? () => clickHeader(item.Id) : null}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center' }}>
                                        <b>{item.Header}</b>
                                        {item.SortOrder !== null && item.Id !== 3 ?
                                            item.SortOrder === "desc" ? <ArrowDropDownCircleIcon /> : <ArrowCircleUpIcon />
                                            : null
                                        }
                                    </div>
                                </TableCell>

                            ))}
                            {HeaderArray.slice(5).map((item, i) => (
                                <TableCell key={i + 5} sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center' }}>
                                        <b>{item.Header}</b>
                                    </div>
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{item.RequisitionCode}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{item.RequisitionName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{item.StatusName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{item.CreaterName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{item.Created_Date}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }} align="center">
                                    {item.Editble === '1' ? (
                                        <Tooltip title={"Edit"}>
                                            <EditTwoTone onClick={() => clickEdit(item.Id)} />

                                        </Tooltip>
                                    ) : (
                                        <Tooltip title={"View"}>
                                            <Visibility onClick={() => clickView(item.Id)} />
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                    {item.IsDelete === "True" ? (
                                        <Tooltip title={"Delete"}>
                                            <DeleteForeverIcon onClick={() => clickDelete(item.Id)} sx={{ color: 'red' }} />
                                        </Tooltip>
                                    ) : <span></span>
                                    }
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                    {(item.StatusID == "3" || (item.StatusID == "8" && item.CreatedId !== asUserId)) ? (
                                        <Tooltip title={"Cancel"}>
                                            <Link onClick={() => clickCancel(item.Id)} sx={{ color: 'blue' }}>Cancel</Link>
                                        </Tooltip>
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