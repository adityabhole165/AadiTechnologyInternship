import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const NoticeCard = ({ itemList, downloadNotice, clickSingle }) => {
    const navigate = useNavigate();
    const [isCardVisible, setIsCardVisible] = useState(true);
    const handleCheckboxChange = () => {
        setIsCardVisible(!isCardVisible);
    };
    const clickDelete = (value, isActive) => {
        clickSingle({ name: name, value: value, checked: !isActive })
    }
    const clickCard = (path) => {
        navigate('../' + path.replace('/Common/', ''))

    }
    return (
        <>
            {/* <Grid container xs={12} >
                <Grid xs={10.8} >
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 0.5, mt: 0.7 }}>
                        <Typography sx={{ textDecoration: item.isActive ? "line-through" : "" }}
                            onClick={() => { clickCard(item.linkPath) }}
                        >{item.header}</Typography>
                        <div style={{ flex: '1' }}></div>
                        <FileDownloadOutlinedIcon onClick={() => { downloadNotice(item.FileName, item.IsImageNotice) }} />
                    </Card>
                </Grid>
                <Grid xs={1} sx={{ mt: "10px", ml: "5px" }}>
                    <DeleteIcon onClick={() => clickDelete(item.id)}
                        sx={{ color: !item.isActive ? 'red' : 'grey' }}
                    />
                </Grid>
            </Grid> */}
            <Box sx={{ backgroundColor: 'white' }}>
                <TableContainer component={Box} >
                    <Table aria-label="simple table" sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                        <TableHead>
                            <TableRow
                                sx={{ background: (theme) => theme.palette.secondary.main, py: 1 }}>
                                <TableCell sx={{ color: 'white' }} >
                                    Name
                                </TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', py: 1 }}>
                                    Download
                                </TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', py: 1 }} >
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {itemList.map((item, index) => {
                                return (
                                    <TableRow key={index} onClick={() => { clickCard(item.linkPath) }}>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>
                                            {item.header}
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center' }}>
                                            <FileDownloadOutlinedIcon onClick={() => { downloadNotice(item.FileName, item.IsImageNotice) }} />
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center' }}>
                                            <DeleteForeverIcon onClick={() => clickDelete(item.id, item.isActive)}
                                                sx={{
                                                    color: '#38548A',
                                                    '&:hover': { color: 'red', backgroundColor: red[100] }
                                                }} />
                                        </TableCell>



                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </>
    );
};

export default NoticeCard;