import QuestionMark from "@mui/icons-material/QuestionMark"
import { Box, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, alpha, styled } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody, IGetTeacherTimeTableBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { GetDataForAdditionalClasses, GetLectureCountsForTeachers, GetTeacherTimeTableResult } from "src/requests/Teacher/TMtimetable"
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
  const LectureCountsForTeachers = useSelector((state: RootState) => state.TMTimetable.ISGetLectureCountsForTeachers);
  const AdditionalClasses = useSelector((state: RootState) => state.TMTimetable.ISGetDataForAdditionalClasses);

  useEffect(() => {
    const TeacherTimetableBody: IGetTeacherTimeTableBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
      asTeacher_Id: Number(sessionStorage.getItem('TeacherId'))
    }
    dispatch(GetTeacherTimeTableResult(TeacherTimetableBody))
    console.log(TimeTableList)
  }, [])

  useEffect(() => {
    if (ApplicablesData.length != 0) {
      const GetLectureCountsForTeachersBody: IGetLectureCountsForTeachersBody = {
        asSchoolId: Number(localStorage.getItem('localSchoolId')),
        asTeacher_Id: Number(sessionStorage.getItem('TeacherId')),
        asConsiderAssembly: ApplicablesData[0].Assemble,
        asConsiderMPT: ApplicablesData[0].MPT,
        asConsiderStayback: ApplicablesData[0].Stayback,
      }
      console.log("teacher count ", LectureCountsForTeachers)
      dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
    }


  }, [ApplicablesData])

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
              <b>Timetable not yet Configured.</b>
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
                        <TableRow>
                          <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text1 }} />
                          <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                          <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                          <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text4 }} />
                          <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text5 }} />
                          <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text6 }} />

                        </TableRow>
                        :
                        <TableRow>
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text1 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text4 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text5 }} />
                          <StyledCell dangerouslySetInnerHTML={{ __html: item.Text6 }} />
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
                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 2 }}>Class-Subject Lecture Count</Typography>
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
                      {LectureCountsForTeachers?.map((item, i) => (
                        item.Text2 === 'Total Weekly Lectures' ?
                          <TableRow>
                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                          </TableRow>
                          :
                          <TableRow>
                            <StyledCell>{item.Text2}</StyledCell>
                            <StyledCell>{item.Text3}</StyledCell>
                          </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ flex: 1 }}>

                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 2 }}>
                  Additional Lectures
                </Typography>
                {/* WeekDay	Lecture Number	Class	Subject */}
                {AdditionalClasses.length === 0 &&

                  <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 30, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>No Additional Lectures Assigned.</b>
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
                        {AdditionalClasses.map((item, i) => (
                          <TableRow>
                            <StyledCell>{item.Text1}</StyledCell>
                            <StyledCell>{item.Text2}</StyledCell>
                            <StyledCell>{item.Text3}</StyledCell>
                            <StyledCell>{item.Text4}</StyledCell>
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
