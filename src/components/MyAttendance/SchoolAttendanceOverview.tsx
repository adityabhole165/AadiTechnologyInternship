import React from 'react'
import { RootState } from 'src/store';
import { useEffect, useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TextField, Typography, Box, Grid, Container } from '@mui/material';
import { ButtonPrimary, Item } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import DotLegend from 'src/libraries/summary/DotLegend';
import { IGetSchoolAttendanceOverviewBody, IGetSchoolAttendanceOverviewResult } from "src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview";
import { GetStudentAttendance } from 'src/requests/SchoolAttendanceOverview/RequestSchoolAttendanceOverview'
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import ClearIcon from '@mui/icons-material/Clear';
import TableUsingArray from 'src/libraries/ResuableComponents/TableUsingArray';
import Attendance from 'src/requests/Attendance/Attendance';
import { GetAttendanceStatus } from 'src/requests/TAttendance/TAttendance';
import Iconhelp from 'src/libraries/icon/Iconhelp';

const SchoolAttendanceOverview = () => {

  const dispatch = useDispatch();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const [SelectDate, SetSelectDate] = useState(new Date().toISOString().split('T')[0]);
  const [HeaderArray, setHeaderArray] = useState(["Standard / Division."])
  const ISAttendanceOverviewGridData = useSelector((state: RootState) => state.SchoolAttendance.AttendanceOverviewGridData);
  const ISAttendanceOverviewDivArray = useSelector((state: RootState) => state.SchoolAttendance.AttendanceOverviewDivArray);
  const ISWeekendStatusList = useSelector((state: RootState) => state.SchoolAttendance.WeekendStatusList);

  const Note: string = 'Displays the attendance status for all divisions and standards for  chosen date..';


  useEffect(() => {
    setHeaderArray(["Standard | Division"])
    if (ISAttendanceOverviewDivArray.length > 0) {
      ISAttendanceOverviewDivArray.map((obj) => {
        setHeaderArray((item) => [...item, obj])

      })

      setHeaderArray((item) => [...item, "Marked for", "Present/Total", "Present%"])
    }
  }, [ISAttendanceOverviewDivArray])


  useEffect(() => {

  }, [ISWeekendStatusList])

  const GetSchoolAttendanceOverview: IGetSchoolAttendanceOverviewBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asSelectedDate: SelectDate
  }


  const onSelectDate = (value) => {
    SetSelectDate(value)

  }

  const navigate = useNavigate();
  const click = () => {
    navigate('/extended-sidebar/Teacher/TAttendance');
  };


  useEffect(() => {

    dispatch(GetStudentAttendance(GetSchoolAttendanceOverview));
  }, [SelectDate]);



  return (
    <Container maxWidth={'xl'}>


      <PageHeader heading={'Attendance Overview'} subheading={''} />
      <Box sx={{ float: "right" }}>
        <Iconhelp Note={Note} />
      </Box>
      <Box sx={{ float: "right" }}>
      <Typography sx={{ color: 'red', }}> * Mandatory fields </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "auto", marginLeft: "300px" }}>
  <Typography sx={{ mr: "10px" }}>Select Date</Typography>
  <TextField value={SelectDate} type='date' onChange={(e) => { onSelectDate(e.target.value) }} label={''} size="small" />
  <Typography sx={{ color: 'red' }}> * </Typography>
</Box>


      {ISWeekendStatusList !== "" ?
        <Typography variant='h6' sx={{ color: "red" }}>
          {ISWeekendStatusList}</Typography> :
        <>
          <Box sx={{ display: "flex", }}>
            <Typography>Legend :</Typography>
            <ClearIcon sx={{ color: "red" }} /> <Typography>Attendance Not  Marked</Typography>

          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>

              <TableUsingArray ItemList={ISAttendanceOverviewGridData} HeaderArray={HeaderArray} />
            </Grid>
            <div className=""></div>
          </Grid>
          <br></br>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ButtonPrimary color="error" onClick={click}  >
              CLOSE
            </ButtonPrimary>

          </Box>
        </>}
    </Container>
  )
}



export default SchoolAttendanceOverview
