
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

const PrePrimaryResultlist = ({ ItemList, HeaderArray, clickEdit }) => {
    const cellStyle = {
        padding: '0.2em 1.5em', // Adjust these values to reduce the height
    };
    return (
        <div>

            <TableContainer component={Box} >
                <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
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
                                        py: 1

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
                                <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>
                                    {item.Subject_Name}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>
                                    {item.EditStatus == "Y" ? <Tooltip title={"Edit"}>
                                        <IconButton
                                            onClick={() => clickEdit(item.Id, item.Subject_Name, item.IsXseedSubject)}
                                            sx={{ color: '#223354', cursor: 'pointer', }}
                                        >
                                            <EditTwoTone />
                                        </IconButton>
                                    </Tooltip> : <Tooltip title={"Exam marks not submitted to the class teacher"}>
                                        <EventBusyIcon style={{ color: '#0f0f0f' }} />
                                    </Tooltip>

                                    }




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