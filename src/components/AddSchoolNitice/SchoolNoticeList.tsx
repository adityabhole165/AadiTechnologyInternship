import { EditTwoTone } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

function SchoolNoticeList({
    ItemList,
    clickEdit,
    HeaderArray,
    toggleRowSelection,
    ClickHeader,
    clickDelete,
}) {

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

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
    }
    let url = localStorage.getItem("SiteURL") + "/RITeSchool/downloads/School Notices/"
    let isFileType = false
    HeaderArray.map((item) => {
        if (item.Id == 6) {
            isFileType = true
        }
    })
    return (
        <div >
            {ItemList.length === 0 ? (
                <Box sx={{ backgroundColor: '#D2FDFC' }}>

                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No record found.
                    </Typography>
                </Box>
            ) : (

                <>

                    <TableContainer component={Box}>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead sx={{overflow:'auto'}}>
                                <TableRow
                                    sx={{ background: (theme) => theme.palette.secondary.main }}
                                >
                                    {HeaderArray.map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                color: (theme) => theme.palette.common.white,
                                                textAlign: [1].includes(i) ? 'left' : [2, 3, 4, 6].includes(i) ? 'left' : 'center', pt:1.5, pb:1.5

                                            }}
                                            onClick={item.Id !== 7 && item.Id !== 8 && item.Id !== 9 ? () => clickHeader(item.Id) : null}

                                        >
                                            <Box sx={{display:'flex', gap:0.5}}>
                                            <b>{item.Header}</b>
                                            {item.SortOrder !== null && item.Id !== 7 && item.Id !== 8 && item.Id !== 9 ?
                                                item.SortOrder === "desc" ? <ArrowDropDownCircleIcon/> : <ArrowCircleUpIcon />
                                                : null
                                            }
                                            </Box>
                                        </TableCell>
                                    ))} <span></span>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList.map((item, index) => {

                                    return (
                                        <TableRow key={index} >
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '220px', py:1
                                                }}
                                                align="left"
                                            >
                                                {item.Text1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '220px', py:1
                                                }}
                                                align="left"
                                            >
                                                {item.Text4}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '300px', py:1
                                                }}
                                                align="left"
                                            >
                                                {moment(item.Text2).format('DD MMM YYYY   h:mm A')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '300px', py:1
                                                }}
                                                align="left"
                                            >
                                                {moment(item.Text3).format('DD MMM YYYY   h:mm A')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '150px', py:1
                                                }}
                                                align="center"
                                            >
                                                {item.Text5}
                                            </TableCell>
                                            {isFileType &&

                                                <TableCell sx={{ textTransform: 'capitalize', width: '250px', py:1 }} align="left">

                                                    <Link href={url + item.Text6} style={{ textDecoration: 'underline' }}>
                                                        {item.Text6}
                                                    </Link>
                                                </TableCell>
                                            }
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', py:1
                                                }}
                                                align="center"
                                            >
                                                <Tooltip title="Select notice to display under School Notices.">
                                                    <input
                                                        type="checkbox"
                                                        style={{ height: '18px', width: '18px' }}
                                                        checked={item.IsActive}
                                                        onChange={() => toggleRowSelection(item.Id)}
                                                    /></Tooltip>
                                            </TableCell>
                                            <TableCell align="center" sx={{
                                                py:1
                                            }}>
                                                <Tooltip title={"Edit"}>
                                                    <IconButton
                                                        onClick={() => clickEdit(item.Id)}
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
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    opacity: 1, py:1
                                                }}
                                                align="center"
                                            >
                                                <IconButton
                                                    sx={{
                                                        color: '#223354',
                                                        '&:hover': {
                                                            color: 'red',
                                                            backgroundColor: red[100]
                                                        }
                                                    }}

                                                    onClick={() => clickDelete(item.Id,item.Text2,item.Text3)}
                                                >
                                                    <Tooltip title="Delete" >
                                                        <DeleteForeverIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )
            }
        </div >
    );
}

export default SchoolNoticeList;
