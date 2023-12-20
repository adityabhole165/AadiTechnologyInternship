import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IAssignClassBody, IAssignClassResult, IClasswiseExamDropdownBody, IClasswiseExamDropdownResult, ISubjectsExamMarksStatusForClassBody, ISubjectsExamMarksStatusForClassBodyResult } from "src/interfaces/AssignExamMarks/IAssignExamMarks"

import PageHeader from 'src/libraries/heading/PageHeader';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetAssignExamMarkList, GetClassWiseExam, GetSubjectList, GetSubjectListClass } from 'src/requests/AssignExamMarks/ReqAssignExamMarks'
import { RootState } from 'src/store';
// import IconLegends from '../IconLedends/IconLegends';
import List2 from 'src/libraries/mainCard/List2';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { number } from 'prop-types';
import DropDown from 'src/libraries/list/DropDown';
import ListEditIcon1 from 'src/libraries/ResuableComponents/ListEditIcon1';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import { Navigate, useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import DynamicList from 'src/libraries/list/DynamicList';
import { logoURL } from '../Common/Util';

const AssignExamMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [selectClass, SetSelectClass] = useState()
  const [ClassWiseExam, SetClassWiseExam] = useState()

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const aTeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asExamId = Number(sessionStorage.getItem('ExamID'));

  const ClassDropdown = useSelector((state: RootState) => state.AssignExamMarkSlice.ISAssignExam)

  const ClassWiseExamDropdown = useSelector((state: RootState) => state.AssignExamMarkSlice.ISAssignClassExam)

  const SubjectListmarkClass = useSelector((state: RootState) => state.AssignExamMarkSlice.ISSubjectListClass)

  //ClassDrpdown
 
    const GetAssignExam: IAssignClassBody = {

      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      aTeacherId: aTeacherId

    }
    
  //ClassWiseDropdwon
 
    const GetAssignClassWiseExam: IClasswiseExamDropdownBody = {

      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardDivisionId: asStandardDivisionId

    }


  useEffect(() => {
    dispatch(GetAssignExamMarkList(GetAssignExam))
    dispatch(GetClassWiseExam(GetAssignClassWiseExam))
  }, []);

  useEffect(() => {
    if (ClassWiseExamDropdown.length > 0) {
        SetClassWiseExam(ClassWiseExamDropdown[0].Value);
    }
}, [ClassWiseExamDropdown]);


  //SubjectList
 
    const GetSubjectListtClass: ISubjectsExamMarksStatusForClassBody = {
        // asSchoolId: asSchoolId,
        // asAcademicYearId: asAcademicYearId,
        // aTeacherId: aTeacherId,
        // asExamId: 608,
        // asAllowPartialSubmit: "",
        // asStandardDivisionId: asStandardDivisionId


        
          "asSchoolId": 18,
          "asAcademicYearId": 54,
          "aTeacherId": 2325,
          "asExamId": 608,
          "asAllowPartialSubmit": "",
          "asStandardDivisionId": 1282
        
     }

    // useEffect(() => {
    //     if (selectClass != '' &&
    //     selectClassWiseExam != '' )
    //       dispatch(GetSubjectListClass(GetSubjectListtClass))
    //   }, [selectClass,selectClassWiseExam]);

    useEffect(() => {
       dispatch(GetSubjectList(GetSubjectListtClass))
      }, [selectClass,ClassWiseExam]);


  const onClickClass = (value) => {
    SetSelectClass(value)
  }

  const clickClassWiseExam = (value) => {
    
    SetClassWiseExam(value)
  }

  const HeaderPublish = [
    {Id:1,Header:"Class"},
    {Id:2,Header:"Subject" },
    {Id:3,Header:"Edit" }
    ,{Id:4,Header:"Sumbit" }
    
 ]

 const HeaderList = [
  "Class",
  "Subject",
  "Edit",
  "Sumbit"
]
const [IconList, setIconList] = useState([
  {Id:1,
    Icon:(<EditIcon/>), 
    Action:"Edit"},
  {Id:1,
    Icon:(<OfflinePinIcon/>), 
    Action:"Complete"},
])
 const clickEdit = () => {
  navigate('/extended-sidebar/Common/EventOverview')
}
  return (
    <Container>
      <div>
        <PageHeader heading='Assign Exam Mark' />
        <div>
        


            <Grid container>
            <Grid item xs={12}>
              <h4>Legends</h4>
              <Box sx={{ display: 'flex', gap: '20px' }}>
              <DotLegends color='secondary' 
        text={'No student in class / Subject not applicable to student'} 
        text1={'Marks entry not started'} 
        text2={'Marks entry partially done'}
        text3={'Submit exam marks to the class teacher'} 
        text4={'Unsubmit Exam Marks'} 
        text5={'Marks entry completed	'}  />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid item xs={1}>
    <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>
      Class:
    </Typography>
  </Grid>
  <Grid item xs={2}>
<Dropdown Array={ClassDropdown} handleChange={onClickClass} defaultValue={selectClass} label={"All"} />

    <br></br>
  </Grid>
  <Grid item xs={1}>
    <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>
      Exam :
    </Typography>
  </Grid>
  <Grid item xs={2}>
<Dropdown Array={ClassWiseExamDropdown} handleChange={clickClassWiseExam} defaultValue={ClassWiseExam} label={''} />
    <br></br>
  </Grid>
 
</Grid>
<h4 >My Subject(s):-</h4>
       <ListEditIcon1 ItemList={SubjectListmarkClass}  clickEdit={clickEdit}  HeaderArray={HeaderPublish} />
        {/* <DynamicList HeaderList={HeaderList} ItemList={SubjectListmarkClass}
        IconList={IconList} ClickItem={clickEdit}/>
        */}
      </div>
    </Container>
  )
}

export default AssignExamMark
