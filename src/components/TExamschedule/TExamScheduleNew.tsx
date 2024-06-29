// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import {
//   Box,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tooltip,
//   Typography
// } from '@mui/material';
// import { grey } from '@mui/material/colors';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
// import Dropdown from 'src/libraries/dropdown/Dropdown';
// import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
// import { RootState } from 'src/store';
// import CommonPageHeader from '../CommonPageHeader';

// const TExamScheduleNew = () => {
//   const dispatch = useDispatch();

//   const getstandard = useSelector(
//     (state: RootState) => state.StandardAndExamList.SelectStandard
//   );
//   const getExamlist = useSelector(
//     (state: RootState) => state.StandardAndExamList.ExamData
//   );

//   const SubList = useSelector(
//     (state: RootState) => state.StandardAndExamList.VeiwAllData
//   );
//   const loading = useSelector(
//     (state: RootState) => state.StandardAndExamList.Loading
//   );

//   const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
//   const asSchoolId = localStorage.getItem('localSchoolId');
//   const RoleId = sessionStorage.getItem('RoleId');
//   const asStandardId = sessionStorage.getItem('StandardId');

//   const [std, setStd] = useState('0');
//   const [showCardData, setShowCardData] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   const getstandardList_body = {
//     asAcademicYearId: asAcademicYearId,
//     asSchoolId: asSchoolId
//   };

//   const ExamList_body = {
//     asSchoolId: asSchoolId,
//     asAcademicYearId: asAcademicYearId,
//     asStandardId: std
//   };

//   useEffect(() => {
//     dispatch(GetSelectStandardRes(getstandardList_body));
//     if (RoleId === '3') {
//       setStd(asStandardId);
//     }
//   }, []);

//   const stdChange = (value) => {
//     setStd(value);
//     setShowCardData(false);
//   };

//   useEffect(() => {
//     if (std !== '') {
//       dispatch(ViewExamDataRess(ExamList_body));
//       setIsLoaded(false);
//     }
//   }, [std]);

//   useEffect(() => {
//     if (getstandard.length > 0) {
//       setStd(getstandard[0].id);
//     }
//   }, [getstandard]);

//   useEffect(() => {
//     if (!loading) {
//       setIsLoaded(true);
//     }
//   }, [loading]);

//   const getTime = (startTime, endTime) => {
//     const formatTime = (time) => {
//       const [hours, minutes] = time.split(':');
//       let period = 'AM';
//       let adjustedHours = parseInt(hours, 10);

//       if (adjustedHours >= 12) {
//         period = 'PM';
//         adjustedHours -= 12;
//       }
//       if (adjustedHours === 0) {
//         adjustedHours = 12;
//       }

//       return `${adjustedHours}:${minutes} ${period}`;
//     };

//     const formattedStartTime = formatTime(startTime);
//     const formattedEndTime = formatTime(endTime);

//     return `${formattedStartTime} - ${formattedEndTime}`;
//   };


//   const getDuration = (startTime, endTime) => {
//     const [startHours, startMinutes] = startTime.split(':').map(Number);
//     const [endHours, endMinutes] = endTime.split(':').map(Number);

//     const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
//     const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

//     let diff = endDate.getTime() - startDate.getTime();

//     if (diff < 0) {
//       diff += 24 * 60 * 60 * 1000;
//     }

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//     return `${hours}h ${minutes}m`;
//   };

//   const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

//   const getExamName = () => {
//     if (getExamlist && getExamlist.length > 0) {
//       return getExamlist[0].Text1;
//     }
//     return '';
//   };

//   // Collecting instructions for each class
//   const classInstructions = {};
//   SubList.forEach((item) => {
//     if (!classInstructions[item.Standard_Name]) {
//       classInstructions[item.Standard_Name] = item.Instructions || '-';
//     }
//   });

//   const groupByDateTime = (list) => {
//     const grouped = {};
//     list.forEach((item) => {
//       const key = `${item.text3}-${item.startTime}-${item.endTime}`;
//       if (!grouped[key]) {
//         grouped[key] = [];
//       }
//       grouped[key].push(item);
//     });
//     return grouped;
//   };

//   const groupedSubList = groupByDateTime(SubList);

//   const uniqueDates = new Set();

//   return (
//     <Box sx={{ px: 2 }}>
//       <CommonPageHeader
//         navLinks={[
//           {
//             title: 'Exam Schedule',
//             path: ''
//           }
//         ]}
//         rightActions={
//           <>
//             <Box sx={{ width: '200px', mr: 2 }}>
//               {RoleId !== '3' && (
//                 <Dropdown
//                   Array={getstandard}
//                   handleChange={stdChange}
//                   label={'Select Standard'}
//                   size={'small'}
//                   variant="outlined"
//                   defaultValue={std}
//                 />
//               )}
//             </Box>
//             <Box>
//               <Tooltip title="Examination Schedule for your class.">
//                 <IconButton sx={{
//                   color: 'white',
//                   backgroundColor: grey[500],
//                   '&:hover': {
//                     backgroundColor: grey[600]
//                   }
//                 }}>
//                   <QuestionMarkIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </>
//         }
//       />

//       {SubList.length > 0 && getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
//         <Box
//           key={index}
//           sx={{
//             mt: 2,
//             cursor: 'pointer',
//             backgroundColor: '#FFC0CB',
//             padding: '7px',
//             border: '1px solid brown',
//             borderRadius: '3px',
//           }}
//           onClick={() => setShowCardData(!showCardData)}
//         >
//           <Typography variant="h6" sx={{ color: '#654321' }}>
//             <span style={{ margin: '0 5px' }}>{exam.Text1}</span>
//             {exam.Text3} To {exam.Text4}
//           </Typography>
//         </Box>
//       ))}

//       {showCardData && getExamlist.length > 0 ? (
//         <Box sx={{ background: 'white', p: 2, mt: 2 }}>
//           {loading ? (
//             <SuspenseLoader />
//           ) : (
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Time </TableCell>
//                     <TableCell>Duration</TableCell>
//                     {std === '0' && classList.map((className) => (
//                       <TableCell key={className}>{className}</TableCell>
//                     ))}
//                     {std !== '0' && <TableCell>Subject</TableCell>}
//                     {std !== '0' && <TableCell>Description</TableCell>}
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {Object.keys(groupedSubList).map((key, index) => {
//                     const items = groupedSubList[key];
//                     const [date, startTime, endTime] = key.split('-');
//                     const isDateShown = uniqueDates.has(date);
//                     uniqueDates.add(date);

//                     return (
//                       <TableRow key={index}>
//                         <TableCell>{isDateShown ? '' : date}</TableCell>
//                         <TableCell>{getTime(startTime, endTime) || '-'}</TableCell>
//                         <TableCell>{getDuration(startTime, endTime) || '-'}</TableCell>
//                         {std === '0' ? (
//                           classList.map((className) => (
//                             <TableCell key={`${className}-${index}`}>
//                               {items
//                                 .filter((item) => item.Standard_Name === className)
//                                 .map((item) => item.header || '-')
//                                 .join('/ ') || '-'}
//                             </TableCell>
//                           ))
//                         ) : (
//                           <>
//                             <TableCell>
//                               {items.map((item) => item.header || '-').join(',') || '-'}
//                             </TableCell>
//                             <TableCell>
//                               {items.map((item) => item.Description || '-').join(', ') || '-'}
//                             </TableCell>
//                           </>
//                         )}
//                       </TableRow>
//                     );
//                   })}

//                   {/* Instructions row for each class */}

//                   <TableRow>
//                     <TableCell colSpan={3}>
//                       <b>Instructions:</b>
//                     </TableCell>
//                     {classList.map((className) => (
//                       <TableCell key={className}>
//                         <Typography variant="body2" sx={{ color: 'darkblue' }}>
//                           {classInstructions[className] || ''}
//                         </Typography>
//                       </TableCell>
//                     ))}
//                   </TableRow>

//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       ) : (
//         !loading && isLoaded && getExamlist.length === 0 && (
//           <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
//             <b>No exam has been scheduled.</b>
//           </Typography>
//         )
//       )}
//     </Box>
//   );
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
    setExpandedCardIndex(null);
  };

  useEffect(() => {
    if (std !== '') {
      dispatch(ViewExamDataRess(ExamList_body));
    }
  }, [std]);

  useEffect(() => {
    if (getstandard.length > 0) {
      setStd(getstandard[0].id);
    }
  }, [getstandard]);

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

  // Collecting instructions for each class
  const classInstructions = {};
  SubList.forEach((item) => {
    if (!classInstructions[item.Standard_Name]) {
      classInstructions[item.Standard_Name] = item.Instructions || '-';
    }
  });

  // Grouping SubList by date-time and examId
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
          <>
            <Box sx={{ width: '200px', mr: 2 }}>
              {RoleId !== '3' && (
                <Dropdown
                  Array={getstandard}
                  handleChange={stdChange}
                  label={'Select Standard'}
                  size={'small'}
                  variant="outlined"
                  defaultValue={std}
                />
              )}
            </Box>
            <Box>
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
          </>
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
            }}
            onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
          >
            <Typography variant="h6" sx={{ color: '#654321' }}>
              <span style={{ margin: '0 5px' }}>{exam.Text1}</span>
              {exam.Text3} To {exam.Text4}
            </Typography>
          </Box>

          {expandedCardIndex === index && (
            <Box sx={{ background: 'white', p: 2, mt: 2 }}>
              {loading ? (
                <SuspenseLoader />
              ) : (
                <TableContainer component={Paper}>
                  <Table>
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
                        const items = groupedSubList[key].filter(item => item.text1 === exam.Text2); // Filter by SchoolWise_Test_Id
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


                      {/* <TableRow>
                        <TableCell colSpan={3}>
                          <Typography variant="subtitle1" gutterBottom>
                            Instructions:
                          </Typography>
                          {classList.map((className) => (
                            <Typography key={className} variant="body2" gutterBottom>
                              {className}: {classInstructions[className] || '-'}
                            </Typography>
                          ))}
                        </TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell colSpan={3}>
                          <b>Instructions:</b>
                        </TableCell>
                        {classList.map((className) => (
                          <TableCell key={className}>
                            <Typography variant="body2" sx={{ color: 'darkblue' }}>
                              {classInstructions[className] || ''}
                            </Typography>
                          </TableCell>
                        ))}                  
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
