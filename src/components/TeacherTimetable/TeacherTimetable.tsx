import QuestionMark from "@mui/icons-material/QuestionMark"
import { Box, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, alpha, styled } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody, IGetTeacherTimeTableBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody } from "src/interfaces/WeeklyTimeTable/IWeeklyTimetable"
import { GetDataForAdditionalClasses, GetLectureCountsForTeachers, GetTeacherTimeTableResult } from "src/requests/Teacher/TMtimetable"
import { CDAGetLectureNoWeekday, CDAGetTeacherSubjectMaxLecDetailsForWeekDays } from "src/requests/WeeklyTimeTable/RequestWeeklyTimeTable"
import { RootState } from "src/store"
import CommonPageHeader from "../CommonPageHeader"

type Props = {}

const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: '#19bed4',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  textAlign: 'center',
  border: '1px solid rgba(224, 224, 224, 1)',

}))
const StyledCell1 = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  border: '1px solid rgba(224, 224, 224, 1)'
}))

const FooterStyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.4),
  fontWeight: 'bold',
  textAlign: 'center',
  border: '1px solid rgba(224, 224, 224, 1)',
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // height: '60px',
  textAlign: 'center',
  border: '1px solid rgba(224, 224, 224, 1)',
}))

const TeacherTimetable = () => {
  const dispatch = useDispatch();
  const TimeTableList = useSelector((state: RootState) => state.TMTimetable.ISGetTeacherTimeTableResult);
  const ApplicablesData = useSelector((state: RootState) => state.TMTimetable.ISApplicables);
  const ApplicablesToggleData = useSelector((state: RootState) => state.WeeklyTimetable.ISGetApplicables);
  const LectureCountsForTeachers = useSelector((state: RootState) => state.TMTimetable.ISGetLectureCountsForTeachers);
  const AdditionalClasses = useSelector((state: RootState) => state.TMTimetable.ISGetDataForAdditionalClasses);
  const TimetableDetails = useSelector((state: RootState) => state.WeeklyTimetable.ISTimetableDetails);
  const ExtLectCount = useSelector((state: RootState) => state.WeeklyTimetable.ISExtLectCount);
  const TeacherTimetableCellValues = useSelector((state: RootState) => state.WeeklyTimetable.ISGetLectureNoWeekday);
  const WeekdayIds = useSelector((state: RootState) => state.WeeklyTimetable.ISWeekdayId);
  const MondayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForMon);
  const TuesdayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForTue);
  const WednesdayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForWed);
  const ThursdayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForThu);
  const FridayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForFri);
  const weeklyTestInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISWeeklytestInfo);
  const mptInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISMPTinfo);
  const AssemblyInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISAssemblyInfo);
  const StayBackInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISStayBackInfo);
  const [assembly, setAssembly] = useState<boolean>(false);
  const [mpt, setMPT] = useState<boolean>(false);
  const [stayback, setStayback] = useState<boolean>(false);
  const [weeklytest, setWeekly] = useState<boolean>(false);
  const [trackTeacherTimetable, setTrackTeacherTimetable] = useState({});

  // Following f() is for Calculating the total Lec. count for each WeekDay
  const [MonCount, setMonCount] = useState<Number>();
  const [TueCount, setTueCount] = useState<Number>();
  const [WedCount, setWedCount] = useState<Number>();
  const [ThuCount, setThuCount] = useState<Number>();
  const [FriCount, setFriCount] = useState<Number>();

  useEffect(() => {
    const TeacherTimetableBody: IGetTeacherTimeTableBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
      asTeacher_Id: Number(sessionStorage.getItem('TeacherId'))
    }
    const WeekDayTeacherBody: IGetTimeTableForTeacherBody = {
      asSchoolId: Number(localStorage.getItem('SchoolId')),
      asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asTeacherID: Number(sessionStorage.getItem('TeacherId')),
    }
    const IGetTeacherSubjectMaxLecForWeekDay: IGetTeacherSubjectMaxLecDetailsBody = {
      asSchoolId: Number(localStorage.getItem('SchoolId')),
      asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asTeacherId: Number(sessionStorage.getItem('TeacherId')),
      asStandardDivId: Number(sessionStorage.getItem('StandardDivisionId')),
    }
    dispatch(GetTeacherTimeTableResult(TeacherTimetableBody))
    dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
    dispatch(CDAGetTeacherSubjectMaxLecDetailsForWeekDays(IGetTeacherSubjectMaxLecForWeekDay))
    console.log(TimeTableList)
  }, [])

  // Following Functions are to Check whether the current ` TEACHER ` Time-Table Cell has any External Lec. (i.e, MPT, Assembly, Stayback, Weekly Test)
  function isMPTLecture(weekDay, lectureNo) {
    let isPresent = mptInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
    isPresent !== undefined ? true : false;
    return isPresent;
  }

  function isAssemblyLecture(weekDay, lectureNo) {
    let isPresent = AssemblyInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
    isPresent !== undefined ? true : false;
    return isPresent;
  }

  function isStaybackLecture(weekDay, lectureNo) {
    console.log(StayBackInfo)
    console.log(weekDay, lectureNo)
    let isPresent = StayBackInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
    isPresent !== undefined ? true : false;
    return isPresent;
  }

  function isWeeklyTestLecture(weekDay, lectureNo) {
    let isPresent = weeklyTestInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
    isPresent !== undefined ? true : false;
    return isPresent;
  }

  useEffect(() => {
    if (ApplicablesToggleData.length > 0 && Object.keys(trackTeacherTimetable).length > 0 && TeacherTimetableCellValues.length > 0) {
      let WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const daySetters = {
        Monday: setMonCount,
        Tuesday: setTueCount,
        Wednesday: setWedCount,
        Thursday: setThuCount,
        Friday: setFriCount
      };
      WeekDays.forEach(day => {
        let dayCount = TeacherTimetableCellValues.reduce((total, item) => {
          let mptCount = 0;
          let assemblyCount = 0;
          let staybackCount = 0;
          let weeklytestCount = 0;
          let lecNo = 0;
          const dayMapping = {
            'Monday': item.Text2 !== '0', 'Tuesday': item.Text3 !== '0', 'Wednesday': item.Text4 !== '0', 'Thursday': item.Text5 !== '0', 'Friday': item.Text6 !== '0'
          };
          if (item.Text1 !== '99') {
            mptCount = mpt && isMPTLecture(day, item.Text1) ? 1 : 0;
            assemblyCount = assembly && isAssemblyLecture(day, item.Text1) ? 1 : 0;
            staybackCount = stayback && isStaybackLecture(day, item.Text1) ? 1 : 0;
            weeklytestCount = weeklytest && isWeeklyTestLecture(day, item.Text1) ? 1 : 0;
            lecNo = dayMapping[day] ? 1 : 0;
          }
          return total + mptCount + assemblyCount + staybackCount + weeklytestCount + lecNo;
        }, 0);
        daySetters[day](Number(dayCount));
      });
    }
  }, [TeacherTimetableCellValues, trackTeacherTimetable, ApplicablesToggleData, assembly, mpt, stayback, weeklytest, StayBackInfo, weeklyTestInfo, AssemblyInfo, mptInfo]);



  useEffect(() => {
    if (ApplicablesToggleData.length > 0) {
      ApplicablesToggleData.map((item, i) => {
        setAssembly(item.Assembly === 'Y' ? true : false);
        setMPT(item.MPT === 'Y' ? true : false);
        setWeekly(item.Weeklytest === 'Y' ? true : false);
        setStayback(item.Stayback === 'True' ? true : false);
      })
    }
  }, [ApplicablesToggleData])

  useEffect(() => {
    if (ApplicablesData.length != 0) {
      const GetLectureCountsForTeachersBody: IGetLectureCountsForTeachersBody = {
        asSchoolId: Number(localStorage.getItem('localSchoolId')),
        asTeacher_Id: Number(sessionStorage.getItem('TeacherId')),
        asConsiderAssembly: ApplicablesData[0].Assemble,
        asConsiderMPT: ApplicablesData[0].MPT,
        asConsiderStayback: "Y",
        asConsiderWeeklyTest: "Y"
      }
      console.log("teacher count ", LectureCountsForTeachers)
      dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
    }


  }, [ApplicablesData])


  useEffect(() => {
    if (TeacherTimetableCellValues.length > 0 && WeekdayIds.length > 0 && MondayColumnList?.length > 0 && TuesdayColumnList?.length > 0 && WednesdayColumnList?.length > 0 && ThursdayColumnList?.length > 0 && FridayColumnList?.length > 0) {
      setTrackTeacherTimetable({});
      const abc = {};
      const WeekDaydropdownList = [MondayColumnList, TuesdayColumnList, WednesdayColumnList, ThursdayColumnList, FridayColumnList];
      // Get weekday IDs
      const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
      // Process Lecture_No_WeekDay data
      TeacherTimetableCellValues.forEach(lecture => {
        const lectureNo = lecture.Text1;
        ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
          let art = WeekDaydropdownList[index].filter(item => item.Id === lecture[day])
          const key = `${weekdayIds[index]}-${lectureNo}`;
          abc[key] = `${lecture[day]}-${weekdayIds[index]}-${art[0]?.StdDivId === undefined ? '0' : art[0]?.StdDivId}-${art[0]?.SubId === undefined ? '0' : art[0]?.SubId}-${lectureNo}`;

        });
      });
      setTrackTeacherTimetable(abc);
    }
  }, [TeacherTimetableCellValues, WeekdayIds, MondayColumnList, TuesdayColumnList, WednesdayColumnList, ThursdayColumnList, FridayColumnList])


  useEffect(() => {
    const AdditionalLectureBody: IGetDataForAdditionalClassesBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
      asTeacher_Id: Number(sessionStorage.getItem('TeacherId')),
      asStandardDivision_Id: Number(sessionStorage.getItem('StandardDivisionId'))
    }
    dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
  }, [])

  const HeaderArray = [
    { Id: 1, Header: 'WeekDays >>' },
    { Id: 2, Header: 'Monday' },
    { Id: 3, Header: 'Tuesday' },
    { Id: 4, Header: 'Wednesday' },
    { Id: 5, Header: 'Thursday' },
    { Id: 6, Header: 'Friday' },
  ];
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    if (TimeTableList.length > 0) {
      TimeTableList.map((item, i) => {
        if (item.Text1 === "Total Lectures" && item.Text2 === "0" && item.Text3 === "0" && item.Text4 === "0" && item.Text5 === "0" && item.Text6 === "0") {
          setIsEmpty(true)
        } else {
          setIsEmpty(false)
        }
      })
    }
  }, [TimeTableList])
  // lecture count table f()
  function countSubIdOccurrences(subId, stdDivId) {
    let count = 0;
    if (Object.keys(trackTeacherTimetable).length > 0) {
      for (const key in trackTeacherTimetable) {
        if (trackTeacherTimetable.hasOwnProperty(key)) {
          const value = trackTeacherTimetable[key];
          const [, , currentStdDivId, currentSubId] = value.split('-'); // Extract the SubId part

          if (currentSubId === subId && currentStdDivId === stdDivId) {
            count++;
          }
        }
      }
    }
    return count;
  }
  //

  function hadExternalLecLabel(dayName, lecNumber) {
    let lecNo = lecNumber.split(' ')[1];
    if (isMPTLecture(dayName, lecNo)) {
      return `<b><font color=\"#017df6\" face=\"Verdana\" size=\"2\">M.P.T</font></b><br/><font color=\"#000000\" face=\"Verdana\" size=\"1\">`
    } else if (isAssemblyLecture(dayName, lecNo)) {
      return `<b><font color=\"#017df6\" face=\"Verdana\" size=\"2\">Assembly</font></b><br/><font color=\"#000000\" face=\"Verdana\" size=\"1\">`
    } else if (isWeeklyTestLecture(dayName, lecNo)) {
      return `<b><font color=\"#017df6\" face=\"Verdana\" size=\"2\">Weekly Test</font></b><br/><font color=\"#000000\" face=\"Verdana\" size=\"1\">`
    } else if (isStaybackLecture(dayName, lecNo)) {
      return `<b><font color=\"#017df6\" face=\"Verdana\" size=\"2\">Stayback</font></b><br/><font color=\"#000000\" face=\"Verdana\" size=\"1\">`
    } else {
      return ''
    }
  }


  return (
    <>
      {/* <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            { title: 'Timetable', path: '/extended-sidebar/teacher-timetable' }
          ]}
          rightActions={
            <>
              <Tooltip title={'Timetable'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[600]
                    }
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
            </>
          }
        />

        <TableContainer component={Card}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow>
                {HeaderArray.map((item, i) => (
                  <TableCell align={'center'} key={i} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white' }}>
                    <b>{item.Header}</b>
                  </TableCell>
                ))}
              </TableRow>

            </TableHead>
            <TableBody>
              {TimeTableList?.map((item, i) => (

                <TableRow key={i}>
                  <TableCell align={'center'} dangerouslySetInnerHTML={{ __html: item.Text1 }} />
                  <TableCell align={'center'} dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                  <TableCell align={'center'} dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                  <TableCell align={'center'} dangerouslySetInnerHTML={{ __html: item.Text4 }} />
                  <TableCell align={'center'} dangerouslySetInnerHTML={{ __html: item.Text5 }} />
                  <TableCell align={'center'} dangerouslySetInnerHTML={{ __html: item.Text6 }} />
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}

      <Box sx={{ mb: 5, mx: 2 }}>
        <CommonPageHeader
          navLinks={[
            { title: 'Timetable', path: '/extended-sidebar/teacher-timetable' }
          ]}
          rightActions={
            <>
              <Tooltip title={'Your timetable for the week'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[600]
                    }
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
            </>
          }
        />


        {isEmpty &&
          <Box sx={{ background: 'white', p: 2 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>Timetable not yet configured.</b>
            </Typography>
          </Box>
        }

        {!isEmpty &&
          <Box sx={{ p: 2, background: 'white' }}>
            <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'}>
              {/* <Typography variant={"h4"}>Weekly Timetable for Mr. Devendra Kumar</Typography> */}

            </Stack>
            <Box sx={{ mt: 1 }}>
              <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'}>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>


                  <Typography variant="h6" sx={{ color: blue[500], mr: 1 }}>
                    Legend:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid black',
                        fontWeight: 'bold',
                        mr: 1,
                        // backgroundColor: grey[300],
                        borderRadius: '4px',
                        padding: '4px'
                      }}
                    >
                      N / C
                    </Box>
                    <Typography>Not Configured</Typography>
                  </Box>
                </Box>
              </Stack> <br />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {HeaderArray.map((item, i) => (
                        <HeaderStyledCell>{item.Header}</HeaderStyledCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Loopable content */}
                    {TimeTableList?.map((item, i) => (
                      item.Text1 === 'Total Lectures' ?
                        // <TableRow key={i}>
                        //   <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text1 }} />
                        //   <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                        //   <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                        //   <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text4 }} />
                        //   <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text5 }} />
                        //   <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text6 }} />

                        // </TableRow>
                        <TableRow>
                          {Object.keys(trackTeacherTimetable).length > 0 && <>
                            <FooterStyledCell>{'Total Lectures'}</FooterStyledCell>
                            <FooterStyledCell>{ApplicablesToggleData.length > 0 && MonCount}</FooterStyledCell>
                            <FooterStyledCell>{ApplicablesToggleData.length > 0 && TueCount}</FooterStyledCell>
                            <FooterStyledCell>{ApplicablesToggleData.length > 0 && WedCount}</FooterStyledCell>
                            <FooterStyledCell>{ApplicablesToggleData.length > 0 && ThuCount}</FooterStyledCell>
                            <FooterStyledCell>{ApplicablesToggleData.length > 0 && FriCount}</FooterStyledCell>
                          </>}
                        </TableRow>
                        :
                        <TableRow key={i}>
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text1 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: hadExternalLecLabel('Monday', item.Text1) !== '' ? hadExternalLecLabel('Monday', item.Text1) : item.Text2 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: hadExternalLecLabel('Tuesday', item.Text1) !== '' ? hadExternalLecLabel('Tuesday', item.Text1) : item.Text3 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: hadExternalLecLabel('Wednesday', item.Text1) !== '' ? hadExternalLecLabel('Wednesday', item.Text1) : item.Text4 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: hadExternalLecLabel('Thursday', item.Text1) !== '' ? hadExternalLecLabel('Thursday', item.Text1) : item.Text5 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: hadExternalLecLabel('Friday', item.Text1) !== '' ? hadExternalLecLabel('Friday', item.Text1) : item.Text6 }} />
                        </TableRow>
                    ))}
                    {/* <TableRow>
                    <StyledCell>1</StyledCell>
                    <StyledCell>

                    </StyledCell>
                    <StyledCell>

                    </StyledCell>
                    <StyledCell>

                    </StyledCell>
                    <StyledCell>

                    </StyledCell>
                    <StyledCell>

                    </StyledCell> */}
                    {/* </TableRow> */}
                    {/* Fixed Footer */}

                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Stack direction={"row"} gap={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5 }}>Class-Subject Lecture Count</Typography>
                <TableContainer sx={{ width: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <HeaderStyledCell>Class Subjects</HeaderStyledCell>
                        <HeaderStyledCell>Lecture Count</HeaderStyledCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Loopable content */}
                      {LectureCountsForTeachers?.map((item, i) => {
                        // Determine the value of Text3 based on the flags and item.Text2
                        let displayText3;
                        const [mptCount, staybackCount, assemblyCount, weeklytestCount] = ExtLectCount?.split('-');
                        switch (item.Text2) {
                          case 'Assembly':
                            displayText3 = assembly ? item.Text3 : '0';
                            break;
                          case 'M.P.T.':
                            displayText3 = mpt ? item.Text3 : '0';
                            break;
                          case 'Stay Back':
                            displayText3 = stayback ? item.Text3 : '0';
                            break;
                          case 'Weekly Tests':
                            displayText3 = weeklytest ? item.Text3 : '0';
                            break;
                          default:
                            displayText3 = item.Text3; // Default to Text3 for any other cases
                            break;
                        }
                        function countNonZeroPatterns() {
                          let count = 0;

                          for (const key in trackTeacherTimetable) {
                            if (trackTeacherTimetable.hasOwnProperty(key)) {
                              const value = trackTeacherTimetable[key];
                              const parts = value?.split('-'); // Split the string by '-'

                              // Check if all parts except LecNo are non-zero (assuming LecNo is the last part)
                              const allNonZero = parts.slice(0, -1).every(part => part !== '0');

                              if (allNonZero) {
                                count++;
                              }
                            }
                          }

                          return count;
                        }

                        return (
                          item.Text2 === 'Total Weekly Lectures' ? (
                            <TableRow key={i}>
                              <FooterStyledCell sx={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                              <FooterStyledCell sx={{ textAlign: 'center' }}>{countNonZeroPatterns() + (mpt && Number(mptCount)) + (stayback && Number(staybackCount)) + (weeklytest && Number(weeklytestCount)) + (assembly && Number(assemblyCount))}</FooterStyledCell>
                            </TableRow>
                          ) : !['Assembly', 'M.P.T.', 'Stay Back', 'Weekly Tests'].includes(item.Text2) ? (
                            <TableRow key={i}>
                              <StyledCell1 sx={{ textAlign: 'left' }} >{item.Text2}</StyledCell1>
                              <StyledCell1 sx={{ textAlign: 'center' }} >{countSubIdOccurrences(item.Text5, item.Text4)}</StyledCell1>
                            </TableRow>
                          ) : (
                            <TableRow key={i}>
                              <StyledCell1 sx={{ textAlign: 'left' }} >{item.Text2}</StyledCell1>
                              <StyledCell1 sx={{ textAlign: 'center' }} >{displayText3}</StyledCell1>
                            </TableRow>
                          )
                        )
                      })}


                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ flex: 1 }}>

                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5 }}>
                  Additional Lectures
                </Typography>
                {/* WeekDay	Lecture Number	Class	Subject */}
                {AdditionalClasses.length === 0 &&

                  <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 30, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>No additional lectures assigned.</b>
                  </Typography>
                }

                {AdditionalClasses.length > 0 &&
                  <TableContainer sx={{ width: '100%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <HeaderStyledCell>WeekDay</HeaderStyledCell>
                          <HeaderStyledCell>Lecture Number</HeaderStyledCell>
                          <HeaderStyledCell>Class</HeaderStyledCell>
                          <HeaderStyledCell>Subject </HeaderStyledCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* Loopable content */}
                        {TimetableDetails.map((item, i) => (
                          <TableRow>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '10px', paddingBottom: '10px' }}>{item.Text2}</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>{item.Text1}</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>{item.Text4}</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '10px', paddingBottom: '10px', textAlign: 'left' }}>{item.Text3}</TableCell>

                          </TableRow>
                        ))}

                        {/* Fixed Footer */}

                      </TableBody>
                    </Table>
                  </TableContainer>
                }

              </Box>
            </Stack>
          </Box>
        }

      </Box >

    </>
  )
}

export default TeacherTimetable
