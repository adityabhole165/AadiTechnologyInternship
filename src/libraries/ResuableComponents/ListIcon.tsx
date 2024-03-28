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
    clicknav,
    SubmitedByReportingUser,
    ReportingConfigs
}) {
    const getStatusIcon = (status) => {
        let icon;
        switch (status) {
            case "0":
                icon = <CloseIcon sx={{ color: 'green' }} />;
                break;
            case "1":
                icon = <CheckIcon sx={{ color: 'red' }} />;
                break;

            default:
                icon = null;
                break;
        }
        return icon



    };


    return (
        <div>
            <TableContainer component={Box}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {HeaderArray.map((item, i) => (
                                <TableCell key={i} align={item.align ? item.align : 'left'} sx={{ backgroundColor: '#324b84', color: 'white' }}>
                                    <b>{item.Header}</b>

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item) => (
                            <TableRow key={item.Id}>
                                <TableCell>{item.StartDate}</TableCell>
                                <TableCell>{item.EndDate}</TableCell>
                                <TableCell align="center">
                                    {item.Text3 === "" ? "-" : (
                                        <Tooltip title={"View Remarks"}>
                                            <Visibility onClick={() => clickView(item.Id)} />
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {item.Text4}
                                    <Tooltip title={"Edit"}>
                                        <EditIcon onClick={() => clickEdit(item.Id)} />
                                    </Tooltip>
                                </TableCell>
                                {SubmitedByReportingUser !== "0" && (

                                    <TableCell align="center">
                                        {item.Text5}
                                        <Tooltip title={"Delete"}>
                                            <CloseIcon onClick={() => clickDelete(item.Id)} sx={{ color: 'red' }} />
                                        </Tooltip>
                                    </TableCell>
                                )}
                                {CanEdit === 'Y' && (
                                    <TableCell align="center">
                                        <Tooltip title={"View"}>
                                            <Visibility onClick={() => clicknav(item.Id)} />
                                        </Tooltip>
                                    </TableCell>
                                )}
                                <TableCell align="center">
                                    {item.Text5}
                                    <Link component="button" onClick={() => clickExport(item.Id)}>
                                        Export
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    {ReportingConfigs.map((config) => {
                                        if (config.StartDate === item.StartDate && config.EndDate === item.EndDate) {
                                            return (<Tooltip title={config.ReportingUserName}>
                                                {getStatusIcon(config.IsSubmitted)}
                                            </Tooltip>)
                                        }
                                    })}
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
