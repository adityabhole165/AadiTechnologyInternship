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
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';


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
    localStorage.setItem("url",window.location.pathname)
  },[])

  useEffect(() => {
    dispatch(getAttendanceList(body));
    GetAttendanceresult(body);
  }, [month, year]);

  const AttendanceTopper=()=>{
    navigate ('AttendanceTopper')
  }
  

  return (
    <Container>
      <PageHeader heading={'Attendance'} subheading={''} />
      <Box sx={{mb:"15px" , float:"right"}} >
      <ButtonPrimary onClick={AttendanceTopper} >Attendance Toppers </ButtonPrimary>
      </Box>
      
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
              header='School working days '
              text3={AttendanceData.TotalAttendanceDays}
              text2="" text1="" text4="" text5="" text6="" Color="" margin="" Textcolor=''
            />
            <Card1
              header='Total present days '
              text3={AttendanceData.PresentDays}
              text2="" text1="" text4="" text5="" text6="" Color="" margin="" Textcolor=''
            />
            <Card1
              header=' Total absent days'
              text3={
                Number(AttendanceData.TotalAttendanceDays) -
                Number(AttendanceData.PresentDays)
              }
              text2="" text1="" text4="" text5="" text6="" Color="" margin="" Textcolor=''
            />
          </>
        )}
      </Box>
    </Container>
  );
}

export default Attendance;
