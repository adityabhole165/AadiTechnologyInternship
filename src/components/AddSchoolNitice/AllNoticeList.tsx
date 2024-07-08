// import AddTwoTone from '@mui/icons-material/AddTwoTone';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/EditOutlined';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import SaveIcon from '@mui/icons-material/Save';
// import { Box, Button, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { green, grey, yellow } from '@mui/material/colors';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
// import { AppThunk, RootState } from 'src/store';
// import CommonPageHeader from '../CommonPageHeader';
// import { IGetAllNoticeListBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
// import { CDAGetAllNoticeList } from 'src/requests/AddSchoolNotice/ReqAddSchoolNotice';
// interface Column {
//     id: 'name' | 'Display_Location' | 'StartDateTime' | 'EndDateTime' | 'sortOrder' | 'fileName' | 'select' | 'edit' | 'delete';
//     label: string;
//     minWidth?: number;
//     align?: 'right';
//     format?: (value: number) => string;
// }

// const dispatch = useDispatch();


// const USGetAllNoticeList: any = useSelector((state: RootState) => state.AddSchoolNotice.ISGetAllNoticeList);
//   console.log(USGetAllNoticeList,"USGetAllNoticeList");
  
//   console.log("USGetAllNoticeLista;odkpoADPOqdopKPADP");
  
// const GetAllNoticeListBody: IGetAllNoticeListBody =
// {
//     "asSchoolId": 18,
//     "asDisplayLocation": "A",
//     "asShowAllNotices": true,
//     "asText": false,
//     "asSortExpression": "StartDate desc",
//     "StartRowIndex": 0,
//     "MaximumRows": 20
// }


// useEffect(() => {
//     dispatch(CDAGetAllNoticeList(GetAllNoticeListBody));
// }, []);



// const columns: readonly Column[] = [
//     { id: 'name', label: 'Link Name', minWidth: 170 },
//     { id: 'Display_Location', label: 'Display Location', minWidth: 150 },
//     {
//         id: 'StartDateTime',
//         label: 'Start Date & Time',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'EndDateTime',
//         label: 'End Date & Time',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'sortOrder',
//         label: 'Sort Order',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toFixed(2),
//     },
//     {
//         id: 'fileName',
//         label: 'File Name',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toFixed(2),
//     },
//     {
//         id: 'select',
//         label: 'Select',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toFixed(2),
//     },
//     {
//         id: 'edit',
//         label: 'Edit',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toFixed(2),
//     },
//     {
//         id: 'delete',
//         label: 'Delete',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toFixed(2),
//     },
// ];

// interface Data {
//     name: string;
//     Display_Location: string;
//     StartDateTime: number;
//     EndDateTime: number;
//     sortOrder: number;
//     select: boolean;
//     Edit: any;
//     delete: any;
// }

// // function createData(
// //     name: string,
// //     code: string,
// //     population: number,
// //     size: number,
// // ): Data {
// //     const density = population / size;
// //     return { name, code, population, size, density };
// // }

// const rows = [
//     {
//         name: "ok",
//         display: "Both",
//         startdate: "22/02/2024",
//         enddate: "23/02/2024",
//         sort: 1,
//         fileName: "File Name...",
//         select: <input type='checkbox' style={{ height: "20px", width: "20px" }} />,
//         edit: <EditIcon />,
//         delete: <DeleteForeverIcon />
//     },
//     {
//         name: "ok",
//         display: "Both",
//         startdate: "22/02/2024",
//         enddate: "23/02/2024",
//         sort: 1,
//         fileName: "File Name...",
//         select: <input type='checkbox' style={{ height: "20px", width: "20px" }} />,
//         edit: <EditIcon />,
//         delete: <DeleteForeverIcon />
//     },
//     {
//         name: "ok",
//         display: "Both",
//         startdate: "22/02/2024",
//         enddate: "23/02/2024",
//         sort: 1,
//         fileName: "File Name...",
//         select: <input type='checkbox' style={{ height: "20px", width: "20px" }} />,
//         edit: <EditIcon />,
//         delete: <DeleteForeverIcon />
//     },
//     {
//         name: "ok",
//         display: "Both",
//         startdate: "22/02/2024",
//         enddate: "23/02/2024",
//         sort: 1,
//         fileName: "File Name...",
//         select: <input type='checkbox' style={{ height: "20px", width: "20px" }} />,
//         edit: <EditIcon />,
//         delete: <DeleteForeverIcon />
//     }
// ];

// export default function AllNoticeList() {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [value, setValue] = useState('1');


//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     // const getAllSchoolNotice = useSelector(
//     // (state.RootState) => state.Schoolnotice.AllSchoolNoticeList
//     // );

//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setValue((event.target as HTMLInputElement).value);
//     };

//     // Searchable DropDown Content
//     const itemList = [
//         { Value: '1', Name: 'All' },
//         { Value: '2', Name: 'Both' },
//         { Value: '3', Name: 'Control Panel' },
//         { Value: '4', Name: 'Home Page' },
//         // aur options yahan add karen
//     ];

//     const handleDropDownChange = (value: string) => {
//         console.log('Selected Value:', value);
//     };
//     // Searchable DropDown Content


//     useEffect(() => {


//     }, [])

//     return (
//         <>

//             <Box sx={{ px: 2 }}>
//                 <CommonPageHeader
//                     navLinks={[
//                         {
//                             title: 'School Notice',
//                             path: '/extended-sidebar/Teacher/AllSchoolNotice'
//                         },
//                         // { title: 'Add Homework', path: '/extended-sidebar/Teacher/AddHomework' },
//                     ]}
//                     rightActions={
//                         <>
//                             <Box>
//                                 <SearchableDropdown
//                                     ItemList={itemList}
//                                     onChange={handleDropDownChange}
//                                     label="Select Display Location"
//                                     mandatory={true}
//                                     size={"small"}
//                                     sx={{ minWidth: '17vw', }}
//                                 />
//                             </Box>
//                             <Box>
//                                 <Tooltip title={`These events may change due to unavoidable reasons without prior notice.`}>
//                                     <IconButton
//                                         sx={{
//                                             color: 'white',
//                                             backgroundColor: yellow[600],
//                                             height: '36px !important',
//                                             ':hover': { backgroundColor: yellow[700] }
//                                         }}
//                                     // onClick={ClickOpenDialogbox}
//                                     >
//                                         <PriorityHighIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                             </Box>

//                             <Box>
//                                 <Tooltip
//                                     title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
//                                 >
//                                     <IconButton
//                                         sx={{
//                                             color: 'white',
//                                             backgroundColor: grey[500],
//                                             height: '36px !important',
//                                             ':hover': { backgroundColor: grey[600] }
//                                         }}
//                                     >
//                                         <QuestionMarkIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                             </Box>

//                             <Box>
//                                 <Tooltip title={'Add New Notice'}>
//                                     <IconButton
//                                         onClick={() => navigate('/extended-sidebar/Teacher/AddSchoolNotice1')}
//                                         sx={{
//                                             color: 'white',
//                                             backgroundColor: green[500],
//                                             '&:hover': {
//                                                 backgroundColor: green[600]
//                                             }
//                                         }}
//                                     >
//                                         <AddTwoTone />
//                                     </IconButton>
//                                 </Tooltip>
//                             </Box>
//                             <Box>
//                                 <Tooltip title={`Save Notice`}>
//                                     <IconButton
//                                         sx={{
//                                             color: 'white',
//                                             backgroundColor: green[500],
//                                             height: '36px !important',
//                                             ':hover': { backgroundColor: green[600] }
//                                         }}

//                                     >
//                                         <SaveIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                             </Box>
//                         </>
//                     }
//                 />

//             </Box>
//             <Grid container>
//                 <Grid sm={12} px={2} sx={{ display: 'flex', justifyItems: "center" }} >
//                     {/* <Grid sm={5} sx={{ display: "flex", alignItems: "center" }}>
//                         <Grid mr={2}>
//                             <Typography variant='h5' >Display Location : </Typography>
//                         </Grid>
//                         <Grid item sm={8}>
//                             <FormControl fullWidth>
//                                 <InputLabel>Display Location</InputLabel>
//                                 <Select
//                                 // value={displayLocation}
//                                 // onChange={(e) => setDisplayLocation(e.target.value)}
//                                 >
//                                     <MenuItem value="Location 1">All</MenuItem>
//                                     <MenuItem value="Location 2">Both</MenuItem>
//                                     <MenuItem value="Location 3">Control Panel</MenuItem>
//                                     <MenuItem value="Location 4">Home Page</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid> */}
//                     <Grid >
//                         <FormControl component="fieldset">
//                             {/* <FormLabel component="legend">Choose an option</FormLabel> */}
//                             <RadioGroup
//                                 row
//                                 aria-label="options"
//                                 name="options"
//                                 value={value}
//                                 onChange={handleChange}
//                             >
//                                 <FormControlLabel value="AllFile" control={<Radio />} label="Show All Notices" />
//                                 <FormControlLabel value="Activefile" control={<Radio />} label="Show Active Notices" />
//                             </RadioGroup>
//                         </FormControl>
//                     </Grid>

//                 </Grid>
//             </Grid >
//             <Box m={2}>
//                 <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                     <TableContainer sx={{ maxHeight: 700 }}>
//                         <Table stickyHeader aria-label="sticky table">
//                             <TableHead>
//                                 <TableRow>
//                                     {columns.map((column) => (
//                                         <TableCell
//                                             align='center'
//                                             key={column.id}
//                                             style={{ minWidth: column.minWidth, backgroundColor: '#19bed4', color: "#fff", fontSize: 15, fontWeight: '600' }}
//                                         >
//                                             {column.label}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {rows
//                                     // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row) => {
//                                         return (
//                                             <TableRow hover role="checkbox">
//                                                 <TableCell align='center'>{row.name}</TableCell>
//                                                 <TableCell align='center'>{row.display}</TableCell>
//                                                 <TableCell align='center'>{row.startdate}</TableCell>
//                                                 <TableCell align='center'>{row.enddate}</TableCell>
//                                                 <TableCell align='center'>{row.sort}</TableCell>
//                                                 <TableCell align='center' sx={{ color: "#0000EE" }}>{row.fileName}</TableCell>
//                                                 <TableCell align='center'>{row.select}</TableCell>
//                                                 <TableCell align='center'><Tooltip title='Edit'><Button style={{ border: '0px', }} >{row.edit}</Button></Tooltip></TableCell>
//                                                 <TableCell align='center'><Tooltip title='Delete'><Button sx={{ ':hover': { color: "red", } }}>{row.delete}</Button></Tooltip></TableCell>
//                                             </TableRow>
//                                         );
//                                     })}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 100]}
//                         component="div"
//                         count={rows.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Paper>
//             </Box>

//         </>

       
//     );
// }

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllNoticeListBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { CDAGetAllNoticeList } from 'src/requests/AddSchoolNotice/ReqAddSchoolNotice';
import { RootState } from 'src/store';

const AllNoticeList = () => {

    const dispatch = useDispatch();


const USGetAllNoticeList: any = useSelector((state: RootState) => state.AddSchoolNotice.ISGetAllNoticeList);
  console.log(USGetAllNoticeList,"USGetAllNoticeList");
  
  console.log("USGetAllNoticeLista;odkpoADPOqdopKPADP");
  
const GetAllNoticeListBody: IGetAllNoticeListBody =
{
    "asSchoolId": 18,
    "asDisplayLocation": "A",
    "asShowAllNotices": true,
    "asText": false,
    "asSortExpression": "StartDate desc",
    "StartRowIndex": 0,
    "MaximumRows": 20
}


useEffect(() => {
    dispatch(CDAGetAllNoticeList(GetAllNoticeListBody));
}, []);



  return (
    <div>AllNoticeList</div>
  )
}

export default AllNoticeList


