import { IAttendance } from 'src/interfaces/Student/Attendance';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PageHeader from 'src/libraries/heading/PageHeader';
import { RootState } from 'src/store';
import { useEffect } from 'react';
import { getAttendanceList } from 'src/requests/Attendance/Attendance';
import DotLegend from 'src/libraries/summary/summary';
import { Box, Container } from '@mui/material';
import { GetStudentAttendaceForMonthResult } from 'src/interfaces/Student/Attendance';
import http from 'src/requests/SchoolService/schoolServices';
import { useState } from 'react';
import Card1 from 'src/libraries/mainCard/Card1';
import { Calender1 } from 'src/components/Attendance/Calender';

function Attendance() {
  const dispatch = useDispatch();

  const Attendance = useSelector(
    (state: RootState) => state.Attendance.DailyAttendanceList
  );
  const attendance = {
    Title1: 'Total present days ',
    Title2: 'School working days ',
    Title3: ' Total absent days'
  };

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [AttendanceData, setAttendanceData] =
    useState<GetStudentAttendaceForMonthResult>();

  const body: IAttendance = {
    asStandardId: asStandardId,
    asDivisionId: asDivisionId,
    asStudentId: asStudentId,
    asMonth: month,
    asYear: year,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const GetAttendanceresult = (body) => {
    http
      .post('Student/GetStudentAttendaceForMonth', body)
      .then((resp) => resp.data.GetStudentAttendaceForMonthResult)
      .then((data) => {
        setAttendanceData(data);
      });
  };
  
  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
  },[])

  useEffect(() => {
    dispatch(getAttendanceList(body));
    GetAttendanceresult(body);
  }, [month, year]);

  return (
    <Container>
      <PageHeader heading={'Attendance'} subheading={''} />
      <DotLegend />
      <br />
      <Box sx={{ marginTop: '-10px' ,marginBottom:"10px"}}>
        <Calender1
          month={setMonth}
          year={setYear}
          AttendenceData={AttendanceData?.DailyAttendanceList}
        />
      </Box>
      <Box >
        {AttendanceData === undefined ? null : (
          <>
            <Card1
              header={attendance.Title2}
              text3={AttendanceData.TotalAttendanceDays}
              text2="" text1="" text5="" Color="" margin=""
            />
            <Card1
              header={attendance.Title1}
              text3={AttendanceData.PresentDays}
              text2="" text1="" text5="" Color="" margin=""
            />
            <Card1
              header={attendance.Title3}
              text3={
                Number(AttendanceData.TotalAttendanceDays) -
                Number(AttendanceData.PresentDays)
              }
              text2="" text1="" text5="" Color="" margin=""
            />
          </>
        )}
      </Box>
    </Container>
  );
}

export default Attendance;
