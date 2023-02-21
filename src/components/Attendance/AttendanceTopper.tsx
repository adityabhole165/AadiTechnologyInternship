import { FormControl, FormControlLabel, InputLabel, Select,MenuItem, Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getStudentAttendance, getAttendanceDetails, getAcademicYearsForOldAttendance } from 'src/requests/Attendance/Attendance'
import BackButton from 'src/libraries/button/BackButton';
import { IGetAcademicYearsForOldAttendanceBody, IGetAttendanceToppersBody } from 'src/interfaces/Student/Attendance';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
// import Card35 from 'src/libraries/card/Card35';

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

  const GetAcademicYearsForOldAttendanceBody: IGetAcademicYearsForOldAttendanceBody = {
    aiSchoolId: asSchoolId,
    aiStudentId: asStudentId,
    abIncludeCurrentYear: asAcademicYear
  }

  useEffect(() => {
    dispatch(getAcademicYearsForOldAttendance(GetAcademicYearsForOldAttendanceBody));
  }, []);


  const GetAttendanceToppersBody: IGetAttendanceToppersBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYear,
    StandardDivisionId: asStandardDivision,
    TopRanker: "3",
    aiStudentId: asStudentId
  }
  useEffect(() => {
    dispatch(getStudentAttendance(GetAttendanceToppersBody));
    dispatch(getAttendanceDetails(GetAttendanceToppersBody));
  }, []);


 
  const [academicyear,setAcademicYear]= useState("");

  const ClickAcademicYear =(value)=>{
    setAcademicYear(value);
  };

  

  return (
    <div>
      <Container>
        <PageHeader heading={'Attendance Toppers'} subheading={''} />
        <BackButton FromRoute={"/Student/Attendance"} />
        
        <FormControl fullWidth>
                    <InputLabel variant="standard">Select Academic Year</InputLabel>
                    <Dropdown
                        Array={GetAcademicYearsForOldAttendance}
                        handleChange={ClickAcademicYear}
                        defaultValue={academicyear}
                    />
                </FormControl>
                
          <Box sx={{ paddingTop: "25px", textAlign: "center" }}>Your Attendance</Box>
          
          




    

      </Container>
    </div>
  )
}

export default AttendanceTopper

