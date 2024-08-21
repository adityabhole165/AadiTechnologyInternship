
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

const PrePrimaryResultlist = ({ ItemList, HeaderArray, clickEdit }) => {

    return (
        <div>

            <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
                        >
                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: (theme) => theme.palette.common.white,
                                        py: 1,
                                      
                                    }}
                                >
                                    <b>{item.Header}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item) => (
                            <TableRow key={item.ItemID}>
                                <TableCell sx={{ textTransform: 'capitalize', py:1 }}>
                                    {item.Subject_Name}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize', py:1 }}>

                                <Tooltip title={"Edit"}>
                                    <IconButton
                                        onClick={() => clickEdit(item.Id)}
                                        sx={{ color: '#223354', cursor: 'pointer',  }}
                                    >
                                        <EditTwoTone />
                                    </IconButton>
                                </Tooltip>
                                </TableCell>
                                

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default PrePrimaryResultlist