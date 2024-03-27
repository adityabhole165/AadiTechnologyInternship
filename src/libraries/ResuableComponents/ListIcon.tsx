import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Link, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ListIcon({
    HeaderArray,
    ItemList,
    clickView,
    clickEdit,
    clickDelete,
    clickExport,
    CanEdit,
    clicknav
     
}) {
    return (
        <div>
            <TableContainer component={Box}>
                <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: (theme) => theme.colors.primary.main,
                                color: (theme) => theme.palette.common.white
                            }}
                        >
                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{ textTransform: 'capitalize', color: 'white' }}
                                    align={item.align ? item.align : 'left'}
                                >
                                    <b>{item.Header}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item) => (
                            <TableRow key={item.Id}>
                                <TableCell sx={{ textTransform: 'capitalize' }} >
                                    {item.StartDate}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} >
                                    {item.EndDate}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text3 === "" ? (
                                        "-"
                                    ) : (
                                        <>
                                           
                                            <Tooltip title={"View Remarks"}>
                                                <Visibility onClick={() => clickView(item.Id)} />
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text4}
                                    <Tooltip title={"Edit"}>
                                        <EditIcon onClick={() => clickEdit(item.Id)} />
                                    </Tooltip>
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text5}
                                    <Tooltip title={"Delete"}>
                                        <CloseIcon onClick={() => clickDelete(item.Id)} sx={{ color: 'red' }} />
                                    </Tooltip>
                                </TableCell>

                                {/* Conditional rendering for 'View' cell */}
                                {CanEdit === 'Y' && (
                                    <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                        <Tooltip title={"View"}>
                                            <Visibility  onClick={() => clicknav(item.Id)} />
                                        </Tooltip>
                                    </TableCell>
                                )}

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text5}
                                    <Link component="button" onClick={() => clickExport(item.Id)}>
                                        Export
                                    </Link>
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text8 === '0' ? (
                                        <Tooltip title={item.ReportingUserName} >
                                            <CheckIcon sx={{ color: 'green' }} />
                                        </Tooltip>
                                    ) : item.Text8 === '1' ? (
                                        <Tooltip title={item.ReportingUserName} >
                                            <CheckIcon sx={{ color: 'green' }} />
                                        </Tooltip>
                                    ) : item.Text8 === '2' ? (
                                        <Tooltip title={item.ReportingUserName} >
                                            <CloseIcon sx={{ color: 'red' }} />
                                        </Tooltip>
                                    ) : null}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListIcon;
