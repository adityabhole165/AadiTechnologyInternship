import { FormControl, FormControlLabel,  InputLabel, Container, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getStudentAttendance, getAttendanceDetails, getAcademicYearsForOldAttendance } from 'src/requests/Attendance/Attendance'
import BackButton from 'src/libraries/button/BackButton';
import { IGetAcademicYearsForOldAttendanceBody, IGetAttendanceToppersBody } from 'src/interfaces/Student/Attendance';

import PageHeader from 'src/libraries/heading/PageHeader';




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
   const asStudentId =(sessionStorage.getItem('StudentId'));
   const asAcademicYear =(sessionStorage.getItem('AcademicYearId'));
   const asStandardDivision =(sessionStorage.getItem('StandardDivisionId'));

  const GetAcademicYearsForOldAttendanceBody: IGetAcademicYearsForOldAttendanceBody = {
    aiSchoolId: asSchoolId,
    aiStudentId: asStudentId,
    abIncludeCurrentYear: asAcademicYear
  }

    useEffect(() => {
      dispatch(getAcademicYearsForOldAttendance(GetAcademicYearsForOldAttendanceBody));
  }, []);


  const IGetAttendanceToppersBody: IGetAttendanceToppersBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYear,
    StandardDivisionId: asStandardDivision,
    TopRanker: "3",
    aiStudentId: asStudentId
  }
  useEffect(() => {
        dispatch(getStudentAttendance(IGetAttendanceToppersBody));
        dispatch (getAttendanceDetails(IGetAttendanceToppersBody));
    }, []);
  console.log("GetAttendanceDetails",GetAttendanceDetails)




   


  
  return (
    <div>
      <Container>
        <PageHeader heading={'Attendance Toppers'} subheading={''} />
        <BackButton FromRoute={"/Student/Attendance"} />

      </Container>
    </div>
  )
}

export default AttendanceTopper

