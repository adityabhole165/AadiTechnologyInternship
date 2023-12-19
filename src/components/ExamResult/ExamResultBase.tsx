import React, { useEffect, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { useDispatch } from 'react-redux';
import { getAllTestsForClass, getClassPassFailDetailsForTest, getClassTeachers } from 'src/requests/ExamResult/RequestExamResult';
import { IGetAllTestsForClassBody, IGetClassPassFailDetailsForTestBody, IGetClassTeachersBody } from 'src/interfaces/ExamResult/IExamResult';
import DropdownNew from 'src/libraries/dropdown/DropdownNew';
import { RootState, useSelector } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { Box, Grid, Typography } from '@mui/material';

import Card1 from 'src/libraries/mainCard/Card1';
import ListEditIcon from 'src/libraries/ResuableComponents/Dynamiclist1';
import Dynamiclist1 from 'src/libraries/ResuableComponents/Dynamiclist1';
const ExamResultBase = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem("localSchoolId")
    const asAcademicYearId = sessionStorage.getItem("AcademicYearId")
    const [StandardDivisionId, setStandardDivisionId] = useState("0")
    const [TestId, setTestId] = useState("0")


  const Itemlist = [ 
        
      { Id:"1", Text1:"4", Text2:"Miss Sakshi Anand Battale", Text3:"Absent", IsActive:true, Text4:"4",Text5:"Absent",Text6:"5",Text7:"Absent", Text8:"9", Text9:"1011",},
      { Id:"2",  Text1:"4", Text2:"Miss Sakshi Anand Battale", Text3:"Absent", IsActive:true, Text4:"4",Text5:"Absent",Text6:"5",Text7:"Absent", Text8:"9", Text9:"1011",},
      { Id:"3",  Text1:"4", Text2:"Miss Sakshi Anand Battale", Text3:"Absent", IsActive:true, Text4:"4",Text5:"Absent",Text6:"5",Text7:"Absent", Text8:"9", Text9:"1011",},
      
  ]


  const HeaderPublish = [
      {Id:1,Header:""},
      {Id:2,Header:"Subject"},
      {Id:3,Header:"pass"},
      {Id:4,Header:"Fail"},
      {Id:5,Header:"Absent"},
      {Id:6,Header:" Exempted"},
      {Id:7,Header:" Late Joinee"},
      {Id:8,Header:" Total"},
      {Id:9,Header:" Edit Mark"},
     ]

    
  const ClassTeachers: any = useSelector((state: RootState) => state.ExamResult.ClassTeachers);
  console.log(ClassTeachers,"ClassTeachers");
  
  const ClassPassFailDetailsForTest: any = useSelector((state: RootState) => state.ExamResult.ClassPassFailDetailsForTest);

          console.log(ClassPassFailDetailsForTest,"ClassPassFailDetailsForTest")

  const AllTestsForClass: any = useSelector((state: RootState) => state.ExamResult.AllTestsForClass);
  console.log(AllTestsForClass,"AllTestsForClass");
  

    const ClassTeachersBody:IGetClassTeachersBody = {
        asSchoolId:asSchoolId,
        asAcademicYearId:asAcademicYearId
    }
    const AllTestsForClassBody:IGetAllTestsForClassBody = {
        asSchoolId:asSchoolId,
        asAcademicYearId:asAcademicYearId,
        asStandardDivisionId:StandardDivisionId
    }
    const ClassPassFailDetailsForTestBody:IGetClassPassFailDetailsForTestBody = {
        asSchoolId:Number(asSchoolId),
        asAcademicYearId:Number(asAcademicYearId),
        asStdDivId:StandardDivisionId,
        aiTestId:TestId
    }

    useEffect(()=>{
        dispatch(getClassTeachers(ClassTeachersBody));
    },[])
    useEffect(()=>{
        if(ClassTeachers.length>0){
            setStandardDivisionId(ClassTeachers[1].Value)
    }
    },[ClassTeachers])
    useEffect(()=>{
        if(StandardDivisionId!=="0")
        dispatch(getAllTestsForClass(AllTestsForClassBody));
    },[StandardDivisionId])

    useEffect(()=>{
        if(AllTestsForClass.length>0)
            setTestId(AllTestsForClass[0].Value)
    },[AllTestsForClass])

    useEffect(()=>{
        dispatch(getClassPassFailDetailsForTest(ClassPassFailDetailsForTestBody));
    },[TestId])
    
    const clickTeacher = (value) => {
        setStandardDivisionId(value)
    }
    const clickExam = (value) => {
        setTestId(value)
    }

    const clickEdit = (value) => {
     
  }
  return (
    <div>
      <PageHeader heading={'Exam Results'} subheading={''} />
    

 



   <Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid item xs={1.5}>
    <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>
    Select Class Teacher:
    </Typography>
  </Grid>
  <Grid item xs={2}>
  <Dropdown Array={AllTestsForClass} handleChange={clickExam} 
      label={"Exam"} defaultValue={TestId}/>
    <br></br>
  </Grid>
  
  <Grid item xs={1}>
    <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>
     Select Exam :
    </Typography>
  </Grid>
  <Grid item xs={2}>
  <Dropdown Array={ClassTeachers} handleChange={clickTeacher} 
      label={"Teacher"} defaultValue={StandardDivisionId}/>
    <br></br>
  </Grid>
 
</Grid>
<br></br>
<Dynamiclist1  ItemList={ClassPassFailDetailsForTest}  HeaderArray={HeaderPublish} clickEdit={clickEdit}/>

    </div>
  )
}

export default ExamResultBase

