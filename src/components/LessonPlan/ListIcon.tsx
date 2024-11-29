import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import IsHighliteStaus from './LessonPlanContext';

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
    const cellStyle = {
        padding: '0.1px 0.1px', // Adjust these values to reduce the height
    };
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
                // icon = <Box sx={{ display: 'inline-block', verticalAlign: 'top', padding: '1px' }}>
                icon = <Box sx={{ display: 'inline-block', verticalAlign: 'top', padding: '1px', fontSize: '0.9rem', minWidth: '10px', minHeight: '10px' }}>
                    <b>N/A</b>
                </Box>

                break;

            default:
                icon = null;
                break;
        }
        return icon



    };

    let USAddOrEditLessonPlanDetails = useContext(IsHighliteStaus)
    const asUserId = Number(localStorage.getItem('UserId'));

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

    const IsHighlight = () => {
        let returnVal = false;
        USAddOrEditLessonPlanDetails.map((item) => {
            if (item.UserId == item.ReportingUserId)
                returnVal = item.UserId == asUserId.toString();

        })
        return returnVal;
    }




    return (
        <div>
            <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
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
                        {ItemList.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ ...cellStyle, color: IsHighlight() != false && item.IsSuggisionAdded === "True" && item.IsSuggisitionRead === "False" ? '#3498db' : 'inherit', padding: '8px' }}>{item.StartDate}</TableCell>

                                <TableCell sx={{ ...cellStyle, color: IsHighlight() != false && item.IsSuggisionAdded === "True" && item.IsSuggisitionRead === "False" ? '#3498db' : 'inherit', padding: '8px' }}>{item.EndDate}</TableCell>

                                {/* <TableCell align="center">
                                    {getIsRemarkView(item.UserId, item.StartDate, item.EndDate) ?
                                        (
                                            <Tooltip title={"View Remarks"}>
                                                <Visibility onClick={() =>
                                                    clickView(item.Id, item.Text3, item.StartDate, item.EndDate, item.UserId)} sx={{ cursor: 'pointer' }} />
                                            </Tooltip>
                                        ) :
                                        "-"
                                    }
                                </TableCell> */}
                                <TableCell align="center" sx={{ ...cellStyle }}>
                                    {getIsRemarkView(item.UserId, item.StartDate, item.EndDate) ? (
                                        <Tooltip title={"View Remarks"}>
                                            <IconButton
                                                onClick={() =>
                                                    clickView(item.Id, item.Text3, item.StartDate, item.EndDate, item.UserId)
                                                }
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
                                    ) : (
                                        "-"
                                    )}
                                </TableCell>

                                {/* {ShowEdit &&
                                    <TableCell align="center">

                                        <Tooltip title={"Edit"}>
                                            <EditTwoTone onClick={() => clickEdit({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })} sx={{ cursor: 'pointer' }} />
                                        </Tooltip>
                                    </TableCell>
                                } */}
                                {ShowEdit && (
                                    <TableCell align="center" sx={{ ...cellStyle }}>
                                        <Tooltip title={"Edit"}>
                                            <Box sx={{ padding: '8px' }}>
                                                <IconButton
                                                    onClick={() => clickEdit({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })}
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
                                            </Box>
                                        </Tooltip>
                                    </TableCell>
                                )}
                                {/* <TableCell align="center">
                                    {item.SubmitedByReportingUser == "0" && (
                                        <Tooltip title={"Delete"}>

                                            <DeleteForeverRoundedIcon onClick={() => clickDelete(item.StartDate, item.EndDate)} sx={{  cursor: 'pointer',fontSize: '1.7rem' ,'&:hover': { backgroundColor: 'lightgrey' } }} />
                                        </Tooltip>
                                    )}
                                </TableCell> */}
                                <TableCell align="center" sx={{ ...cellStyle }}>
                                    {item.SubmitedByReportingUser === "0" && (
                                        <Tooltip title={"Delete"}>
                                            <Box sx={{ padding: '8px' }}>
                                                <IconButton
                                                    onClick={() => clickDelete(item.StartDate, item.EndDate)}
                                                    sx={{
                                                        color: '#223354',
                                                        //  backgroundColor: grey[500],
                                                        '&:hover': {
                                                            color: 'red',
                                                            backgroundColor: red[100]
                                                        }
                                                    }}

                                                >
                                                    <DeleteForeverRoundedIcon />
                                                </IconButton>
                                            </Box>
                                        </Tooltip>
                                    )}
                                </TableCell>

                                {(!ShowEdit) && (
                                    <TableCell align="center" sx={{ ...cellStyle }}>
                                        <Tooltip title={"View"}>
                                            <IconButton onClick={() => {
                                                clicknav({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })
                                            }} sx={{
                                                color: '#223354',
                                                '&:hover': {
                                                    color: '#223354',
                                                    cursor: 'pointer'
                                                }
                                            }}>  <Visibility /></IconButton>
                                        </Tooltip>
                                    </TableCell>
                                )}


                                <TableCell align="center" sx={{ ...cellStyle }}>
                                    {item.Text5}
                                    {item.IsSubmitted === "True" && (
                                        <Link
                                            component="button"
                                            onClick={() => clickExport({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })}
                                            sx={{
                                                color: IsHighlight() != false && item.IsSuggisionAdded === "True" && item.IsSuggisitionRead === "False" ? '#3498db' : 'inherit', cursor: 'pointer'
                                            }}
                                        >
                                            Export
                                        </Link>
                                    )}
                                </TableCell>

                                <TableCell align="center" sx={{ ...cellStyle }} >
                                    {ReportingConfigs.map((config, i) => {
                                        if (config.StartDate === item.StartDate && config.EndDate === item.EndDate) {
                                            return (<Tooltip title={config.ReportingUserName} key={i}  >
                                                <IconButton sx={{ cursor: 'pointer' }}>  {getStatusIcon(config.IsSubmitted)}</IconButton>

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
