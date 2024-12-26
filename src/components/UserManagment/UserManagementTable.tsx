import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import TextsmsIcon from '@mui/icons-material/Textsms';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function UserManagementList({ ItemList, HeaderArray, ClickHeader }) {

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
                                            {item.ActivateDeactivate === 'Active' ? (
                                                <LockOpenIcon
                                                    sx={{ color: 'green', cursor: 'pointer' }}
                                                />
                                            ) : (
                                                <LockIcon
                                                    sx={{ color: 'red', cursor: 'pointer' }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
                                            <KeyIcon
                                                sx={{ color: '#a9a9a9', cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
                                            <TextsmsIcon
                                                sx={{ color: '#3cb371', cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 1 }}>
                                            {item.ActivateDeactivate === 'Active' ? (
                                                <MarkEmailReadIcon
                                                    sx={{ color: 'green', cursor: 'pointer' }}
                                                />
                                            ) : (
                                                <UnsubscribeIcon
                                                    sx={{ color: 'red', cursor: 'pointer' }}
                                                />
                                            )}
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
