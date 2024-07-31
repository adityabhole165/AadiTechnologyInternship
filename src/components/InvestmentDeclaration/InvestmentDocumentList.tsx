import { Visibility } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';
// ... (your other imports)

function InvestmentDocumentList({ ItemList, clickView, clickDelete, HeaderArray }) {
    return (
        <div>
            <TableContainer component={Box} >
                <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <TableHead>
                        <TableRow
                            sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
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
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{item.Text1}</TableCell>

                                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }} align='center' >
                                    <Tooltip title={"View"}>
                                        <Visibility onClick={() => clickView(item.Text1)}
                                            sx={{
                                                color: '#223354',
                                                '&:hover': {
                                                    color: '#223354',
                                                    bgcolor: 'grey.300',
                                                    cursor: 'pointer'

                                                }
                                            }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }} align='center' >
                                    <IconButton
                                        sx={{
                                            color: '#223354',
                                            '&:hover': {
                                                color: 'red',
                                                backgroundColor: red[100]
                                            }
                                        }}

                                        onClick={() => clickDelete(item.Id)}
                                    >
                                        <Tooltip title="Delete" >
                                            <DeleteForeverIcon />
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InvestmentDocumentList;
