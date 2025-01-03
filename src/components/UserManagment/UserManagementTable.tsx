import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import KeyIcon from '@mui/icons-material/Key';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import TextsmsIcon from '@mui/icons-material/Textsms';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
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
                                        <TableCell sx={{ textAlign: 'left', py: 1 }}>{item.Name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>{item.MobileNumber}</TableCell>
                                        <TableCell sx={{ textAlign: 'left', py: 1 }}>{item.UserName}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
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

                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
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
                                                <KeyIcon />
                                            </IconButton>
                                        </TableCell>

                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
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
                                                    <TextsmsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
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
                                                    {item.ActivateDeactivate === 'Active' ? <MarkEmailReadIcon /> : <UnsubscribeIcon />}
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
