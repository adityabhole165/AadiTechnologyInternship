// // // // import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// // // // import {
// // // //     Box,
// // // //     IconButton,
// // // //     Paper,
// // // //     Table,
// // // //     TableBody,
// // // //     TableCell,
// // // //     TableContainer,
// // // //     TableHead,
// // // //     TableRow,
// // // //     Tooltip,
// // // //     Typography
// // // // } from '@mui/material';
// // // // import { grey } from '@mui/material/colors';
// // // // import { useEffect, useState } from 'react';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
// // // // import Dropdown from 'src/libraries/dropdown/Dropdown';
// // // // import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
// // // // import { RootState } from 'src/store';
// // // // import CommonPageHeader from '../CommonPageHeader';

// // // // const TExamScheduleNew = () => {
// // // //     const dispatch = useDispatch();

// // // //     const getstandard = useSelector(
// // // //         (state: RootState) => state.StandardAndExamList.SelectStandard
// // // //     );
// // // //     const getExamlist = useSelector(
// // // //         (state: RootState) => state.StandardAndExamList.ExamData
// // // //     );

// // // //     const SubList = useSelector(
// // // //         (state: RootState) => state.StandardAndExamList.VeiwAllData
// // // //     );
// // // //     const loading = useSelector(
// // // //         (state: RootState) => state.StandardAndExamList.Loading
// // // //     );

// // // //     const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
// // // //     const asSchoolId = localStorage.getItem('localSchoolId');
// // // //     const RoleId = sessionStorage.getItem('RoleId');
// // // //     const asStandardId = sessionStorage.getItem('StandardId');

// // // //     const [std, setStd] = useState('0');
// // // //     const [expandedCardIndex, setExpandedCardIndex] = useState(null);

// // // //     const getstandardList_body = {
// // // //         asAcademicYearId: asAcademicYearId,
// // // //         asSchoolId: asSchoolId
// // // //     };

// // // //     const ExamList_body = {
// // // //         asSchoolId: asSchoolId,
// // // //         asAcademicYearId: asAcademicYearId,
// // // //         asStandardId: std
// // // //     };

// // // //     useEffect(() => {
// // // //         dispatch(GetSelectStandardRes(getstandardList_body));
// // // //         if (RoleId === '3') {
// // // //             setStd(asStandardId);
// // // //         }
// // // //     }, []);

// // // //     const stdChange = (value) => {
// // // //         setStd(value);
// // // //         setExpandedCardIndex(0); // Open the first accordion when a standard is selected
// // // //     };

// // // //     useEffect(() => {
// // // //         if (std !== '') {
// // // //             dispatch(ViewExamDataRess(ExamList_body));
// // // //         }
// // // //     }, [std]);

// // // //     useEffect(() => {
// // // //         if (getstandard.length > 0) {
// // // //             setStd(getstandard[0].id);
// // // //             setExpandedCardIndex(0); // Open the first accordion by default
// // // //         }
// // // //     }, [getstandard]);

// // // //     const getTime = (startTime, endTime) => {
// // // //         const formatTime = (time) => {
// // // //             const [hours, minutes] = time.split(':');
// // // //             let period = 'AM';
// // // //             let adjustedHours = parseInt(hours, 10);

// // // //             if (adjustedHours >= 12) {
// // // //                 period = 'PM';
// // // //                 adjustedHours -= 12;
// // // //             }
// // // //             if (adjustedHours === 0) {
// // // //                 adjustedHours = 12;
// // // //             }

// // // //             return `${adjustedHours}:${minutes} ${period}`;
// // // //         };

// // // //         const formattedStartTime = formatTime(startTime);
// // // //         const formattedEndTime = formatTime(endTime);

// // // //         return `${formattedStartTime} - ${formattedEndTime}`;
// // // //     };

// // // //     const getDuration = (startTime, endTime) => {
// // // //         const [startHours, startMinutes] = startTime.split(':').map(Number);
// // // //         const [endHours, endMinutes] = endTime.split(':').map(Number);

// // // //         const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
// // // //         const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

// // // //         let diff = endDate.getTime() - startDate.getTime();

// // // //         if (diff < 0) {
// // // //             diff += 24 * 60 * 60 * 1000;
// // // //         }

// // // //         const hours = Math.floor(diff / (1000 * 60 * 60));
// // // //         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

// // // //         return `${hours}h ${minutes}m`;
// // // //     };

// // // //     const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

// // // //     const getExamName = () => {
// // // //         if (getExamlist && getExamlist.length > 0) {
// // // //             return getExamlist[0].Text1;
// // // //         }
// // // //         return '';
// // // //     };

// // // //     // Collecting instructions for each class
// // // //     const classInstructions = {};
// // // //     SubList.forEach((item) => {
// // // //         if (!classInstructions[item.Standard_Name]) {
// // // //             classInstructions[item.Standard_Name] = item.Instructions || '-';
// // // //         }
// // // //     });

// // // //     // Grouping SubList by date-time and examId
// // // //     const groupByDateTime = (list) => {
// // // //         const grouped = {};
// // // //         list.forEach((item) => {
// // // //             const key = `${item.text3}-${item.startTime}-${item.endTime}-${item.text1}`;
// // // //             if (!grouped[key]) {
// // // //                 grouped[key] = [];
// // // //             }
// // // //             grouped[key].push(item);
// // // //         });
// // // //         return grouped;
// // // //     };

// // // //     const groupedSubList = groupByDateTime(SubList);

// // // //     return (
// // // //         <Box sx={{ px: 2 }}>
// // // //             <CommonPageHeader
// // // //                 navLinks={[
// // // //                     {
// // // //                         title: 'Exam Schedule',
// // // //                         path: ''
// // // //                     }
// // // //                 ]}
// // // //                 rightActions={
// // // //                     <>
// // // //                         <Box sx={{ width: '200px', mr: 2 }}>
// // // //                             {RoleId !== '3' && (
// // // //                                 <Dropdown
// // // //                                     Array={getstandard}
// // // //                                     handleChange={stdChange}
// // // //                                     label={'Select Standard'}
// // // //                                     size={'small'}
// // // //                                     variant="outlined"
// // // //                                     defaultValue={std}
// // // //                                 />
// // // //                             )}
// // // //                         </Box>
// // // //                         <Box>
// // // //                             <Tooltip title="Examination Schedule for your class.">
// // // //                                 <IconButton sx={{
// // // //                                     color: 'white',
// // // //                                     backgroundColor: grey[500],
// // // //                                     '&:hover': {
// // // //                                         backgroundColor: grey[600]
// // // //                                     }
// // // //                                 }}>
// // // //                                     <QuestionMarkIcon />
// // // //                                 </IconButton>
// // // //                             </Tooltip>
// // // //                         </Box>
// // // //                     </>
// // // //                 }
// // // //             />

// // // //             {getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
// // // //                 <Box key={index}>
// // // //                     <Box
// // // //                         sx={{
// // // //                             mt: 2,
// // // //                             cursor: 'pointer',
// // // //                             backgroundColor: '#FFC0CB',
// // // //                             padding: '7px',
// // // //                             border: '1px solid brown',
// // // //                             borderRadius: '3px',
// // // //                         }}
// // // //                         onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
// // // //                     >
// // // //                         <Typography variant="h6" sx={{ color: '#654321' }}>
// // // //                             <span style={{ margin: '0 5px' }}>  <b> {exam.Text1}</b></span>
// // // //                             <b>  {exam.Text3} To {exam.Text4}</b>
// // // //                         </Typography>
// // // //                     </Box>

// // // //                     {expandedCardIndex === index && (
// // // //                         <Box sx={{ background: 'white', p: 2, mt: 2 }}>
// // // //                             {loading ? (
// // // //                                 <SuspenseLoader />
// // // //                             ) : (
// // // //                                 <TableContainer component={Paper}>
// // // //                                     <Table>
// // // //                                         <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
// // // //                                             <TableRow>
// // // //                                                 <TableCell>Date</TableCell>
// // // //                                                 <TableCell>Time</TableCell>
// // // //                                                 <TableCell>Duration</TableCell>
// // // //                                                 {std === '0' && classList.map((className) => (
// // // //                                                     <TableCell key={className}>{className}</TableCell>
// // // //                                                 ))}
// // // //                                                 {std !== '0' && <TableCell>Subject</TableCell>}
// // // //                                                 {std !== '0' && <TableCell>Description</TableCell>}
// // // //                                             </TableRow>
// // // //                                         </TableHead>

// // // //                                         <TableBody>
// // // //                                             {Object.keys(groupedSubList).map((key, index) => {
// // // //                                                 const items = groupedSubList[key].filter(item => item.text1 === exam.Text2); // Filter by SchoolWise_Test_Id
// // // //                                                 const [date, startTime, endTime, examId] = key.split('-');
// // // //                                                 const uniqueDates = new Set();

// // // //                                                 return items.length > 0 ? (
// // // //                                                     <TableRow key={index}>
// // // //                                                         <TableCell>{uniqueDates.has(date) ? '' : date}</TableCell>
// // // //                                                         <TableCell>{getTime(startTime, endTime) || '-'}</TableCell>
// // // //                                                         <TableCell>{getDuration(startTime, endTime) || '-'}</TableCell>
// // // //                                                         {std === '0' ? (
// // // //                                                             classList.map((className) => (
// // // //                                                                 <TableCell key={`${className}-${index}`}>
// // // //                                                                     {items
// // // //                                                                         .filter((item) => item.Standard_Name === className)
// // // //                                                                         .map((item) => item.header || '-')
// // // //                                                                         .join('/ ') || '-'}
// // // //                                                                 </TableCell>
// // // //                                                             ))
// // // //                                                         ) : (
// // // //                                                             <>
// // // //                                                                 <TableCell>
// // // //                                                                     {items.map((item) => item.header || '-').join(',') || '-'}
// // // //                                                                 </TableCell>
// // // //                                                                 <TableCell>
// // // //                                                                     {items.map((item) => item.Description || '-').join(', ') || '-'}
// // // //                                                                 </TableCell>
// // // //                                                             </>
// // // //                                                         )}
// // // //                                                     </TableRow>
// // // //                                                 ) : null;
// // // //                                             })}
// // // //                                             <TableCell colSpan={3}>
// // // //                                                 <b>Instructions:</b>
// // // //                                             </TableCell>

// // // //                                             {std === '0' && SubList.some((item) => item.Standard_Name === getstandard.find(s => s.id === std)?.Standard_Name && item.SubjectName) && (
// // // //                                                 <TableRow>
// // // //                                                     {classList.map((className) => (
// // // //                                                         <TableCell key={className}>
// // // //                                                             <Typography variant="body2" sx={{ color: 'darkblue' }}>
// // // //                                                                 {classInstructions[className] || ''}
// // // //                                                             </Typography>
// // // //                                                         </TableCell>
// // // //                                                     ))}
// // // //                                                 </TableRow>
// // // //                                             )}
// // // //                                         </TableBody>
// // // //                                     </Table>
// // // //                                 </TableContainer>
// // // //                             )}
// // // //                         </Box>
// // // //                     )}
// // // //                 </Box>
// // // //             ))}

// // // //             {!loading && getExamlist.length === 0 && (
// // // //                 <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
// // // //                     <b>No exam has been scheduled.</b>
// // // //                 </Typography>
// // // //             )}
// // // //         </Box>
// // // //     );
// // // // };

// // // // export default TExamScheduleNew;



// // // import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// // // import {
// // //     Box,
// // //     IconButton,
// // //     Paper,
// // //     Table,
// // //     TableBody,
// // //     TableCell,
// // //     TableContainer,
// // //     TableHead,
// // //     TableRow,
// // //     Tooltip,
// // //     Typography
// // // } from '@mui/material';
// // // import { grey } from '@mui/material/colors';
// // // import { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
// // // import Dropdown from 'src/libraries/dropdown/Dropdown';
// // // import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
// // // import { RootState } from 'src/store';
// // // import CommonPageHeader from '../CommonPageHeader';

// // // const TExamScheduleNew = () => {
// // //     const dispatch = useDispatch();

// // //     const getstandard = useSelector(
// // //         (state: RootState) => state.StandardAndExamList.SelectStandard
// // //     );
// // //     const getExamlist = useSelector(
// // //         (state: RootState) => state.StandardAndExamList.ExamData
// // //     );

// // //     const SubList = useSelector(
// // //         (state: RootState) => state.StandardAndExamList.VeiwAllData
// // //     );
// // //     const loading = useSelector(
// // //         (state: RootState) => state.StandardAndExamList.Loading
// // //     );

// // //     const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
// // //     const asSchoolId = localStorage.getItem('localSchoolId');
// // //     const RoleId = sessionStorage.getItem('RoleId');
// // //     const asStandardId = sessionStorage.getItem('StandardId');

// // //     const [std, setStd] = useState('0');
// // //     const [expandedCardIndex, setExpandedCardIndex] = useState(null);

// // //     const getstandardList_body = {
// // //         asAcademicYearId: asAcademicYearId,
// // //         asSchoolId: asSchoolId
// // //     };

// // //     const ExamList_body = {
// // //         asSchoolId: asSchoolId,
// // //         asAcademicYearId: asAcademicYearId,
// // //         asStandardId: std
// // //     };

// // //     useEffect(() => {
// // //         dispatch(GetSelectStandardRes(getstandardList_body));
// // //         if (RoleId === '3') {
// // //             setStd(asStandardId);
// // //         }
// // //     }, []);

// // //     const stdChange = (value) => {
// // //         setStd(value);
// // //         setExpandedCardIndex(0);
// // //     };

// // //     useEffect(() => {
// // //         if (std !== '') {
// // //             dispatch(ViewExamDataRess(ExamList_body));
// // //         }
// // //     }, [std]);

// // //     useEffect(() => {
// // //         if (getstandard.length > 0) {
// // //             setStd(getstandard[0].id);
// // //             setExpandedCardIndex(0);
// // //         }
// // //     }, [getstandard]);


// // //     // const classInstructions = {};
// // //     // SubList.forEach((item) => {
// // //     //     if (!classInstructions[item.Standard_Name]) {
// // //     //         classInstructions[item.Standard_Name] = {};
// // //     //     }
// // //     //     // Only store instructions for each SchoolWise_Test_Id (text1)
// // //     //     classInstructions[item.Standard_Name][item.text1] = item.Instructions || '-';
// // //     // });
// // //     // console.log('classInstructions:', classInstructions);
// // //     const classInstructions = {};
// // //     SubList.forEach((item) => {
// // //         if (!classInstructions[item.Standard_Name]) {
// // //             classInstructions[item.Standard_Name] = {};
// // //         }
// // //         // Only store instructions for each SchoolWise_Test_Id (text1)
// // //         classInstructions[item.Standard_Name][item.text1] = item.Instructions || '-';

// // //         // Log each item as it's processed
// // //         console.log(`Item processed: Standard_Name - ${item.Standard_Name}, text1 - ${item.text1}, Instructions - ${item.Instructions || '-'}`);
// // //     });

// // //     // Log the entire classInstructions object after it's populated
// // //     console.log('classInstructions:', classInstructions);
// // //     const getTime = (startTime, endTime) => {
// // //         const formatTime = (time) => {
// // //             const [hours, minutes] = time.split(':');
// // //             let period = 'AM';
// // //             let adjustedHours = parseInt(hours, 10);

// // //             if (adjustedHours >= 12) {
// // //                 period = 'PM';
// // //                 adjustedHours -= 12;
// // //             }
// // //             if (adjustedHours === 0) {
// // //                 adjustedHours = 12;
// // //             }

// // //             return `${adjustedHours}:${minutes} ${period}`;
// // //         };

// // //         const formattedStartTime = formatTime(startTime);
// // //         const formattedEndTime = formatTime(endTime);

// // //         return `${formattedStartTime} - ${formattedEndTime}`;
// // //     };

// // //     const getDuration = (startTime, endTime) => {
// // //         const [startHours, startMinutes] = startTime.split(':').map(Number);
// // //         const [endHours, endMinutes] = endTime.split(':').map(Number);

// // //         const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
// // //         const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

// // //         let diff = endDate.getTime() - startDate.getTime();

// // //         if (diff < 0) {
// // //             diff += 24 * 60 * 60 * 1000;
// // //         }

// // //         const hours = Math.floor(diff / (1000 * 60 * 60));
// // //         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

// // //         return `${hours}h ${minutes}m`;
// // //     };

// // //     const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

// // //     const getExamName = () => {
// // //         if (getExamlist && getExamlist.length > 0) {
// // //             return getExamlist[0].Text1;
// // //         }
// // //         return '';
// // //     };

// // //     // Grouping SubList by date-time and examId
// // //     const groupByDateTime = (list) => {
// // //         const grouped = {};
// // //         list.forEach((item) => {
// // //             const key = `${item.text3}-${item.startTime}-${item.endTime}-${item.text1}`;
// // //             if (!grouped[key]) {
// // //                 grouped[key] = [];
// // //             }
// // //             grouped[key].push(item);
// // //         });
// // //         return grouped;
// // //     };

// // //     const groupedSubList = groupByDateTime(SubList);

// // //     return (
// // //         <Box sx={{ px: 2 }}>
// // //             <CommonPageHeader
// // //                 navLinks={[
// // //                     {
// // //                         title: 'Exam Schedule',
// // //                         path: ''
// // //                     }
// // //                 ]}
// // //                 rightActions={
// // //                     <>
// // //                         <Box sx={{ width: '200px', mr: 2 }}>
// // //                             {RoleId !== '3' && (
// // //                                 <Dropdown
// // //                                     Array={getstandard}
// // //                                     handleChange={stdChange}
// // //                                     label={'Select Standard'}
// // //                                     size={'small'}
// // //                                     variant="outlined"
// // //                                     defaultValue={std}
// // //                                 />
// // //                             )}
// // //                         </Box>
// // //                         <Box>
// // //                             <Tooltip title="Examination Schedule for your class.">
// // //                                 <IconButton sx={{
// // //                                     color: 'white',
// // //                                     backgroundColor: grey[500],
// // //                                     '&:hover': {
// // //                                         backgroundColor: grey[600]
// // //                                     }
// // //                                 }}>
// // //                                     <QuestionMarkIcon />
// // //                                 </IconButton>
// // //                             </Tooltip>
// // //                         </Box>
// // //                     </>
// // //                 }
// // //             />

// // //             {getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
// // //                 <Box key={index}>
// // //                     <Box
// // //                         sx={{
// // //                             mt: 2,
// // //                             cursor: 'pointer',
// // //                             backgroundColor: '#FFC0CB',
// // //                             padding: '7px',
// // //                             border: '1px solid brown',
// // //                             borderRadius: '3px',
// // //                         }}
// // //                         onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
// // //                     >
// // //                         <Typography variant="h6" sx={{ color: '#654321' }}>
// // //                             <span style={{ margin: '0 5px' }}>  <b> {exam.Text1}</b></span>
// // //                             <b>  {exam.Text3} To {exam.Text4}</b>
// // //                         </Typography>
// // //                     </Box>

// // //                     {expandedCardIndex === index && (
// // //                         <Box sx={{ background: 'white', p: 2, mt: 2 }}>
// // //                             {loading ? (
// // //                                 <SuspenseLoader />
// // //                             ) : (
// // //                                 <TableContainer component={Paper}>
// // //                                     <Table>
// // //                                         <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
// // //                                             <TableRow>
// // //                                                 <TableCell>Date</TableCell>
// // //                                                 <TableCell>Time</TableCell>
// // //                                                 <TableCell>Duration</TableCell>
// // //                                                 {std === '0' && classList.map((className) => (
// // //                                                     <TableCell key={className}>{className}</TableCell>
// // //                                                 ))}
// // //                                                 {std !== '0' && <TableCell>Subject</TableCell>}
// // //                                                 {std !== '0' && <TableCell>Description</TableCell>}
// // //                                             </TableRow>
// // //                                         </TableHead>

// // //                                         <TableBody>
// // //                                             {Object.keys(groupedSubList).map((key, index) => {
// // //                                                 const items = groupedSubList[key].filter(item => item.text1 === exam.Text2); // Filter by SchoolWise_Test_Id (text1)
// // //                                                 const [date, startTime, endTime, examId] = key.split('-');
// // //                                                 const uniqueDates = new Set();

// // //                                                 return items.length > 0 ? (
// // //                                                     <TableRow key={index}>
// // //                                                         <TableCell>{uniqueDates.has(date) ? '' : date}</TableCell>
// // //                                                         <TableCell>{getTime(startTime, endTime) || '-'}</TableCell>
// // //                                                         <TableCell>{getDuration(startTime, endTime) || '-'}</TableCell>
// // //                                                         {std === '0' ? (
// // //                                                             classList.map((className) => (
// // //                                                                 <TableCell key={`${className}-${index}`}>
// // //                                                                     {items
// // //                                                                         .filter((item) => item.Standard_Name === className)
// // //                                                                         .map((item) => item.header || '-')
// // //                                                                         .join('/ ') || '-'}
// // //                                                                 </TableCell>
// // //                                                             ))
// // //                                                         ) : (
// // //                                                             <>
// // //                                                                 <TableCell>
// // //                                                                     {items.map((item) => item.header || '-').join(',') || '-'}
// // //                                                                 </TableCell>
// // //                                                                 <TableCell>
// // //                                                                     {items.map((item) => item.Description || '-').join(', ') || '-'}
// // //                                                                 </TableCell>
// // //                                                             </>
// // //                                                         )}
// // //                                                     </TableRow>
// // //                                                 ) : null;
// // //                                             })}
// // //                                             <TableRow>
// // //                                                 <TableCell colSpan={3}>
// // //                                                     <b>Instructions:</b>
// // //                                                 </TableCell>
// // //                                                 {std === '0' || std !== '0' ? (
// // //                                                     classList.map((className) => (
// // //                                                         <TableCell key={className}>
// // //                                                             <Typography sx={{ color: 'darkblue' }}>
// // //                                                                 {classInstructions[className] && classInstructions[className][exam.Text2]}
// // //                                                             </Typography>
// // //                                                         </TableCell>
// // //                                                     ))
// // //                                                 ) : (
// // //                                                     <TableCell colSpan={1}>
// // //                                                         <Typography sx={{ color: 'darkblue' }}>
// // //                                                             {classInstructions[std] && classInstructions[std][exam.Text2]}
// // //                                                         </Typography>
// // //                                                     </TableCell>
// // //                                                 )}
// // //                                             </TableRow>
// // //                                         </TableBody>
// // //                                     </Table>
// // //                                 </TableContainer>
// // //                             )}
// // //                         </Box>
// // //                     )}
// // //                 </Box>
// // //             ))}

// // //             {!loading && getExamlist.length === 0 && (
// // //                 <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
// // //                     <b>No exam has been scheduled.</b>
// // //                 </Typography>
// // //             )}
// // //         </Box>
// // //     );
// // // };

// // // export default TExamScheduleNew;


// // import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// // import {
// //     Box,
// //     IconButton,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     Tooltip,
// //     Typography
// // } from '@mui/material';
// // import { grey } from '@mui/material/colors';
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
// // import Dropdown from 'src/libraries/dropdown/Dropdown';
// // import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
// // import { RootState } from 'src/store';
// // import CommonPageHeader from '../CommonPageHeader';

// // const TExamScheduleNew = () => {
// //     const dispatch = useDispatch();

// //     const getstandard = useSelector(
// //         (state: RootState) => state.StandardAndExamList.SelectStandard
// //     );
// //     const getExamlist = useSelector(
// //         (state: RootState) => state.StandardAndExamList.ExamData
// //     );

// //     const SubList = useSelector(
// //         (state: RootState) => state.StandardAndExamList.VeiwAllData
// //     );
// //     const loading = useSelector(
// //         (state: RootState) => state.StandardAndExamList.Loading
// //     );

// //     const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
// //     const asSchoolId = localStorage.getItem('localSchoolId');
// //     const RoleId = sessionStorage.getItem('RoleId');
// //     const asStandardId = sessionStorage.getItem('StandardId');

// //     const [std, setStd] = useState('0');
// //     const [expandedCardIndex, setExpandedCardIndex] = useState(null);

// //     const getstandardList_body = {
// //         asAcademicYearId: asAcademicYearId,
// //         asSchoolId: asSchoolId
// //     };

// //     const ExamList_body = {
// //         asSchoolId: asSchoolId,
// //         asAcademicYearId: asAcademicYearId,
// //         asStandardId: std
// //     };

// //     useEffect(() => {
// //         dispatch(GetSelectStandardRes(getstandardList_body));
// //         if (RoleId === '3') {
// //             setStd(asStandardId);
// //         }
// //     }, []);

// //     const stdChange = (value) => {
// //         setStd(value);
// //         setExpandedCardIndex(0);
// //     };

// //     useEffect(() => {
// //         if (std !== '') {
// //             dispatch(ViewExamDataRess(ExamList_body));
// //         }
// //     }, [std]);

// //     useEffect(() => {
// //         if (getstandard.length > 0) {
// //             setStd(getstandard[0].id);
// //             setExpandedCardIndex(0);
// //         }
// //     }, [getstandard]);


// //     const classInstructions = {};
// //     SubList.forEach((item) => {
// //         if (!classInstructions[item.Standard_Name]) {
// //             classInstructions[item.Standard_Name] = {};
// //         }
// //         // Only store instructions for each SchoolWise_Test_Id (text1)
// //         classInstructions[item.Standard_Name][item.text1] = item.Instructions || '-';
// //     });

// //     const getTime = (startTime, endTime) => {
// //         const formatTime = (time) => {
// //             const [hours, minutes] = time.split(':');
// //             let period = 'AM';
// //             let adjustedHours = parseInt(hours, 10);

// //             if (adjustedHours >= 12) {
// //                 period = 'PM';
// //                 adjustedHours -= 12;
// //             }
// //             if (adjustedHours === 0) {
// //                 adjustedHours = 12;
// //             }

// //             return `${adjustedHours}:${minutes} ${period}`;
// //         };

// //         const formattedStartTime = formatTime(startTime);
// //         const formattedEndTime = formatTime(endTime);

// //         return `${formattedStartTime} - ${formattedEndTime}`;
// //     };

// //     const getDuration = (startTime, endTime) => {
// //         const [startHours, startMinutes] = startTime.split(':').map(Number);
// //         const [endHours, endMinutes] = endTime.split(':').map(Number);

// //         const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
// //         const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

// //         let diff = endDate.getTime() - startDate.getTime();

// //         if (diff < 0) {
// //             diff += 24 * 60 * 60 * 1000;
// //         }

// //         const hours = Math.floor(diff / (1000 * 60 * 60));
// //         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

// //         return `${hours}h ${minutes}m`;
// //     };

// //     const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

// //     const getExamName = () => {
// //         if (getExamlist && getExamlist.length > 0) {
// //             return getExamlist[0].Text1;
// //         }
// //         return '';
// //     };

// //     // Grouping SubList by date-time and examId
// //     const groupByDateTime = (list) => {
// //         const grouped = {};
// //         list.forEach((item) => {
// //             const key = `${item.text3}-${item.startTime}-${item.endTime}-${item.text1}`;
// //             if (!grouped[key]) {
// //                 grouped[key] = [];
// //             }
// //             grouped[key].push(item);
// //         });
// //         return grouped;
// //     };

// //     const groupedSubList = groupByDateTime(SubList);

// //     const toggleAccordion = (index) => {
// //         setExpandedCardIndex(expandedCardIndex === index ? null : index);
// //     };

// //     return (
// //         <Box sx={{ px: 1 }}>
// //             <CommonPageHeader
// //                 navLinks={[
// //                     {
// //                         title: 'Exam Schedule',
// //                         path: ''
// //                     }
// //                 ]}
// //                 rightActions={
// //                     <>
// //                         <Box sx={{ width: '200px', mr: 2 }}>
// //                             {RoleId !== '3' && (
// //                                 <Dropdown
// //                                     Array={getstandard}
// //                                     handleChange={stdChange}
// //                                     label={'Select Standard'}
// //                                     size={'small'}
// //                                     variant="outlined"
// //                                     defaultValue={std}
// //                                 />
// //                             )}
// //                         </Box>
// //                         <Box>
// //                             <Tooltip title="Examination Schedule for your class.">
// //                                 <IconButton sx={{
// //                                     color: 'white',
// //                                     backgroundColor: grey[500],
// //                                     '&:hover': {
// //                                         backgroundColor: grey[600]
// //                                     }
// //                                 }}>
// //                                     <QuestionMarkIcon />
// //                                 </IconButton>
// //                             </Tooltip>
// //                         </Box>
// //                     </>
// //                 }
// //             />

// //             {getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
// //                 <Box key={index}>
// //                     <Box
// //                         sx={{
// //                             mt: 2,
// //                             cursor: 'pointer',
// //                             backgroundColor: '#FFC0CB',
// //                             padding: '7px',
// //                             border: '1px solid brown',
// //                             borderRadius: '3px',
// //                             display: 'flex',
// //                             justifyContent: 'space-between',
// //                             alignItems: 'center',
// //                             left: '-35px',
// //                         }}
// //                         onClick={() => toggleAccordion(index)}
// //                     >

// //                         <IconButton>
// //                             {expandedCardIndex === index ? (
// //                                 <Typography sx={{ color: 'brown' }}> <b> - </b></Typography>
// //                             ) : (
// //                                 <Typography sx={{ color: 'brown' }}> <b> + </b></Typography>
// //                             )}


// //                         <Typography variant="h6" sx={{ color: '#654321' }}>
// //                             <span style={{ margin: '0 5px' }}>  <b> {exam.Text1}</b></span>
// //                             <b>  {exam.Text3} To {exam.Text4}</b>
// //                         </Typography>
// //                         </IconButton>
// //                     </Box>

// //                     {expandedCardIndex === index && (
// //                         <Box sx={{ background: 'white', p: 2, mt: 2 }}>
// //                             {loading ? (
// //                                 <SuspenseLoader />
// //                             ) : (
// //                                 <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
// //                                     <Table sx={{ minWidth: 650 }}>
// //                                         <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
// //                                             <TableRow>
// //                                                 <TableCell>Date</TableCell>
// //                                                 <TableCell>Time</TableCell>
// //                                                 <TableCell>Duration</TableCell>
// //                                                 {std === '0' && classList.map((className) => (
// //                                                     <TableCell key={className}>{className}</TableCell>
// //                                                 ))}
// //                                                 {std !== '0' && <TableCell>Subject</TableCell>}
// //                                                 {std !== '0' && <TableCell>Description</TableCell>}
// //                                             </TableRow>
// //                                         </TableHead>

// //                                         <TableBody>
// //                                             {Object.keys(groupedSubList).map((key, index) => {
// //                                                 const items = groupedSubList[key].filter(item => item.text1 === exam.Text2); // Filter by SchoolWise_Test_Id (text1)
// //                                                 const [date, startTime, endTime, examId] = key.split('-');
// //                                                 const uniqueDates = new Set();

// //                                                 return items.length > 0 ? (
// //                                                     <TableRow key={index}>
// //                                                         <TableCell>{uniqueDates.has(date) ? '' : date}</TableCell>
// //                                                         <TableCell>{getTime(startTime, endTime) || '-'}</TableCell>
// //                                                         <TableCell>{getDuration(startTime, endTime) || '-'}</TableCell>
// //                                                         {std === '0' ? (
// //                                                             classList.map((className) => (
// //                                                                 <TableCell key={`${className}-${index}`}>
// //                                                                     {items
// //                                                                         .filter((item) => item.Standard_Name === className)
// //                                                                         .map((item) => item.header || '-')
// //                                                                         .join('/ ') || '-'}
// //                                                                 </TableCell>
// //                                                             ))
// //                                                         ) : (
// //                                                             <>
// //                                                                 <TableCell>
// //                                                                     {items.map((item) => item.header || '-').join(',') || '-'}
// //                                                                 </TableCell>
// //                                                                 <TableCell>
// //                                                                     {items.map((item) => item.Description || '-').join(', ') || '-'}
// //                                                                 </TableCell>
// //                                                             </>
// //                                                         )}
// //                                                     </TableRow>
// //                                                 ) : null;
// //                                             })}
// //                                             <TableRow>
// //                                                 <TableCell colSpan={3}>
// //                                                     <b>Instructions:</b>
// //                                                 </TableCell>
// //                                                 {std === '0' || std !== '0' ? (
// //                                                     classList.map((className) => (
// //                                                         <TableCell key={className}>
// //                                                             <Typography sx={{ color: 'darkblue' }}>
// //                                                                 {classInstructions[className] && classInstructions[className][exam.Text2]}
// //                                                             </Typography>
// //                                                         </TableCell>
// //                                                     ))
// //                                                 ) : (
// //                                                     <TableCell colSpan={5}>
// //                                                         <Typography sx={{ color: 'darkblue' }}>
// //                                                             {classInstructions[std] && classInstructions[std][exam.Text2]}
// //                                                         </Typography>
// //                                                     </TableCell>
// //                                                 )}
// //                                             </TableRow>
// //                                         </TableBody>
// //                                     </Table>
// //                                 </TableContainer>
// //                             )}
// //                         </Box>
// //                     )}
// //                 </Box>
// //             ))}

// //             {!loading && getExamlist.length === 0 && (
// //                 <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
// //                     <b>No exam has been scheduled.</b>
// //                 </Typography>
// //             )}
// //         </Box>
// //     );
// // };

// // export default TExamScheduleNew;


// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import {
//     Box,
//     IconButton,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Tooltip,
//     Typography
// } from '@mui/material';
// import { grey } from '@mui/material/colors';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
// import Dropdown from 'src/libraries/dropdown/Dropdown';
// import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
// import { RootState } from 'src/store';
// import CommonPageHeader from '../CommonPageHeader';

// const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' });
//     const year = date.getFullYear();
//     return `${day} ${month} ${year}`;
// };

// const TExamScheduleNew = () => {
//     const dispatch = useDispatch();

//     const getstandard = useSelector(
//         (state: RootState) => state.StandardAndExamList.SelectStandard
//     );
//     const getExamlist = useSelector(
//         (state: RootState) => state.StandardAndExamList.ExamData
//     );

//     const SubList = useSelector(
//         (state: RootState) => state.StandardAndExamList.VeiwAllData
//     );
//     const loading = useSelector(
//         (state: RootState) => state.StandardAndExamList.Loading
//     );

//     const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
//     const asSchoolId = localStorage.getItem('localSchoolId');
//     const RoleId = sessionStorage.getItem('RoleId');
//     const asStandardId = sessionStorage.getItem('StandardId');

//     const [std, setStd] = useState('0');
//     const [expandedCardIndex, setExpandedCardIndex] = useState(null);

//     const getstandardList_body = {
//         asAcademicYearId: asAcademicYearId,
//         asSchoolId: asSchoolId
//     };

//     const ExamList_body = {
//         asSchoolId: asSchoolId,
//         asAcademicYearId: asAcademicYearId,
//         asStandardId: std
//     };

//     useEffect(() => {
//         dispatch(GetSelectStandardRes(getstandardList_body));
//         if (RoleId === '3') {
//             setStd(asStandardId);
//         }
//     }, []);

//     const stdChange = (value) => {
//         setStd(value);
//         setExpandedCardIndex(0);
//     };

//     useEffect(() => {
//         if (std !== '') {
//             dispatch(ViewExamDataRess(ExamList_body));
//         }
//     }, [std]);

//     useEffect(() => {
//         if (getstandard.length > 0) {
//             setStd(getstandard[0].id);
//             setExpandedCardIndex(0);
//         }
//     }, [getstandard]);

//     const classInstructions = {};
//     SubList.forEach((item) => {
//         if (!classInstructions[item.Standard_Name]) {
//             classInstructions[item.Standard_Name] = {};
//         }
//         classInstructions[item.Standard_Name][item.text1] = item.Instructions || '-';
//     });

//     const getTime = (startTime, endTime) => {
//         const formatTime = (time) => {
//             const [hours, minutes] = time.split(':');
//             let period = 'AM';
//             let adjustedHours = parseInt(hours, 10);

//             if (adjustedHours >= 12) {
//                 period = 'PM';
//                 adjustedHours -= 12;
//             }
//             if (adjustedHours === 0) {
//                 adjustedHours = 12;
//             }

//             return `${adjustedHours}:${minutes} ${period}`;
//         };

//         const formattedStartTime = formatTime(startTime);
//         const formattedEndTime = formatTime(endTime);

//         return `${formattedStartTime} - ${formattedEndTime}`;
//     };

//     const getDuration = (startTime, endTime) => {
//         const [startHours, startMinutes] = startTime.split(':').map(Number);
//         const [endHours, endMinutes] = endTime.split(':').map(Number);

//         const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
//         const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

//         let diff = endDate.getTime() - startDate.getTime();

//         if (diff < 0) {
//             diff += 24 * 60 * 60 * 1000;
//         }

//         const hours = Math.floor(diff / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//         return `${hours}h ${minutes}m`;
//     };

//     const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

//     const getExamName = () => {
//         if (getExamlist && getExamlist.length > 0) {
//             return getExamlist[0].Text1;
//         }
//         return '';
//     };

//     const groupByDateTime = (list) => {
//         const grouped = {};
//         list.forEach((item) => {
//             const key = `${item.text3}-${item.startTime}-${item.endTime}-${item.text1}`;
//             if (!grouped[key]) {
//                 grouped[key] = [];
//             }
//             grouped[key].push(item);
//         });
//         return grouped;
//     };

//     const groupedSubList = groupByDateTime(SubList);

//     const toggleAccordion = (index) => {
//         setExpandedCardIndex(expandedCardIndex === index ? null : index);
//     };

//     return (
//         <Box sx={{ px: 2 }}>
//             <CommonPageHeader
//                 navLinks={[
//                     {
//                         title: 'Exam Schedule',
//                         path: ''
//                     }
//                 ]}
//                 rightActions={
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         {RoleId !== '3' && (
//                             <Box sx={{ width: '200px', mr: 2 }}>
//                                 <Dropdown
//                                     Array={getstandard}
//                                     handleChange={stdChange}
//                                     label={'Select Standard'}
//                                     size={'small'}
//                                     variant="outlined"
//                                     defaultValue={std}
//                                 />
//                             </Box>
//                         )}
//                         <Tooltip title="Examination Schedule for your class.">
//                             <IconButton sx={{
//                                 color: 'white',
//                                 backgroundColor: grey[500],
//                                 '&:hover': {
//                                     backgroundColor: grey[600]
//                                 }
//                             }}>
//                                 <QuestionMarkIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 }
//             />

//             {getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
//                 <Box key={index}>
//                     <Box
//                         sx={{
//                             mt: 2,
//                             cursor: 'pointer',
//                             backgroundColor: '#FFC0CB',
//                             padding: '7px',
//                             border: '1px solid brown',
//                             borderRadius: '3px',
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                         }}
//                         onClick={() => toggleAccordion(index)}
//                     >
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <IconButton>
//                                 {expandedCardIndex === index ? (
//                                     <Typography sx={{ color: 'brown' }}> <b> - </b></Typography>
//                                 ) : (
//                                     <Typography sx={{ color: 'brown' }}> <b> + </b></Typography>
//                                 )}
//                             </IconButton>
//                             <Typography variant="h6" sx={{ color: '#654321' }}>
//                                 <span style={{ margin: '0 5px' }}>  <b> {exam.Text1}</b></span>
//                                 <b>  {formatDate(exam.Text3)} To {formatDate(exam.Text4)}</b>
//                             </Typography>
//                         </Box>
//                     </Box>

//                     {expandedCardIndex === index && (
//                         <Box sx={{ background: 'white', p: 2, mt: 2 }}>
//                             {loading ? (
//                                 <SuspenseLoader />
//                             ) : (
//                                 <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
//                                     <Table sx={{ minWidth: 650 }}>
//                                         <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
//                                             <TableRow>
//                                                 <TableCell>Date</TableCell>
//                                                 <TableCell>Time</TableCell>
//                                                 <TableCell>Duration</TableCell>
//                                                 {std === '0' && classList.map((className) => (
//                                                     <TableCell key={className}>{className}</TableCell>
//                                                 ))}
//                                                 {std !== '0' && <TableCell>Subject</TableCell>}
//                                                 {std !== '0' && <TableCell>Description</TableCell>}
//                                             </TableRow>
//                                         </TableHead>

//                                         <TableBody>
//                                             {Object.keys(groupedSubList).map((key, index) => {
//                                                 const items = groupedSubList[key].filter(item => item.text1 === exam.Text2);
//                                                 const [date, startTime, endTime, examId] = key.split('-');
//                                                 const uniqueDates = new Set();

//                                                 return items.length > 0 ? (
//                                                     <TableRow key={index}>
//                                                         <TableCell>{uniqueDates.has(date) ? '' : formatDate(date)}</TableCell>
//                                                         <TableCell>{getTime(startTime, endTime) || '-'}</TableCell>
//                                                         <TableCell>{getDuration(startTime, endTime) || '-'}</TableCell>
//                                                         {std === '0' ? (
//                                                             classList.map((className) => (
//                                                                 <TableCell key={`${className}-${index}`}>
//                                                                     {items
//                                                                         .filter((item) => item.Standard_Name === className)
//                                                                         .map((item) => item.header || '-')
//                                                                         .join('/ ') || '-'}
//                                                                 </TableCell>
//                                                             ))
//                                                         ) : (
//                                                             <>
//                                                                 <TableCell>
//                                                                     {items.map((item) => item.header || '-').join(',') || '-'}
//                                                                 </TableCell>
//                                                                 <TableCell>
//                                                                     {items.map((item) => item.Description || '-').join(', ') || '-'}
//                                                                 </TableCell>
//                                                             </>
//                                                         )}
//                                                     </TableRow>
//                                                 ) : null;
//                                             })}
//                                             <TableRow>
//                                                 <TableCell colSpan={3}>
//                                                     <b>Instructions:</b>
//                                                 </TableCell>
//                                                 {std === '0' || std !== '0' ? (
//                                                     classList.map((className) => (
//                                                         <TableCell key={className}>
//                                                             <Typography sx={{ color: 'darkblue' }}>
//                                                                 {classInstructions[className] && classInstructions[className][exam.Text2]}
//                                                             </Typography>
//                                                         </TableCell>
//                                                     ))
//                                                 ) : (
//                                                     <TableCell colSpan={5}>
//                                                         <Typography sx={{ color: 'darkblue' }}>
//                                                             {classInstructions[std] && classInstructions[std][exam.Text2]}
//                                                         </Typography>
//                                                     </TableCell>
//                                                 )}
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             )}
//                         </Box>
//                     )}
//                 </Box>
//             ))}

//             {!loading && getExamlist.length === 0 && (
//                 <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
//                     <b>No exam has been scheduled.</b>
//                 </Typography>
//             )}
//         </Box>
//     );
// };

// export default TExamScheduleNew;


import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const TExamScheduleNew = () => {
    const dispatch = useDispatch();

    const getstandard = useSelector(
        (state: RootState) => state.StandardAndExamList.SelectStandard
    );
    const getExamlist = useSelector(
        (state: RootState) => state.StandardAndExamList.ExamData
    );

    const SubList = useSelector(
        (state: RootState) => state.StandardAndExamList.VeiwAllData
    );
    const loading = useSelector(
        (state: RootState) => state.StandardAndExamList.Loading
    );

    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const asStandardId = sessionStorage.getItem('StandardId');

    const [std, setStd] = useState('0');
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);

    const getstandardList_body = {
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId
    };

    const ExamList_body = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: std
    };

    useEffect(() => {
        dispatch(GetSelectStandardRes(getstandardList_body));
        if (RoleId === '3') {
            setStd(asStandardId);
        }
    }, []);

    const stdChange = (value) => {
        setStd(value);
        setExpandedCardIndex(0);
    };

    useEffect(() => {
        if (std !== '') {
            dispatch(ViewExamDataRess(ExamList_body));
        }
    }, [std]);

    useEffect(() => {
        if (getstandard.length > 0) {
            setStd(getstandard[0].id);
            setExpandedCardIndex(0);
        }
    }, [getstandard]);

    const classInstructions = {};
    SubList.forEach((item) => {
        if (!classInstructions[item.Standard_Name]) {
            classInstructions[item.Standard_Name] = {};
        }
        classInstructions[item.Standard_Name][item.text1] = item.Instructions || '-';
    });

    const getTime = (startTime, endTime) => {
        const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            let period = 'AM';
            let adjustedHours = parseInt(hours, 10);

            if (adjustedHours >= 12) {
                period = 'PM';
                adjustedHours -= 12;
            }
            if (adjustedHours === 0) {
                adjustedHours = 12;
            }

            return `${adjustedHours}:${minutes} ${period}`;
        };

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        return `${formattedStartTime} - ${formattedEndTime}`;
    };

    const getDuration = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
        const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

        let diff = endDate.getTime() - startDate.getTime();

        if (diff < 0) {
            diff += 24 * 60 * 60 * 1000;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

    const getExamName = () => {
        if (getExamlist && getExamlist.length > 0) {
            return getExamlist[0].Text1;
        }
        return '';
    };

    const groupByDateTime = (list) => {
        const grouped = {};
        list.forEach((item) => {
            const key = `${item.text3}-${item.startTime}-${item.endTime}-${item.text1}`;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
        });
        return grouped;
    };

    const groupedSubList = groupByDateTime(SubList);

    const toggleAccordion = (index) => {
        setExpandedCardIndex(expandedCardIndex === index ? null : index);
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: ''
                    }
                ]}
                rightActions={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {RoleId !== '3' && (
                            <Box sx={{ width: '200px', mr: 2 }}>
                                <Dropdown
                                    Array={getstandard}
                                    handleChange={stdChange}
                                    label={'Select Standard'}
                                    size={'small'}
                                    variant="outlined"
                                    defaultValue={std}
                                />
                            </Box>
                        )}
                        <Tooltip title="Examination Schedule for your class.">
                            <IconButton sx={{
                                color: 'white',
                                backgroundColor: grey[500],
                                '&:hover': {
                                    backgroundColor: grey[600]
                                }
                            }}>
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            />

            {getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
                <Box key={index}>
                    <Box
                        sx={{
                            mt: 2,
                            cursor: 'pointer',
                            backgroundColor: '#FFC0CB',
                            padding: '7px',
                            border: '1px solid brown',
                            borderRadius: '3px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        onClick={() => toggleAccordion(index)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '20px', height: '20px', border: '1px solid brown', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: 'brown', fontSize: '16px', fontWeight: 'bold' }}>
                                    {expandedCardIndex === index ? '-' : '+'}
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ color: '#654321', ml: 1 }}>
                                <b>{exam.Text1}</b> <b>{exam.Text3} To {exam.Text4}</b>
                            </Typography>
                        </Box>
                    </Box>

                    {expandedCardIndex === index && (
                        <Box sx={{ background: 'white', p: 2, mt: 2 }}>
                            {loading ? (
                                <SuspenseLoader />
                            ) : (
                                <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Time</TableCell>
                                                <TableCell>Duration</TableCell>
                                                {std === '0' && classList.map((className) => (
                                                    <TableCell key={className}>{className}</TableCell>
                                                ))}
                                                {std !== '0' && <TableCell>Subject</TableCell>}
                                                {std !== '0' && <TableCell>Description</TableCell>}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {Object.keys(groupedSubList).map((key, index) => {
                                                const items = groupedSubList[key].filter(item => item.text1 === exam.Text2);
                                                const [date, startTime, endTime, examId] = key.split('-');
                                                const uniqueDates = new Set();

                                                return items.length > 0 ? (
                                                    <TableRow key={index}>
                                                        <TableCell>{uniqueDates.has(date) ? '' : date}</TableCell>
                                                        <TableCell>{getTime(startTime, endTime) || '-'}</TableCell>
                                                        <TableCell>{getDuration(startTime, endTime) || '-'}</TableCell>
                                                        {std === '0' ? (
                                                            classList.map((className) => (
                                                                <TableCell key={`${className}-${index}`}>
                                                                    {items
                                                                        .filter((item) => item.Standard_Name === className)
                                                                        .map((item) => item.header || '-')
                                                                        .join('/ ') || '-'}
                                                                </TableCell>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <TableCell>
                                                                    {items.map((item) => item.header || '-').join(',') || '-'}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {items.map((item) => item.Description || '-').join(', ') || '-'}
                                                                </TableCell>
                                                            </>
                                                        )}
                                                    </TableRow>
                                                ) : null;
                                            })}
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    <b>Instructions:</b>
                                                </TableCell>
                                                {std === '0' ? (
                                                    classList.map((className) => (
                                                        <TableCell key={className}>
                                                            <Typography sx={{ color: 'darkblue' }}>
                                                                {classInstructions[className] && classInstructions[className][exam.Text2]}
                                                            </Typography>
                                                        </TableCell>
                                                    ))
                                                ) : (
                                                    <TableCell colSpan={5}>
                                                        <Typography sx={{ color: 'darkblue' }}>
                                                            {classInstructions[std] && classInstructions[std][exam.Text2]}
                                                        </Typography>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    )}
                </Box>
            ))}

            {!loading && getExamlist.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>No exam has been scheduled.</b>
                </Typography>
            )}
        </Box>
    );
};

export default TExamScheduleNew;
