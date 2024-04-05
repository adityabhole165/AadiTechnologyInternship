import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
    ReportingConfigs,
    Text2,
    ShowEdit
}) {
    const getStatusIcon = (status) => {
        let icon;
        switch (status) {
            case "0":
                icon = <CloseIcon sx={{ color: 'red' }} />;
                break;
            case "1":
                icon = <CheckIcon sx={{ color: ' green' }} />;
                break;

            case "2":
                icon = <Box sx={{ display: 'inline-block', verticalAlign: 'top', padding: '2px' }}>
                    <b>N/A</b>
                </Box>

                break;

            default:
                icon = null;
                break;
        }
        return icon



    };

    const getIsRemarkView = (UserId, StartDate, EndDate) => {
        let returnVal = false
        ReportingConfigs.map((Item, i) => {
            if (Item.StartDate == StartDate &&
                Item.EndDate == EndDate &&
                Item.IsSubmitted == "1" &&
                Item.ReportingUserId !== UserId
            )
                returnVal = true
        })
        return returnVal
    }

    return (
        <div>
            <TableContainer component={Box}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            {HeaderArray.map((item, i) => (
                                !(item.Header == "Edit" && !ShowEdit
                                    || item.Header == "View" && ShowEdit
                                ) &&
                                < TableCell key={i} align={item.align ? item.align : 'left'} sx={{ backgroundColor: '#19bed4', color: 'white' }}>
                                    <b>{item.Header}</b>
                                </TableCell>)
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item) => (
                            <TableRow key={item.Id}>
                                <TableCell>{item.StartDate}</TableCell>
                                <TableCell>{item.EndDate}</TableCell>
                                <TableCell align="center">
                                    {getIsRemarkView(item.UserId, item.StartDate, item.EndDate) ?
                                        (
                                            <Tooltip title={"View Remark"}>
                                                <Visibility onClick={() =>
                                                    clickView(item.Id, item.Text3)} />
                                            </Tooltip>
                                        ) :
                                        "-"
                                    }
                                </TableCell>
                                {ShowEdit &&
                                    <TableCell align="center">

                                        <Tooltip title={"Edit"}>
                                            <EditTwoTone onClick={() => clickEdit({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })} />
                                        </Tooltip>
                                    </TableCell>
                                }

                                <TableCell align="center">
                                    {item.SubmitedByReportingUser == "0" && (
                                        <Tooltip title={"Delete"}>
                                            <DeleteForeverIcon onClick={() => clickDelete(item.StartDate, item.EndDate)} sx={{ color: 'red' }} />
                                        </Tooltip>
                                    )}
                                </TableCell>


                                {(CanEdit === 'Y' && !ShowEdit) && (
                                    <TableCell align="center">
                                        <Tooltip title={"View"}>
                                            <Visibility onClick={() => {
                                                clicknav({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })
                                            }} />
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
        </div >
    );
}

export default ListIcon;
