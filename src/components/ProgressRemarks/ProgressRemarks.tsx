
 import React, { useState } from 'react'
 import {  useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { RootState } from 'src/store';
 import { IAllPrimaryClassTeachersBody, IGetTestwiseTermBody,IStudentswiseRemarkDetailsToExportBody, IUpdateAllStudentsRemarkDetailsBody, IStudentListToCaptureHeighthWeightBody, IGetAllStudentswiseRemarkDetailsBody} from "src/interfaces/ProgressRemarks/IProgressRemarks"
 import { CDAGetClassTeachers, CDAGetTestwiseTerm, CDAStudentswiseRemarkDetailsToExport, CDAUpdateAllStudentsRemarkDetails, CDAStudentListToCaptureHeighthWeight, CDAGetAllStudentswiseRemarkDetails} from "src/requests/ProgressRemarks/ReqProgressRemarks"
import { Box, Container, Grid, Typography,Stack } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Notes from 'src/libraries/ResuableComponents/Notes';
import DotLegendTeacher from 'src/libraries/summary/DotLegendTeacher';

 const ProgressRemarks = () => {
   const dispatch = useDispatch();
   const [selectTeacher, SetselectTeacher] = useState();
   const [SelectTerm, SetSelectTerm] = useState();
   const [StudentList, SetStudentList] = useState();

   const asSchoolId = Number(localStorage.getItem('localSchoolId'));
   const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
   
   const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetTestwiseTerm
  );
  console.log(USGetTestwiseTerm,"USGetTestwiseTerm==1");
  

   const USClassTeachers: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetClassTeachers);
    console.log(USClassTeachers,"USClassTeachers====2");

    const StudentswiseRemarkDetails: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport);
    console.log(StudentswiseRemarkDetails,"StudentswiseRemarkDetails3");

    const UpdateAllStudentsRemarkDetail: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISUpdateAllStudentsRemarkDetailsBody);
     console.log(UpdateAllStudentsRemarkDetail,"UpdateAllStudentsRemarkDetail4");
     

    const StudentListToCaptureHeighthWeight: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISStudentListToCaptureHeighthWeight);
  console.log(StudentListToCaptureHeighthWeight,"StudentListToCaptureHeighthWeight5");
  
  const USGetAllStudentswiseRemarkDetails: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetAllStudentswiseRemarkDetails);
 console.log(USGetAllStudentswiseRemarkDetails,"USGetAllStudentswiseRemarkDetails--6");
 
const Note1  =["Attentive, Capable, Careful, Cheerful, Confident, Cooperative, Courteous, Creative, Dynamic, Eager, Energetic, Generous, Hardworking, Helpful, Honest, Imaginative, Independent, Industrious, Motivated, Organized Outgoing, Pleasant, Polite, Resourceful, Sincere, Unique."]
const Hedaer1=["Suggested Adjectives:"]

const Note2  =["Always, Commonly, Consistently, Daily, Frequently, Monthly, Never, Occasionally, Often, Rarely, Regularly Typically, Usually, Weekly.."]
const Hedaer2=["Suggested Adverbs ::"]

const Note3  =["Click on the button available for each student and remark type to add configured Remark Templates."]
const Hedaer3=["..."]

const Note4  =["After specific interval of time entered data will be saved automatically."]
const Hedaer4=["Note:"]

const Note5  =["User can not change or update any data once summative exam is published."]
const Hedaer5=["Note:"]
      
    const GetTestwiseTermBody: IGetTestwiseTermBody = {
        asSchoolId:18
      };

   const ClassTeachersBody: IAllPrimaryClassTeachersBody =
   {
    "asSchoolId":18,
    "asAcademicYearId":54
   }

   const StudentswiseRemarkDetailsBody: IStudentswiseRemarkDetailsToExportBody =
   {
    "asSchoolId":18,
    "asAcademicYearId":54,
    "asStandardDivId":1266,
    "asStudentId":0,
    "asTermId":1
}

const UpdateAllStudentsRemarkDetailsBody: IUpdateAllStudentsRemarkDetailsBody =
{
    "StudentwiseRemarkXML":"<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><StudentwiseRemarkConfigDetails><YearwiseStudentId>37608</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37609</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37610</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37611</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37612</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37613</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37614</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37615</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37616</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37617</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37618</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37619</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37620</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37621</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37622</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37623</YearwiseStudentId><StudentwiseRemarkId>2775928</StudentwiseRemarkId><Remark>She can easily express probabilities as ratios, fractions and percent. She can sort materials into groups using simple properties and can recognise and name common materials.</Remark><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37625</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37652</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37626</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37627</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails></ArrayOfStudentwiseRemarkConfigDetails>",

    "asSchoolId":18,
    "asAcademicYearId":54,
    "asInsertedById":4463,
    "asStandardDivId":1266,
    "asTermId":1

}


const StudentListToCaptureHeighthWeightBody: IStudentListToCaptureHeighthWeightBody =
{
    "asStdDivId":1266 ,
"asAcademic_Year_Id":54 ,
"asSchoolId":18,
"asTerm_Id":1
}


const GetAllStudentswiseRemarkDetailsBody: IGetAllStudentswiseRemarkDetailsBody =
{
    "asSchoolId":18,
    "asAcademicYearId":54,
    "asStandardDivId":1266,
    "asStudentId":0,
    "asTermId":1
}


const clickSelectTerm = (value) => {
  SetSelectTerm(value);
};

const clickSelectClass = (value) => {
  SetselectTeacher(value);
};

const clickStudentList = (value) => {
  SetStudentList(value);
};

   useEffect(() => {
     dispatch(CDAGetClassTeachers(ClassTeachersBody));
 }, []);

 useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAStudentswiseRemarkDetailsToExport(StudentswiseRemarkDetailsBody));
  }, []);

  useEffect(() => {
    dispatch(CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody));
  }, []);


  useEffect(() => {
    dispatch(CDAStudentListToCaptureHeighthWeight(StudentListToCaptureHeighthWeightBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody));
  }, []);

   return (
   <>
   <PageHeader heading={'Progress Remarks'} subheading={''} />
     <Container>
     


     <Grid
    container
    spacing={2}
    justifyContent="center"
    alignItems="center"
  >
    <Grid item xs={2}>
      <Typography
        component={Box}
        sx={{ border: '1px solid black' }}
        p={0.3}
      >
        Subject Teacher:
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Dropdown
        Array={USClassTeachers}
        handleChange={clickSelectTerm}
        defaultValue={SelectTerm}
        label={''}
      />
      <br></br>
    </Grid>
    <Grid item xs={2}>
      <Typography
        component={Box}
        sx={{ border: '1px solid black' }}
        p={0.5}
      >
        Term:
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Dropdown
        Array={USGetTestwiseTerm}
        handleChange={clickSelectClass}
        defaultValue={selectTeacher}
        label={''}
      />
    
    </Grid>



    <Grid item xs={2}>
      <Typography
        component={Box}
        sx={{ border: '1px solid black' }}
        p={0.5}
      >
        StudentList:
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Dropdown
        Array={StudentListToCaptureHeighthWeight}
        handleChange={clickStudentList}
        defaultValue={StudentList}
        label={''}
      />
    
    </Grid>
   
   
  </Grid>
  
   <Notes NoteDetail={Note1} Header={Hedaer1}/>
   <Notes NoteDetail={Note2} Header={Hedaer2}/>
   <Notes NoteDetail={Note3} Header={Hedaer3}/>
   <Notes NoteDetail={Note4} Header={Hedaer4}/>
   <Notes NoteDetail={Note5} Header={Hedaer5}/>
  
  <Stack >
    <DotLegendTeacher text="Left Students" color="error"  />
    </Stack>
  </Container>
   </>
   )
 }

 export default ProgressRemarks
