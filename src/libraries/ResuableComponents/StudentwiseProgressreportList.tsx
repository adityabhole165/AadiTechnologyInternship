import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditOffIcon from '@mui/icons-material/EditOff';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useContext, useState } from 'react';
import IsPublishstatus from 'src/components/StudentWiseProgressReport/IsPublishstatus';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';

function StudentwiseProgressreportList({
    ItemList,
    HeaderArray,
    ClickHeader,
    clickEdit,
    clickDelete
}) {
    const clickHeader = (id) => {
        const updatedHeaderArray = HeaderArray.map((item) => {
            if (item.Id === id) {
              
                const newSortOrder = item.SortOrder === ''? 'desc':'';
                return {
                    ...item,
                    SortOrder: newSortOrder
                };
            } else {
                return { ...item, SortOrder: null }; 
            }
        });

        ClickHeader(updatedHeaderArray);
    }

    let Publishstatus = useContext(IsPublishstatus);
    
    return (
        <Card sx={{ backgroundColor: 'white' }}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
                <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, background: 'white' }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                {HeaderArray.map((item, i) => (
                                    <TableCell
                                        key={i}
                                        sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}
                                        onClick={item.Id !== 3 &&  item.Id !== 4? () => clickHeader(item.Id) : null}
                                    >
                                        <div style={{
                                            display: 'flex', alignItems: 'left', gap: 2,
                                            justifyContent: item.Header ? 'flex-start ' : 'left'
                                        }}>
                                            <b>{item.Header}</b>
                                            {item.SortOrder !== null && item.Id !== 3 &&  item.Id !== 4 ? (
                                                item.SortOrder === "desc" ? <ArrowCircleDownIcon /> : <ArrowCircleUpIcon />
                                            ) : null}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ItemList.map((item, i) => (
                                <TableRow key={i} sx={{ height: '36px' }}
                                >
                                   <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                        {item.RollNo}
                                    </TableCell>


                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                        <Typography noWrap>{item.StudentName}</Typography>
                                    </TableCell>

                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                        {item.EditStatus === "1" ? (
                                            <Tooltip title="Marks entry not started">
                                                <EditOffIcon style={{ cursor: 'pointer' }}
                                                    onClick={() => clickEdit(item.StandardId, item.Id)}
                                                    sx={{
                                                        color: '#f44336',
                                                        '&:hover': {
                                                            bgcolor: 'grey.300'
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : item.EditStatus === "2" ? (
                                            <Tooltip title="Marks entry partially done">
                                                <DesignServicesIcon style={{ cursor: 'pointer' }}
                                                    onClick={() => clickEdit(item.StandardId, item.Id)}
                                                    sx={{
                                                        color: '#ff9800',
                                                        '&:hover': {
                                                            bgcolor: 'grey.300'
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        ) :
                                            item.EditStatus === "3" ? (
                                                <Tooltip title='Marks entry completed'>
                                                    <EventAvailableIcon style={{ color: '#25e67b', cursor: 'pointer' }}
                                                        onClick={() => clickEdit(item.StandardId, item.Id)}
                                                        sx={{
                                                            color: '#ff9800',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300'
                                                            }
                                                        }}
                                                    />
                                                </Tooltip>) : null
                                        }
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                        {item.EditStatus == "1" || Publishstatus == true ?

                                            <span></span>
                                            : <Tooltip title="Delete">
                                                <DeleteForeverIcon
                                                    onClick={() => clickDelete(item.Id)}
                                                    sx={{
                                                        color: '#223354',
                                                        //  backgroundColor: grey[500],
                                                        '&:hover': {
                                                            color: 'red',
                                                            backgroundColor: red[100]
                                                        }
                                                    }}

                                                />
                                            </Tooltip>

                                        }

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Card>
    );
}

export default StudentwiseProgressreportList;
