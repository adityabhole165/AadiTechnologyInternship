import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';

function UserManagementList({ ItemList, HeaderArray, ClickHeader, handleEmailReadClick, handleActivateDeactivateClick, handleKeyClick, handleTextsmsClick }) {

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
                    <Typography
                        variant="h6"
                        align="center"
                        color="blue"
                        sx={{
                            textAlign: 'center',
                            marginTop: 1,
                            backgroundColor: '#324b84',
                            padding: 1,
                            borderRadius: 2,
                            color: 'white'
                        }}
                    >
                        No record found.
                    </Typography>
                </Box>
            ) : (
                <>
                    <TableContainer component={Box}>
                        <Table
                            aria-label="simple table"
                            sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
                        >
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
                                    {HeaderArray.map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                color: (theme) => theme.palette.common.white,
                                                textAlign: item.Id === 1 || item.Id === 3 ? 'left' : 'center',
                                                pt: 1.5,
                                                pb: 1.5
                                            }}
                                            onClick={item.Id !== 2 && item.Id !== 4 && item.Id !== 5 && item.Id !== 6 && item.Id !== 7 ? () => clickHeader(item.Id) : null}
                                        >
                                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: item.Id === 1 || item.Id === 3 ? 'flex-start' : 'center' }}>
                                                <b>{item.Header}</b>
                                                {item.SortOrder !== null && item.Id !== 7 && item.Id !== 8 && item.Id !== 9 ? (
                                                    item.SortOrder === 'desc' ? (
                                                        <ArrowCircleUpIcon />
                                                    ) : (
                                                        <ArrowCircleDown />
                                                    )
                                                ) : null}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ textAlign: 'left',paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.Name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center',paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.MobileNumber}</TableCell>
                                        <TableCell sx={{ textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.UserName}</TableCell>
                                        <TableCell sx={{ textAlign: 'center',paddingTop: '2.5px', paddingBottom: '2.5px'}}>
                                            <Tooltip title={item.ActivateDeactivate === 'Active' ? "Deactivate" : "Activate"}>
                                                <IconButton
                                                    onClick={() => handleActivateDeactivateClick(item.Id)}
                                                    sx={{
                                                        color: item.ActivateDeactivate === 'Active' ? 'green' : '#ff6347',
                                                        '&:hover': {
                                                            color: item.ActivateDeactivate === 'Active' ? 'darkgreen' : '#ff6347',
                                                            cursor: 'pointer',
                                                        }
                                                    }}
                                                >
                                                    {item.ActivateDeactivate === 'Active' ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell sx={{ textAlign: 'center',paddingTop: '2.5px', paddingBottom: '2.5px'}}>
                                            <IconButton
                                                onClick={() => handleKeyClick(item.Id)}
                                                sx={{
                                                    color: '#223354',
                                                    '&:hover': {
                                                        color: '#223354',
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            >
                                                <VpnKeyOutlinedIcon  sx={{ fontSize: '20px' }}/>
                                            </IconButton>
                                        </TableCell>

                                        <TableCell sx={{ textAlign: 'center',paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                            <Tooltip title="Send Login SMS">
                                                <IconButton
                                                    onClick={() => handleTextsmsClick(item.Id)}
                                                    sx={{
                                                        color: '#223354',
                                                        '&:hover': {
                                                            color: '#223354',
                                                            cursor: 'pointer'
                                                        }
                                                    }}
                                                >
                                                    <SmsOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell sx={{ textAlign: 'center',paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                            <Tooltip title={item.ActivateDeactivate === 'Active' ? "Remove from SMS/Message List" : "Add to SMS/Message List"}>
                                                <IconButton
                                                    onClick={() => handleEmailReadClick(item.Id)}
                                                    sx={{
                                                        color: item.ActivateDeactivate === 'Active' ? 'green' : '#ff6347',
                                                        '&:hover': {
                                                            color: item.ActivateDeactivate === 'Active' ? 'darkgreen' : '#ff6347',
                                                            cursor: 'pointer',
                                                        }
                                                    }}
                                                >
                                                    {item.ActivateDeactivate === 'Active' ? <MarkEmailReadOutlinedIcon sx={{ fontSize: '25px' }}/> : <UnsubscribeOutlinedIcon sx={{ fontSize: '28px' }}/>}
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    );
}

export default UserManagementList;
