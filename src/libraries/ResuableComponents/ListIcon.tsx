import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import { Card, Link, Tooltip } from '@mui/material';
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

}) {
    return (
        <div>
            <TableContainer component={Card}>
                <Table aria-label="simple table">
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
                                    sx={{ textTransform: 'capitalize' }}
                                    align="center"
                                >
                                    <b>{item.Header}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item) => (
                            <TableRow key={item.Id}>
                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.StartDate}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.EndDate}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text3}
                                    <Visibility onClick={() => clickView(item.Id)} />
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text4}
                                    <EditIcon onClick={() => clickEdit(item.Id)} />
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text5}
                                    <CloseIcon onClick={() => clickDelete(item.Id)}  sx={{ color: 'red' }} />
                                </TableCell>


                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text5}
                                    <Link component="button" onClick={() => clickExport(item.Id)}>
                                        Export
                                    </Link>
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                                    {item.Text6 === '0' ? (
                                        <Tooltip title={item.ReportingUserName} >
                                            <CheckIcon  sx={{ color: 'green' }} />
                                        </Tooltip>
                                    ) : item.Text6 === '1' ? (
                                        <CheckIcon  sx={{ color: 'green' }} />
                                    ) : item.Text6 === '2' ? (
                                        <CloseIcon   sx={{ color: 'green' }} />
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
