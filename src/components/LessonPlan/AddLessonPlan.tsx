import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from 'src/libraries/heading/PageHeader'
import DotLegend from 'src/libraries/summary/DotLegend';  
import { RootState } from 'src/store';
import { IClassListBody,IClassListResult } from "src/interfaces/LessonPlan/IAddLessonPlan";
import { classnamelist } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import DropDown from 'src/libraries/list/DropDown';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router';

const AddLessonPlan = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [SelectClass, setSelectClass] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const TeacherName = (sessionStorage.getItem('StudentName'));

  const ClassListDropdown = useSelector((state: RootState) => state.addlessonplan.ClassName)
  console.log("ClassListDropdown", ClassListDropdown)

  useEffect(() => {
    const ClassListBody: IClassListBody = {

      asSchoolId:asSchoolId,
      asAcademicYearId:asAcademicYearId,
      asTeacherId:TeacherId

    }
    dispatch(classnamelist(ClassListBody))
  }, [TeacherId]);


  const onClickClass =(value) =>{
    setSelectClass(value)
  }


  const onSelectStartDate = (value) => {
    setStartDate(value)

  }
  const onSelectEndDate = (value) => {
    setEndDate(value)
   
  }

  const onClickBack =() =>{
    navigate('/extended-sidebar/Teacher/LessonPlanBaseScreen')

  }

  return (
    <Container>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>

      <PageHeader heading='Lesson Plan Details' />
      <br></br>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography >
    <b>Teacher :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField value={TeacherName}/>
  </Grid>
  </Grid>
 
 <br></br>

      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography  >
    <b>Start Date:</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField  type='date' value={StartDate}  onChange={(e) => { onSelectStartDate(e.target.value) }}/>
  </Grid>
  </Grid>
<br></br>
<br></br>

<Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography  >
    <b>End Date:</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField  type='date' value={EndDate}  onChange={(e) => { onSelectEndDate(e.target.value) }}/>
  </Grid>
  </Grid>
  <br></br>
  <br></br>
  
  <Grid container spacing={1} justifyContent="center" alignItems="center">
  <Grid item xs={1}>
    <Typography >
      <b>Class:</b>
    </Typography>  
  </Grid>
  <Grid item xs={2} >
  <DropDown itemList={ClassListDropdown} ClickItem={onClickClass} DefaultValue={SelectClass} Label={"Select"} />
   <br></br>
  </Grid>
  </Grid>

  <br></br>
  
                <Stack spacing={3} direction="row">
                    <DotLegend text="Submitted On" color="secondary"  /><br></br>
                    <DotLegend text="Approved Plan" color="info" /><br></br>
                </Stack>
                <br></br>
                <div >
  <Grid container spacing={2} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
  <Grid item xs={6}>
<ButtonPrimary variant="contained" >
              <b>SAVE</b>
            </ButtonPrimary>
            </Grid> 
            
        <Grid item xs={6}>
            <ButtonPrimary  variant="contained" style={{ backgroundColor: '#4da0f7', color: 'white' }}>
               SUBMIT
            </ButtonPrimary> 
            </Grid>
      </Grid> 
      </div>
      <br></br>
      <ButtonPrimary  variant="contained" onClick={onClickBack} style={{ backgroundColor: 'red', color: 'white' }}>
               BACK
            </ButtonPrimary> 
    </div>
    </Container>
  )
}

export default AddLessonPlan
