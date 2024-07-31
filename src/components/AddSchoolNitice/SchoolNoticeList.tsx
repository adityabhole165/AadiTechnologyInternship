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
    let url = localStorage.getItem("SiteURL") + "RITeSchool/downloads/School Notices/"
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
                            <TableHead>
                                <TableRow
                                    sx={{ background: (theme) => theme.palette.secondary.main }}
                                >
                                    {HeaderArray.map((item, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                color: (theme) => theme.palette.common.white, py:1,
                                                textAlign: [1].includes(i) ? 'left' : [2,3, 4,6].includes(i) ? 'center' : 'left'
                                            }}
                                            onClick={item.Id == 3 ? () => clickHeader(item.Id) : null}
                                            
                                        >
                                            <b>{item.Header}</b>
                                            {item.SortOrder !== null && item.Id == 3 ?
                                                item.SortOrder === "desc" ? <ArrowDropDownCircleIcon /> : <ArrowCircleUpIcon />
                                                : null
                                            }
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
                                                    textTransform: 'capitalize', width: '250px', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="left"
                                            >
                                                {item.Text1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '150px', wordWrap: 'break-word', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="left"
                                            >
                                                {item.Text4}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '300px', wordWrap: 'break-word', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {moment(item.Text2).format('DD MMM YYYY   h:mm a')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '300px', wordWrap: 'break-word', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {moment(item.Text3).format('DD MMM YYYY   h:mm a')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', width: '100px', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >
                                                {item.Text5}
                                            </TableCell>
                                            {isFileType &&

                                                <TableCell sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="left">
                                                    
                                                    <Link href={url + item.Text6} style={{ textDecoration: 'underline' }}>
                                                        {item.Text6}
                                                    </Link>
                                                </TableCell>
                                            }
                                            <TableCell
                                                sx={{
                                                    textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px'
                                                }}
                                                align="center"
                                            >

                                                <input
                                                    type="checkbox"
                                                    style={{ height: '18px', width: '18px' }}
                                                    checked={item.IsActive}
                                                    onChange={() => toggleRowSelection(item.Id)}
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{
                                                paddingTop: '2.5px', paddingBottom: '2.5px'
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
                                                    opacity: 1, paddingTop: '2.5px', paddingBottom: '2.5px'
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

                                                    onClick={() => clickDelete(item.Id)}
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
