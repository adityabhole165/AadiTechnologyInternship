import QuestionMark from "@mui/icons-material/QuestionMark"
import { Box, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IGetTeacherTimeTableBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { GetTeacherTimeTableResult } from "src/requests/Teacher/TMtimetable"
import { RootState } from "src/store"
import CommonPageHeader from "../CommonPageHeader"

const TeacherTimetable = () => {
  const dispatch = useDispatch();
  const TimeTableList = useSelector((state: RootState) => state.TMTimetable.ISGetTeacherTimeTableResult);

  useEffect(() => {
    const TeacherTimetableBody: IGetTeacherTimeTableBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
      asTeacher_Id: Number(sessionStorage.getItem('TeacherId'))
    }
    dispatch(GetTeacherTimeTableResult(TeacherTimetableBody))
    console.log(TimeTableList)
  }, [])

  const HeaderArray = [
    { Id: 1, Header: 'WeekDays >>' },
    { Id: 2, Header: 'Monday' },
    { Id: 3, Header: 'Tuesday' },
    { Id: 4, Header: 'Wednesday' },
    { Id: 5, Header: 'Thursday' },
    { Id: 6, Header: 'Friday' },
  ];



  return (
    <>
      <Box sx={{ px: 2 }}>
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
      </Box>
    </>
  )
}

export default TeacherTimetable
