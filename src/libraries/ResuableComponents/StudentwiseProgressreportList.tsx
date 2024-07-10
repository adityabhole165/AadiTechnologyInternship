import { EditTwoTone } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function StudentwiseProgressreportList({
    ItemList,
    HeaderArray,
    ClickHeader,
    clickEdit,
    clickDelete
}) {


    console.log(ItemList, "ItemList------");

    const clickHeader = (value) => {
        if (value !== undefined) {
            const updatedHeaderArray = HeaderArray.map((item) => {
                return item.SortOrder === undefined ? item : { ...item, SortOrder: item.SortOrder === "Roll_No" ? "asc" : "Roll_No" }
            });
            ClickHeader(updatedHeaderArray);
        }
    }


    return (
        <>
            <TableContainer component={Box} sx={{
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            }}>
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
                                        py: 1
                                    }}
                                    onClick={() => { clickHeader(item.Id) }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center'
                                    }}>
                                        <b>{item.Header}</b>
                                        {item.SortOrder !== undefined ?
                                            item.SortOrder === "desc" ?
                                                <ArrowDropDownCircleIcon /> :
                                                <ArrowCircleUpIcon /> :
                                            null
                                        }
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item, i) => (
                            <TableRow key={i} >

                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                    {item.RollNo}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                    {item.StudentName}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }} >
                                    {item.EditStatus === "1" ? (
                                        <Tooltip title={"Edit Done"}>
                                            <EditTwoTone onClick={() => clickEdit(item.Id)}
                                                sx={{
                                                    color: '#223354',
                                                    '&:hover': {
                                                        bgcolor: 'grey.300'
                                                    }
                                                }}
                                            />

                                        </Tooltip>
                                    ) : (
                                        <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }} >
                                            {
                                                item.EditStatus === "2" ? <Tooltip title={"Edit Not Done"}>
                                                    <EditTwoTone onClick={() => clickEdit(item.Id)}
                                                        sx={{
                                                            color: '#223354',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300'
                                                            }
                                                        }}
                                                    />

                                                </Tooltip> : <span></span>
                                            }
                                        </TableCell>

                                    )
                                    }
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                    {item.ShowDeleteButton === "0" ? (
                                        <span></span>
                                    ) : <Tooltip title={"Delete"}>
                                        <DeleteForeverIcon onClick={() => clickDelete(item.Id)}
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
        </>
    );
}

export default StudentwiseProgressreportList;
