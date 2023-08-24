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
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';


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

  const [academicyear, setAcademicYear] = useState(asAcademicYear);
  const [selectedYear, setselectedYear] = useState(null)



  useEffect(() => {
    const GetAcademicYearsForOldAttendanceBody: IGetAcademicYearsForOldAttendanceBody = {
      aiSchoolId: asSchoolId,
      aiStudentId: asStudentId,
      abIncludeCurrentYear: academicyear
    }

    dispatch(getAcademicYearsForOldAttendance(GetAcademicYearsForOldAttendanceBody));
  }, []);



  useEffect(() => {
    setAcademicYear(asAcademicYear);

  }, [GetAcademicYearsForOldAttendance]);


  useEffect(() => {
    if (academicyear !== "") {
      const GetAttendanceToppersBody = {
        aiSchoolId: asSchoolId,
        aiAcademicYearId: academicyear,
        StandardDivisionId: asStandardDivision,
        TopRanker: "3",

        aiStudentId: asStudentId
      }
      dispatch(getStudentAttendance(GetAttendanceToppersBody));
    }
  }, [academicyear]);



  const ClickAcademicYear = (value) => {
    setAcademicYear(value);
    GetAcademicYearsForOldAttendance.map((obj) => {
      if (obj.Value === value) {
        setselectedYear(obj.Name)
     
      }
    })
  };




  return (
    <div>
      <Container>
        <PageHeader heading={'Attendance '} subheading={''} />
        <BackButton FromRoute={"/Student/Attendance"} />

        <FormControl fullWidth>
          <Typography> Select Academic Year</Typography>
          <DropdownAllSelect
            Array={GetAcademicYearsForOldAttendance}
            handleChange={ClickAcademicYear}
            defaultValue={academicyear}
          />
        {academicyear !== asAcademicYear &&
         <> {selectedYear ?  
      
         <Typography variant='h5' sx={{color:"red", mt:"5px"}}>You are Viewing data of old academic year</Typography>:"" }</>

           }
        </FormControl>
        <Box my={1}>
          <Typography sx={{ textAlign: "center" }} variant="h5">   Your Attendance</Typography>
        </Box>
        <Box >
          {(GetStudentAttendance.length > 0 && GetStudentAttendance[0].Name != null) ?
            <Card35 header={{ Header: GetStudentAttendance }} IsStudent={true} /> :
            <ErrorDetail>No attendance</ErrorDetail>}
        </Box>

        <Box my={1}>
          <Typography sx={{ textAlign: "center" }} variant="h5">Attendance Toppers</Typography>

        </Box>

        <Box >
          {(
            GetAttendanceDetails !== undefined &&
            GetAttendanceDetails.length > 0) ?
            <Card35 header={{ Header: GetAttendanceDetails }} IsStudent={false} /> :
            <ErrorDetail>No attendance</ErrorDetail>
          }
        </Box>


      </Container>
    </div>
  )
}

export default AttendanceTopper

