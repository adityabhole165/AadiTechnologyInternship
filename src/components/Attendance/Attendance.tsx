import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calender1 } from 'src/components/Attendance/Calender';
import {
  GetStudentAttendaceForMonthResult,
  IAttendance
} from 'src/interfaces/Student/Attendance';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card1 from 'src/libraries/mainCard/Card1';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import DotLegend from 'src/libraries/summary/summary';
import { getAttendanceList } from 'src/requests/Attendance/Attendance';
import http from 'src/requests/SchoolService/schoolServices';

function Attendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    localStorage.setItem('url', window.location.pathname);
  }, []);

  useEffect(() => {
    dispatch(getAttendanceList(body));
    GetAttendanceresult(body);
  }, [month, year]);

  const AttendanceTopper = () => {
    navigate('AttendanceTopper', { state: { fromInternal: true } });
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Attendance'} subheading={''} />
      <Box sx={{ mb: '15px', float: 'right' }}>
        <ButtonPrimary onClick={AttendanceTopper}>
          Attendance Toppers{' '}
        </ButtonPrimary>
      </Box>

      <DotLegend />
      <br />
      <Box sx={{ marginTop: '-10px', marginBottom: '10px' }}>
        <Calender1
          month={setMonth}
          year={setYear}
          AttendenceData={AttendanceData?.DailyAttendanceList}
        />
      </Box>
      <Box>
        {AttendanceData === undefined ? null : (
          <>
            <Card1
              header="School working days "
              text3={AttendanceData.TotalAttendanceDays}
              text2=""
              text1=""
              text4=""
              text5=""
              text6=""
              Color=""
              margin=""
              Textcolor=""
            />
            <Card1
              header="Total present days "
              text3={AttendanceData.PresentDays}
              text2=""
              text1=""
              text4=""
              text5=""
              text6=""
              Color=""
              margin=""
              Textcolor=""
            />
            <Card1
              header=" Total absent days"
              text3={(
                Number(AttendanceData.TotalAttendanceDays) -
                Number(AttendanceData.PresentDays)
              ).toString()}
              text2=""
              text1=""
              text4=""
              text5=""
              text6=""
              Color=""
              margin=""
              Textcolor=""
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export default Attendance;
