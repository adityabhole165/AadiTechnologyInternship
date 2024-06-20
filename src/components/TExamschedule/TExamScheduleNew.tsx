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
// import {
//   EmptyExam,
//   GetSelectExamRes,
//   GetSelectStandardRes,
//   ViewExamDataRess
// } from 'src/requests/TExamschedule/TExamschedule';
// import { RootState } from 'src/store';
// import CommonPageHeader from '../CommonPageHeader';

// const TExamScheduleNew = () => {
//   const dispatch = useDispatch();

//   const getstandard = useSelector(
//     (state: RootState) => state.StandardAndExamList.SelectStandard
//   );console.log(getstandard,"getstandard");
//   const getExamlist = useSelector(
//     (state: RootState) => state.StandardAndExamList.SelectExam
//   );
//   const SubList = useSelector(
//     (state: RootState) => state.StandardAndExamList.ExamData
//   );
//   const loading = useSelector(
//     (state: RootState) => state.StandardAndExamList.Loading
//   );

//   const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
//   const asSchoolId = localStorage.getItem('localSchoolId');
//   const RoleId = sessionStorage.getItem('RoleId');
//   const asStandardId = sessionStorage.getItem('StandardId');

//   const [std, setStd] = useState('');
//   const [exam, setExam] = useState('');
//   const [isFirstTime, setIsFirstTime] = useState(true);
//   const [showCardData, setShowCardData] = useState(false);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');

//   const getstandardList_body = {
//     asAcademicYearId: asAcademicYearId,
//     asSchoolId: asSchoolId
//   };

//   const ExamList_body = {
//     asSchoolId: asSchoolId,
//     asAcademicYearId: asAcademicYearId,
//     asStandardId: std
//   };

//   const getexamType_body = {
//     asSchoolId: asSchoolId,
//     asAcademicYearId: asAcademicYearId,
//     asStandardId: std,
//     asExamId: exam
//   };

//   useEffect(() => {
//     dispatch(EmptyExam());
//     dispatch(GetSelectStandardRes(getstandardList_body));
//     if (RoleId === '3') {
//       setStd(asStandardId);
//     }
//   }, []);

//   const stdChange = (value) => {
//     setStd(value);
//     setExam('');
//     setIsFirstTime(true); // Reset the isFirstTime flag to true when standard changes
//     setShowCardData(false); // Reset the card data visibility on standard change
//   };

//   const examChange = (value) => {
//     setExam(value);
//     setShowCardData(false); // Reset the card data visibility on exam change
//   };

//   useEffect(() => {
//     if (std !== '') {
//       dispatch(GetSelectExamRes(ExamList_body));
//     }
//   }, [std]);



//   useEffect(() => {
//     if (exam !== '') {
//       dispatch(ViewExamDataRess(getexamType_body));
//     }
//   }, [exam]);

//   useEffect(() => {
//     if (SubList?.length > 0) {
//       const startTime = SubList[0]?.startTime || '';
//       const endTime = SubList[0]?.endTime || '';
//       setStartTime(startTime);
//       setEndTime(endTime);
//     }
//   }, [SubList]);

//   const getTime = (startTime, endTime) => {
//     const [startHours, startMinutes, startPeriod] = startTime.split(/:|\s/);
//     let adjustedStartHours =
//       parseInt(startHours, 10) + (startPeriod === 'PM' ? 12 : 0);
//     const [endHours, endMinutes, endPeriod] = endTime.split(/:|\s/);
//     let adjustedEndHours =
//       parseInt(endHours, 10) + (endPeriod === 'PM' ? 12 : 0);

//     const startDate = new Date();
//     startDate.setHours(adjustedStartHours);
//     startDate.setMinutes(parseInt(startMinutes, 10));

//     const endDate = new Date();
//     endDate.setHours(adjustedEndHours);
//     endDate.setMinutes(parseInt(endMinutes, 10));

//     const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
//     const hours1 = Math.floor(timeDifference / (1000 * 60 * 60));
//     const minutes2 = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

//     return hours1 + ' hrs ' + minutes2 + ' mins';
//   };

//   const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

//   const getExamName = () => {
//     const selectedExam = getExamlist.find((Item) => Item.Value === exam);
//     return selectedExam ? selectedExam.Name : '';
//   };

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
//             {getExamlist.length > 0 ? (
//               <Box sx={{ width: '200px', mr: 2 }}>
//                 <Dropdown
//                   Array={getExamlist}
//                   handleChange={examChange}
//                   label={'Select Exam'}
//                   size={'small'}
//                   variant="outlined"
//                   defaultValue={exam}
//                 />
//               </Box>
//             ) : (
//               //((!isFirstTime && RoleId === '2') || RoleId !== '2') && (
//               <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
//                 <b>No exam has been scheduled</b>
//               </Typography>


//               //)
//             )}
//             <Box>
//               <Tooltip title="Display Standardwise Exam Schedule.">
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

//       {exam && (
//         <Box
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
//             <b>{getExamName()}</b>
//           </Typography>
//         </Box>
//       )}

//       {showCardData && SubList?.length > 0 ? (
//         <Box sx={{ background: 'white', p: 2, mt: 2 }}>
//           {loading ? (
//             <SuspenseLoader />
//           ) : (
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
//                   <TableRow>
//                     <TableCell></TableCell>
//                     <TableCell>Standards</TableCell>
//                     {classList.map((className) => (
//                       <TableCell key={className}>{className}</TableCell>
//                     ))}
//                     <TableCell></TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Time & Duration</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Instructions</TableCell>

//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {SubList.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.text3 || '--'}</TableCell>
//                       <TableCell>
//                         {item.startTime} - {item.endTime}
//                         <br />
//                         ({getTime(item.startTime, item.endTime)})
//                       </TableCell>
//                       {classList.map((className) => (
//                         <TableCell key={`${className}-${index}`}>
//                           {item.Standard_Name === className ? item.header || '--' : '--'}
//                         </TableCell>
//                       ))}
//                       <TableCell sx={{ color: 'blue' }}>{item.Instructions || '--'}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       ) : (
//         <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
//           <b>No exam has been scheduled</b>
//         </Typography>
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
import {
  EmptyExam,
  GetSelectExamRes,
  GetSelectStandardRes,
  ViewExamDataRess
} from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const TExamScheduleNew = () => {
  const dispatch = useDispatch();

  const getstandard = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectStandard
  );
  const getExamlist = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectExam
  );
  const SubList = useSelector(
    (state: RootState) => state.StandardAndExamList.ExamData
  );
  const loading = useSelector(
    (state: RootState) => state.StandardAndExamList.Loading
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const asStandardId = sessionStorage.getItem('StandardId');

  const [std, setStd] = useState('0'); // Default to '0' for "All"
  const [exam, setExam] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showCardData, setShowCardData] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const getstandardList_body = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const ExamList_body = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: std
  };

  const getexamType_body = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: std,
    asExamId: exam
  };

  useEffect(() => {
    dispatch(EmptyExam());
    dispatch(GetSelectStandardRes(getstandardList_body));
    if (RoleId === '3') {
      setStd(asStandardId);
    }
  }, []);

  const stdChange = (value) => {
    setStd(value);
    setExam('');
    setIsFirstTime(true); // Reset the isFirstTime flag to true when standard changes
    setShowCardData(false); // Reset the card data visibility on standard change
  };

  const examChange = (value) => {
    setExam(value);
    setShowCardData(false); // Reset the card data visibility on exam change
  };

  useEffect(() => {
    if (std !== '') {
      dispatch(GetSelectExamRes(ExamList_body));
    }
  }, [std]);

  useEffect(() => {
    if (getstandard.length > 0) {
           setStd(getstandard[0].id);
       }
  }, [getstandard]);

  useEffect(() => {
    if (exam !== '') {
      dispatch(ViewExamDataRess(getexamType_body));
    }
  }, [exam]);

  useEffect(() => {
    if (SubList?.length > 0) {
      const startTime = SubList[0]?.startTime || '';
      const endTime = SubList[0]?.endTime || '';
      setStartTime(startTime);
      setEndTime(endTime);
    }
  }, [SubList]);

  const getTime = (startTime, endTime) => {
    const [startHours, startMinutes, startPeriod] = startTime.split(/:|\s/);
    let adjustedStartHours =
      parseInt(startHours, 10) + (startPeriod === 'PM' ? 12 : 0);
    const [endHours, endMinutes, endPeriod] = endTime.split(/:|\s/);
    let adjustedEndHours =
      parseInt(endHours, 10) + (endPeriod === 'PM' ? 12 : 0);

    const startDate = new Date();
    startDate.setHours(adjustedStartHours);
    startDate.setMinutes(parseInt(startMinutes, 10));

    const endDate = new Date();
    endDate.setHours(adjustedEndHours);
    endDate.setMinutes(parseInt(endMinutes, 10));

    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const hours1 = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes2 = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return hours1 + ' hrs ' + minutes2 + ' mins';
  };

  const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

  const getExamName = () => {
    const selectedExam = getExamlist.find((Item) => Item.Value === exam);
    return selectedExam ? selectedExam.Name : '';
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
            {getExamlist.length > 0 ? (
              <Box sx={{ width: '200px', mr: 2 }}>
                <Dropdown
                  Array={getExamlist}
                  handleChange={examChange}
                  label={'Select Exam'}
                  size={'small'}
                  variant="outlined"
                  defaultValue={exam}
                />
              </Box>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No exam has been scheduled</b>
              </Typography>
            )}
            <Box>
              <Tooltip title="Display Standardwise Exam Schedule.">
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

      {exam && (
        <Box
          sx={{
            mt: 2,
            cursor: 'pointer',
            backgroundColor: '#FFC0CB',
            padding: '7px',
            border: '1px solid brown',
            borderRadius: '3px',
          }}
          onClick={() => setShowCardData(!showCardData)}
        >
          <Typography variant="h6" sx={{ color: '#654321' }}>
            <b>{getExamName()}</b>
          </Typography>
        </Box>
      )}

      {showCardData && SubList?.length > 0 ? (
        <Box sx={{ background: 'white', p: 2, mt: 2 }}>
          {loading ? (
            <SuspenseLoader />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Standards</TableCell>
                    {classList.map((className) => (
                      <TableCell key={className}>{className}</TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time & Duration</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Instructions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {SubList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.text3 || '--'}</TableCell>
                      <TableCell>
                        {item.startTime} - {item.endTime}
                        <br />
                        ({getTime(item.startTime, item.endTime)})
                      </TableCell>
                      {classList.map((className) => (
                        <TableCell key={`${className}-${index}`}>
                          {item.Standard_Name === className ? item.header || '--' : '--'}
                        </TableCell>
                      ))}
                      <TableCell sx={{ color: 'blue' }}>{item.Instructions || '--'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
          <b>No exam has been scheduled</b>
        </Typography>
      )}
    </Box>
  );
};

export default TExamScheduleNew;
