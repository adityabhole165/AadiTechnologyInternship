import { Box, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import PageHeader from 'src/libraries/heading/PageHeader'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { RootState } from 'src/store';
import { IGetLessonPlanListBody,IDeleteLessonPlanBody,IGetLessonPlanDetailsForReportBody } from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";
import { lessonplanlist,deletelessonplan,resetdeleteplan,GetLessonPlanreport } from 'src/requests/LessonPlan/RequestLessonPlanBaseScreen';
import DynamicList from 'src/libraries/list/DynamicList';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from 'react-router';
import DotLegends2 from 'src/libraries/ResuableComponents/DotLegends2';
import { getDateFormat1 } from '../Common/Util';
import { toast } from 'react-toastify';

const LessonPlanBaseScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));

  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const TeacherName = (sessionStorage.getItem('StudentName'));


    const [StartDate, setStartDate]= useState();
  const [EndDate, setEndDate] = useState();
  console.log("StartDate---", StartDate)
  console.log("EndDate---", EndDate)

  const LessonPlanList : any = useSelector((state: RootState) => state.LessonPlanBase.LessonList)
  console.log("LessonPlanList", LessonPlanList)

  const DeleteLessonPlan: any = useSelector((state: RootState) => state.LessonPlanBase.DeletePlan)
  console.log("DeleteLessonPlan", DeleteLessonPlan)

const LessonPlanReport: any = useSelector((state: RootState) => state.LessonPlanBase.LessonReport)
  console.log("LessonPlanReport", LessonPlanReport)
  
  const IconList = [

    {
        Id: 1,
        Icon: (<PreviewIcon titleAccess="View Remark"/>),
        Action: "PreviewIcon"
    },
    {
      Id: 2,
      Icon: (<EditIcon titleAccess="Edit" />),
      Action: "EditIcon"
  },
    {
        Id: 3,
        Icon: (<CloseIcon titleAccess="Delete" style={{ backgroundColor: 'white', color: 'red' }}/>),
        Action: "CloseIcon"
    },
  {
    Id: 4,
    Icon: (<div style={{ backgroundColor: 'white', color: 'skyblue' }}>Export</div>),
    Action: "RemoveRedEyeIcon2"
},{
  Id: 5,
  Icon: (<CheckIcon />),
  Action: "RemoveRedEyeIcon2"
},
]
const GetLessonPlanListBody: IGetLessonPlanListBody = {

  asSchoolId:asSchoolId, 
  asAcademicYearId:asAcademicYearId,
   asUserId:asUserId, 
   asReportingUserId:asUserId,
    asStartIndex:0,
     asEndIndex:20, 
     asIsRecordCount:0, 
     asStartDate:StartDate, 
     asEndDate:EndDate, 
     asRecordCount:null
    }

   
  useEffect(() => {
    dispatch(lessonplanlist(GetLessonPlanListBody))
  }, [StartDate,EndDate]);

  const GetLessonPlanReportBody:IGetLessonPlanDetailsForReportBody={
    asSchoolId:asSchoolId,
    asAcademicYearId:asAcademicYearId,
    asStartDate:StartDate,
    asEndDate:EndDate,
    asUserId:asUserId,
    asStandardDivisionId:asStandardDivisionId,
    asSubjectId:0
  }
  useEffect (()=>{
    dispatch(GetLessonPlanreport(GetLessonPlanReportBody))
  },[])
   

  useEffect(() => {
    if(DeleteLessonPlan!==""){
      toast.success(DeleteLessonPlan ,{ toastId: 'success1' })}
      dispatch(resetdeleteplan());    
    },
  [DeleteLessonPlan])
  const clickDelete=(Id)=>{
    if(Id.Action=="CloseIcon"){
             LessonPlanList.map((item,i)=>{
               if(i==Id){
                 LessonPlanList.map((item,i)=>{
              
             })
               }
             })
    if(confirm('Are You Sure you want to delete The List')){
    const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
      asSchoolId: asSchoolId, 
      asAcademicYearId: asAcademicYearId,
      asUpdatedById: asUserId,
      asUserId: asUserId,
      aasStartDate:StartDate, 
      aasEndDate:EndDate
    }
    dispatch(deletelessonplan(DeleteLessonPlanBody))
  }
}
}

//   const clickDelete = (Id) => {
//     if(Id.Action=="CloseIcon"){
//       LessonPlanList.map((item,i)=>{
//         if(i==Id){
//           LessonPlanList.map((item,i)=>{
        
//       })
//         }
//       })
//     if (confirm('Are You Sure you want to delete The Lesson Plan')) {
//       const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
//         asSchoolId: asSchoolId, 
//         asAcademicYearId: asAcademicYearId,
//         asUpdatedById: asUserId,
//         asUserId: asUserId,
//         aasStartDate:asStartDate,
//         aasEndDate:asEndDate
  
//       }
//       dispatch(deletelessonplan(DeleteLessonPlanBody))
//     }

//       if (DeleteLessonPlan!== '') {
//       toast.success(DeleteLessonPlan, { toastId: 'success1' })
//     }
//     dispatch(lessonplanlist(GetLessonPlanListBody))
//   }
// } 



  const onSelectStartDate = (value) => {
    setStartDate(value)

    // if(StartDate !== ""){
    //   const GetLessonPlanListBody1: IGetLessonPlanListBody = {

    //     asSchoolId:asSchoolId, 
    //     asAcademicYearId:asAcademicYearId,
    //      asUserId:asUserId, 
    //      asReportingUserId:asUserId,
    //       asStartIndex:0,
    //        asEndIndex:20, 
    //        asIsRecordCount:0, 
    //        asStartDate:StartDate, 
    //        asEndDate:null, 
    //        asRecordCount:null
  
    //   }
    //   dispatch(lessonplanlist(GetLessonPlanListBody1))
    // }
  }

  const onSelectEndDate = (value) => {
    setEndDate(value)
   
    // if(EndDate !== ""){
    //   const GetLessonPlanListBody: IGetLessonPlanListBody = {

    //     asSchoolId:asSchoolId, 
    //     asAcademicYearId:asAcademicYearId,
    //      asUserId:asUserId, 
    //      asReportingUserId:asUserId,
    //       asStartIndex:0,
    //        asEndIndex:20, 
    //        asIsRecordCount:0, 
    //        asStartDate:null, 
    //        asEndDate:EndDate, 
    //        asRecordCount:null
  
    //   }
    //   dispatch(lessonplanlist(GetLessonPlanListBody))
    // }
  }

  const HeaderList = ["Start Date", "End Date","View Remark ","Edit","Delete","Export","Submit Status"];

const OnClickExportAll=()=>{
  dispatch(GetLessonPlanreport(GetLessonPlanReportBody))
}
  const onClickAdd =() =>{
    navigate('/extended-sidebar/Teacher/AddLessonPlan')

  }

  const onClickaaaa1 =() =>{
    navigate('/extended-sidebar/Teacher/AddLessonPlan')

  }
  const onClickaaaa2 =() =>{
    navigate('/extended-sidebar/Teacher/AddHomework')

  }

  const ClickEdit = (value) => {
    if(value.Action=="EditIcon"){
      navigate('/extended-sidebar/Teacher/AddLessonPlan')
    }

  }

  return (

    <>
     <PageHeader heading='Lesson Plans' />
     <br></br>

          <Grid container spacing={2}>
            <Grid item xs={6}>
     <Paper>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ backgroundColor: 'white', color: 'black' }}>Legends:</h4>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <DotLegends2
                  color="secondary"
                  text={
                    ''
                  }
                  text1={'Submited'}
                  text2={'Non Submited'}
                  text3={'Not Applicable'}
                  text4={'Suggestion Added'}
                  text5={''}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}></Grid>
          </Grid>
      

<br></br>


     <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography  >
    <b>Start Date:</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField  type='date' value={StartDate} variant='standard' onChange={(e) => { onSelectStartDate(e.target.value) }}/>
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
  <TextField  type='date' value={EndDate} variant='standard' onChange={(e) => { onSelectEndDate(e.target.value) }}/>
  </Grid>
  </Grid>
  <br></br>
  <br></br>

  <Grid container spacing={2} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
  <Grid item xs={2}>
<ButtonPrimary variant="contained" onClick={onClickAdd} >
              <b>ADD</b>
            </ButtonPrimary>
            </Grid> 
            
        <Grid item xs={2}>
            <ButtonPrimary  variant="contained" onClick={OnClickExportAll}> 
               EXPORT ALL
            </ButtonPrimary> 
            </Grid> 
      </Grid>
<br></br>
</Paper>
 </Grid>
            <Grid item xs={6}>
<Paper>
      <DynamicList2 HeaderList={HeaderList} ItemList={LessonPlanList}
                    IconList={IconList} ClickItem={clickDelete}/>
                
                </Paper>
                </Grid>
          </Grid>
    </>

  )
}

export default LessonPlanBaseScreen
 