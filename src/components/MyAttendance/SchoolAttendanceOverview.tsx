import React from 'react'
import { RootState } from 'src/store';
import  { useEffect,useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {TextField, Typography ,Box ,Grid, Container} from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import DotLegend from 'src/libraries/summary/DotLegend';
import {IGetSchoolAttendanceOverviewBody , IGetSchoolAttendanceOverviewResult } from "src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview" ;
import {GetStudentAttendance } from 'src/requests/SchoolAttendanceOverview/RequestSchoolAttendanceOverview'
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import ClearIcon from '@mui/icons-material/Clear';
 
  const SchoolAttendanceOverview = () => {
    
  const dispatch = useDispatch();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  const[SelectDate , SetSelectDate]=useState('')

  const HeaderArrayA = [{Id:1, Header:"Marked for"},{Id:2, Header:"Present/Total"},{Id:3, Header:"Present%"} , ]

   
  const HeaderArray= [{Id:1, Header:"Standard/Division."},{Id:2, Header:"A"},{Id:3, Header:"B"} ,{Id:4, Header:"C"} ,{Id:5, Header:"D"} ,{Id:6, Header:"E"} ,
  ,{Id:7, Header:"F"} ,
   ]

const ItemList = [{Text2:"0/6"},{Text2:"0/6"}  ,{Text2:"0/6"}  ,{Text2:"0/6"}  ,{Text2:"0/6"} ,{Text2:"0/6"}]

     const SchoolAtteendanceOverview = useSelector((state: RootState) => state.SchoolAttendance.SchoolAttendanceOverview );
     console.log(SchoolAtteendanceOverview,"SchoolAtteendanceOverview");
        
    
        const GetSchoolAttendanceOverview : IGetSchoolAttendanceOverviewBody = {
          asSchoolId:asSchoolId,
          asAcademicYearId:asAcademicYearId,
          asSelectedDate:"2023-10-10"
          }
        
         console.log(asSchoolId ,"asSchoolId") 
         console.log(asAcademicYearId ,"asAcademicYearId")
    const onSelectDate=(value)=>{ 
      SetSelectDate(value)
     
    }


    const navigate = useNavigate();
    const click = () => {
      navigate('/schoolList');
    };


        useEffect(() => {
      dispatch(GetStudentAttendance(GetSchoolAttendanceOverview));
    }, []);
     


  return (
    <Container maxWidth={'xl'}>
      <PageHeader heading={'SchoolAttendanceOverview'} subheading={''} />
   
      <Box sx={{ display:"flex" ,alignItems:"center",justifyContent:"center"}}>
      <Typography sx={{mr:"10px"}}>Select Date</Typography>
      <TextField value={SelectDate} type='date' onChange={(e) => { onSelectDate(e.target.value) }} label={''} size="small" />
      </Box>
      

      
  <Box sx={{display:"flex" ,alignItems:"center",justifyContent:"center"  }}>
  <Typography>Legend:</Typography>
  <ClearIcon sx={{color:"red", mr:"20px"}} />
  <DotLegend  color="Red" text="Attendance Not  Marked" /> 
  </Box>
  
       <Grid container spacing={2}>
        <Grid item xs={8}>
        <TableAttendace ItemList={SchoolAtteendanceOverview} HeaderArray={HeaderArray}/> 
        </Grid>
        <Grid item xs={3}>
        <TableAttendace ItemList={ItemList}  HeaderArray={HeaderArrayA}/> 
        </Grid>
       </Grid>
  
  <Box sx={{ display:"flex" ,alignItems:"center",justifyContent:"center"}}>
  <ButtonPrimary color="secondary" onClick={click} >
                  Close
                </ButtonPrimary>  
               
  </Box>
    
    </Container>
  )
}


export default SchoolAttendanceOverview 

















