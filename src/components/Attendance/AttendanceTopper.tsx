import { FormControl, FormControlLabel, InputLabel, Select, MenuItem, Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getStudentAttendance, getAttendanceDetails, getAcademicYearsForOldAttendance } from 'src/requests/Attendance/Attendance'
import BackButton from 'src/libraries/button/BackButton';
import { IGetAcademicYearsForOldAttendanceBody, IGetAttendanceToppersBody } from 'src/interfaces/Student/Attendance';
import PageHeader from 'src/libraries/heading/PageHeader';
import DropdownAllSelect from 'src/libraries/dropdown/DropdownAllSelect';
import Card35 from 'src/libraries/card/Card35';


function AttendanceTopper() {
  const dispatch = useDispatch()

  const GetStudentAttendance: any = useSelector(
    (state: RootState) => state.Attendance.GetStudentAttendance
  );


  const GetAttendanceDetails: any = useSelector(
    (state: RootState) => state.Attendance.GetAttendanceDetails
  );

  const GetAcademicYearsForOldAttendance: any = useSelector(
    (state: RootState) => state.Attendance.GetAcademicYearsForOldAttendance
  )


  const asSchoolId = (localStorage.getItem('localSchoolId'));
  const asStudentId = (sessionStorage.getItem('StudentId'));
  const asAcademicYear = (sessionStorage.getItem('AcademicYearId'));
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));

  const [academicyear, setAcademicYear] = useState("");


  useEffect(() => {
    const GetAcademicYearsForOldAttendanceBody: IGetAcademicYearsForOldAttendanceBody = {
      aiSchoolId: asSchoolId,
      aiStudentId: asStudentId,
      abIncludeCurrentYear: academicyear
    }
    dispatch(getAcademicYearsForOldAttendance(GetAcademicYearsForOldAttendanceBody));
  }, []);

  console.log("asStudentId",asStudentId)

  useEffect(() => {
    setAcademicYear(asAcademicYear);
  }, [GetAcademicYearsForOldAttendance]);


  useEffect(() => {
    if (academicyear !== "") {
      const GetAttendanceToppersBody: IGetAttendanceToppersBody = {
        aiSchoolId: asSchoolId,
        aiAcademicYearId: asAcademicYear,
        StandardDivisionId: asStandardDivision,
        TopRanker: "3",

        aiStudentId: asStudentId
      }
      dispatch(getStudentAttendance(GetAttendanceToppersBody));
    }
  }, [academicyear]);



  const ClickAcademicYear = (value) => {
    setAcademicYear(value);
  };

  
   


  return (
    <div>
      <Container>
        <PageHeader heading={'Attendance Toppers'} subheading={''} />
        <BackButton FromRoute={"/Student/Attendance"} />

        <FormControl fullWidth>
          <Typography> Select Academic Year</Typography>
          <DropdownAllSelect
            Array={GetAcademicYearsForOldAttendance}
            handleChange={ClickAcademicYear}
            defaultValue={academicyear}
          />
        </FormControl>
        <Box sx={{ paddingTop: "25px", textAlign: "center" }}>Your Attendance</Box>
        {(
          GetStudentAttendance !== undefined &&
          GetStudentAttendance.length > 0) && 
          <Card35 header={{ Header: GetStudentAttendance }} />}

        <Box sx={{ paddingTop: "25px", textAlign: "center" }}>Attendance Topper</Box>

         {(
          GetAttendanceDetails !== undefined &&
          GetAttendanceDetails.length > 0) && 
          <Card35 header={{ Header: GetAttendanceDetails }} />}

      </Container>
    </div>
  )
}

export default AttendanceTopper

