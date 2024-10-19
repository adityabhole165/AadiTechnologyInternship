// import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import { Box, CircularProgress, Grid, IconButton, Link, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
// import { grey, yellow } from '@mui/material/colors';
// import format from 'date-fns/format';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Styles } from 'src/assets/style/student-style';
// import CommonPageHeader from 'src/components/CommonPageHeader';
// import { IMobileNumber, INewSmsList } from 'src/interfaces/Student/SMSCenter';
// import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
// import { getMobileNumber, getNewSmsList } from 'src/requests/Student/SMSCenter';
// import { RootState } from 'src/store';

// const PageSize = 20;

// function ReceivedSMSOwn() {
//     const [dateFilter, setDateFilter] = useState<{ startDate: Date | null; endDate: Date | null }>({
//         startDate: null,
//         endDate: null,
//     });
//     const classes = Styles();
//     const [filtered, setFiltered] = useState(false); // State to toggle between original and filtered list
//     const dispatch = useDispatch();
//     const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
//     const NewSmsList = useSelector((state: RootState) => state.SmsCenter.NewSmsList);
//     const loading = useSelector((state: RootState) => state.SmsCenter.Loading);
//     const MobileNumber = useSelector((state: RootState) => state.SmsCenter.MobileNumber);
//     const [page, setPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(20);
//     const rowsPerPageOptions = [20, 50, 100, 200];
//     const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
//     const asSchoolId = localStorage.getItem('localSchoolId');
//     const UserId = sessionStorage.getItem('Id');
//     const RoleId = sessionStorage.getItem('RoleId');
//     const [SortDirection, setSortDirection] = useState('DESC')
//     const filteredList = NewSmsList.filter((item) => item.TotalRows !== undefined);
//     const TotalCount = filteredList.map((item) => item.TotalRows);
//     const uniqueTotalCount = [...new Set(TotalCount)];
//     const singleTotalCount = uniqueTotalCount[0];
//     useEffect(() => {
//         const MobileNumber_body: IMobileNumber = {
//             asSchoolId: asSchoolId,
//             asAcademicYearId: asAcademicYearId,
//             asUserId: UserId,
//             asUserRoleId: RoleId,
//         };

//         localStorage.setItem('url', window.location.pathname);
//         dispatch(getMobileNumber(MobileNumber_body));
//     }, []);

//     // const sortedAndFilteredSmsList = NewSmsList
//     //     .filter(item => {
//     //         if (!dateFilter.startDate && !dateFilter.endDate) return true;
//     //         const itemDate = new Date(item.Date); // Assuming item.Date is in a parseable format
//     //         if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
//     //         if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
//     //         return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
//     //     })
//     //     .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
//     const [SortBy, setSortBy] = useState('Date');
//     const sortedAndFilteredSmsList = NewSmsList
//         .filter(item => {
//             if (!dateFilter.startDate && !dateFilter.endDate) return true;
//             const itemDate = new Date(item.Date); // Assuming item.Date is in a parseable format
//             if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
//             if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
//             return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
//         })
//         .sort((a, b) => {
//             let comparison = 0;

//             if (SortBy === 'Date') {
//                 comparison = new Date(a.Date).getTime() - new Date(b.Date).getTime();
//             } else if (SortBy === 'UserName') {
//                 comparison = a.UserName.localeCompare(b.UserName);
//             } else if (SortBy === 'Subject') {
//                 comparison = a.Subject.localeCompare(b.Subject);
//             }

//             return SortDirection === 'asc' ? comparison : -comparison;
//         });


//     const handleStartDateChange = (date: Date | null) => {
//         setDateFilter(prevState => ({ ...prevState, startDate: date }));
//     };

//     const handleEndDateChange = (date: Date | null) => {
//         setDateFilter(prevState => ({ ...prevState, endDate: date }));
//     };

//     const SmsNewList_body: INewSmsList = {
//         asSchoolId: asSchoolId,
//         asAcademicYearId: asAcademicYearId,
//         asUserId: UserId,
//         asReceiverUserRoleId: RoleId,
//         asStartIndex: (page - 1) * rowsPerPage,
//         asPageSize: page * rowsPerPage
//     };

//     const startRecord = (page - 1) * rowsPerPage + 1;
//     const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
//     const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

//     const ChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(1);
//     };

//     const PageChange = (pageNumber) => {
//         setPage(pageNumber);
//     };
//     useEffect(() => {
//         dispatch(getNewSmsList(SmsNewList_body))
//     }, [page, rowsPerPage]);

//     const handleFilterClick = () => {
//         setFiltered(!filtered); // Toggle the filtered state
//         setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc')); // Toggle sort direction
//     };

//     const displayList = filtered ? sortedAndFilteredSmsList : NewSmsList; // Implement pagination
//     let url = "/extended-sidebar/Student/viewsms/"
//     return (
//         <Box sx={{ px: 2 }}>
//             <CommonPageHeader
//                 navLinks={[
//                     {
//                         title: 'SMS Center',
//                         path: '/extended-sidebar/Student/SmsCenter',
//                     },
//                 ]}
//                 rightActions={
//                     <>
//                         <Box>
//                             <Tooltip
//                                 title={
//                                     'School SMS will be sent to below listed number(s). To add/update the number, please send the information to admin staff via message center.'
//                                 }
//                             >
//                                 <IconButton
//                                     sx={{
//                                         color: 'white',
//                                         backgroundColor: yellow[700],
//                                         height: '36px !important',
//                                         ':hover': { backgroundColor: yellow[800] },
//                                     }}
//                                 >
//                                     <PriorityHighIcon />
//                                 </IconButton>
//                             </Tooltip>
//                         </Box>
//                         <Box>
//                             <Tooltip title={`Displays received SMS list.`}>
//                                 <IconButton
//                                     sx={{
//                                         color: 'white',
//                                         backgroundColor: grey[500],
//                                         height: '36px !important',
//                                         ':hover': { backgroundColor: grey[600] },
//                                     }}
//                                 >
//                                     <QuestionMarkIcon />
//                                 </IconButton>
//                             </Tooltip>
//                         </Box>
//                     </>
//                 }
//             />

//             <Box>
//                 <Grid container >

//                     <Grid item sx={{ minWidth: '100%', p: 2, background: 'white' }}>
//                         <Typography variant={'h4'} fontWeight={800} textAlign={'center'} pt={1}>Mobile Number(s) : {MobileNumber.replace(';', ', ')}</Typography>
//                         <Box sx={{ mt: 2 }}>
//                             {loading ? (
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                     <CircularProgress />
//                                 </Box>
//                             ) : displayList.length > 0 ? (
//                                 <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
//                                     <TableHead>
//                                         <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
//                                             <TableCell sx={{ color: 'white' }}><b onClick={handleFilterClick} style={{ cursor: 'pointer' }}>
//                                                 From </b></TableCell>
//                                             <TableCell sx={{ color: 'white' }}><b onClick={handleFilterClick} style={{ cursor: 'pointer' }}>
//                                                 SMS Text</b></TableCell>
//                                             <TableCell sx={{ color: 'white' }}>
//                                                 <b onClick={handleFilterClick} style={{ cursor: 'pointer' }}>
//                                                     Received Date {SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />}
//                                                 </b>
//                                             </TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {displayList.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell>{row.UserName}</TableCell>
//                                                 <TableCell>   <Link href={url + row.SMS_Id}>
//                                                     {row.Subject}
//                                                 </Link></TableCell>
//                                                 <TableCell>{format(new Date(row.Date), 'dd/MM/yyyy')}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             ) : (
//                                 <Typography
//                                     variant="body1"
//                                     sx={{
//                                         textAlign: 'center',
//                                         marginTop: 4,
//                                         backgroundColor: '#324b84',
//                                         padding: 1,
//                                         borderRadius: 2,
//                                         color: 'white',
//                                     }}
//                                 >
//                                     <b>No record found.</b>
//                                 </Typography>
//                             )}
//                         </Box>
//                         <Box mt={1}>
//                             {
//                                 endRecord > 19 ? (
//                                     <ButtonGroupComponent
//                                         rowsPerPage={rowsPerPage}
//                                         ChangeRowsPerPage={ChangeRowsPerPage}
//                                         rowsPerPageOptions={rowsPerPageOptions}
//                                         PageChange={PageChange}
//                                         pagecount={pagecount}
//                                     />

//                                 ) : (
//                                     <span></span>

//                                 )
//                             }</Box>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Box>
//     );
// }

// export default ReceivedSMSOwn;

import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, CircularProgress, Grid, IconButton, Link, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { IMobileNumber, INewSmsList } from 'src/interfaces/Student/SMSCenter';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { getMobileNumber, getNewSmsList } from 'src/requests/Student/SMSCenter';
import { RootState } from 'src/store';

const PageSize = 20;

function ReceivedSMSOwn() {
    const [dateFilter, setDateFilter] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });
    const classes = Styles();
    const [filtered, setFiltered] = useState(false);
    const dispatch = useDispatch();
    const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
    const NewSmsList = useSelector((state: RootState) => state.SmsCenter.NewSmsList);
    const loading = useSelector((state: RootState) => state.SmsCenter.Loading);
    const MobileNumber = useSelector((state: RootState) => state.SmsCenter.MobileNumber);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const UserId = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');
    const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [SortBy, setSortBy] = useState('Date'); // Track which column is being sorted
    const filteredList = NewSmsList.filter((item) => item.TotalRows !== undefined);
    const TotalCount = filteredList.map((item) => item.TotalRows);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];

    useEffect(() => {
        const MobileNumber_body: IMobileNumber = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asUserId: UserId,
            asUserRoleId: RoleId,
        };

        localStorage.setItem('url', window.location.pathname);
        dispatch(getMobileNumber(MobileNumber_body));
    }, []);

    // Sorting and Filtering
    const sortedAndFilteredSmsList = NewSmsList
        .filter(item => {
            if (!dateFilter.startDate && !dateFilter.endDate) return true;
            const itemDate = new Date(item.Date);
            if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
            if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
            return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
        })
        .sort((a, b) => {
            let comparison = 0;
            if (SortBy === 'Date') {
                comparison = new Date(a.Date).getTime() - new Date(b.Date).getTime();
            } else if (SortBy === 'UserName') {
                comparison = a.UserName.localeCompare(b.UserName);
            } else if (SortBy === 'Subject') {
                comparison = a.Subject.localeCompare(b.Subject);
            }
            return SortDirection === 'asc' ? comparison : -comparison;
        });

    const handleSortChange = (column: string) => {
        if (SortBy === column) {
            // If the same column is clicked, toggle the sort direction
            setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If a new column is clicked, set it as the sort by column and reset direction to ascending
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        setDateFilter(prevState => ({ ...prevState, startDate: date }));
    };

    const handleEndDateChange = (date: Date | null) => {
        setDateFilter(prevState => ({ ...prevState, endDate: date }));
    };

    const SmsNewList_body: INewSmsList = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: UserId,
        asReceiverUserRoleId: RoleId,
        asStartIndex: (page - 1) * rowsPerPage,
        asPageSize: page * rowsPerPage,
    };

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getNewSmsList(SmsNewList_body));
    }, [page, rowsPerPage]);

    const displayList = sortedAndFilteredSmsList; // Implement pagination
    let url = '/extended-sidebar/Student/viewsms/';

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'SMS Center',
                        path: '/extended-sidebar/Student/SmsCenter',
                    },
                ]}
                rightActions={
                    <>
                        <Box>
                            <Tooltip
                                title={
                                    'School SMS will be sent to below listed number(s). To add/update the number, please send the information to admin staff via message center.'
                                }
                            >
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: yellow[700],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: yellow[800] },
                                    }}
                                >
                                    <PriorityHighIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={`Displays received SMS list.`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] },
                                    }}
                                >
                                    <QuestionMarkIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                }
            />

            <Box>
                <Grid container>
                    <Grid item sx={{ minWidth: '100%', p: 2, background: 'white' }}>
                        <Typography variant={'h4'} fontWeight={800} textAlign={'center'} pt={1}>
                            Mobile Number(s) : {MobileNumber.replace(';', ', ')}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            ) : displayList.length > 0 ? (
                                <Table
                                    aria-label="simple table"
                                    sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}
                                >
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                background: (theme) => theme.palette.secondary.main,
                                                color: (theme) => theme.palette.common.white,
                                            }}
                                        >
                                            <TableCell sx={{ color: 'white' }}>
                                                <b onClick={() => handleSortChange('UserName')} style={{ cursor: 'pointer' }}>
                                                    From {SortBy === 'UserName' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                                </b>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white' }}>
                                                <b onClick={() => handleSortChange('Subject')} style={{ cursor: 'pointer' }}>
                                                    SMS Text {SortBy === 'Subject' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                                </b>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white' }}>
                                                <b onClick={() => handleSortChange('Date')} style={{ cursor: 'pointer' }}>
                                                    Received Date {SortBy === 'Date' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                                </b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayList.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.UserName}</TableCell>
                                                <TableCell>
                                                    <Link href={url + row.SMS_Id}>{row.Subject}</Link>
                                                </TableCell>
                                                <TableCell>{format(new Date(row.Date), 'dd/MM/yyyy')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textAlign: 'center',
                                        marginTop: 4,
                                        backgroundColor: '#324b84',
                                        padding: 1,
                                        borderRadius: 2,
                                        color: 'white',
                                    }}
                                >
                                    <b>No record found.</b>
                                </Typography>
                            )}
                        </Box>
                        <Box mt={1}>
                            {endRecord > 19 ? (
                                <ButtonGroupComponent
                                    rowsPerPage={rowsPerPage}
                                    ChangeRowsPerPage={ChangeRowsPerPage}
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    PageChange={PageChange}
                                    pagecount={pagecount}
                                />
                            ) : (
                                <span></span>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ReceivedSMSOwn;
