import React, { useEffect, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { useDispatch } from 'react-redux';
import { getAllTestsForClass, getClassPassFailDetailsForTest, getClassTeachers } from 'src/requests/ExamResult/RequestExamResult';
import { IGetAllTestsForClassBody, IGetClassPassFailDetailsForTestBody, IGetClassTeachersBody } from 'src/interfaces/ExamResult/IExamResult';
import { RootState, useSelector } from 'src/store';
import EditIcon from '@mui/icons-material/Edit';
import DynamicList from 'src/libraries/list/DynamicList'
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { useNavigate } from 'react-router';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';

const ExamResultBase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem("localSchoolId")
  const asAcademicYearId = sessionStorage.getItem("AcademicYearId")
  const [StandardDivisionId, setStandardDivisionId] = useState("0")
  const [TestId, setTestId] = useState("0")
  
  const [IconList, setIconList] = useState([])
  const ClassTeachers: any = useSelector((state: RootState) => state.ExamResult.ClassTeachers);
  const IsSubmitted: any = useSelector((state: RootState) => state.ExamResult.IsSubmitted);
  const HeaderList: any = useSelector((state: RootState) => state.ExamResult.HeaderList);
  const ClassPassFailDetailsForTest: any = useSelector((state: RootState) => state.ExamResult.ClassPassFailDetailsForTest);
  const AllTestsForClass: any = useSelector((state: RootState) => state.ExamResult.AllTestsForClass);
  

  const ClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  }
  const AllTestsForClassBody: IGetAllTestsForClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId
  }
  const ClassPassFailDetailsForTestBody: IGetClassPassFailDetailsForTestBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: StandardDivisionId,
    aiTestId: TestId
  }
  useEffect(() => {
    if (IsSubmitted == "N")
      setIconList([])

    if (IsSubmitted == "Y")
      setIconList([
        {
          Id: 1,
          Icon: (<EditIcon />),
          Action: "Edit"
        },
      ])
  }, [IsSubmitted])
  useEffect(() => {
    dispatch(getClassTeachers(ClassTeachersBody));
  }, [])
  useEffect(() => {
    if (ClassTeachers.length > 0) {
      setStandardDivisionId(ClassTeachers[1].Value)
    }
  }, [ClassTeachers])
  useEffect(() => {
    if (StandardDivisionId !== "0")
      dispatch(getAllTestsForClass(AllTestsForClassBody));
  }, [StandardDivisionId])

  useEffect(() => {
    if (AllTestsForClass.length > 0)
      setTestId(AllTestsForClass[0].Value)
  }, [AllTestsForClass])

  useEffect(() => {
    dispatch(getClassPassFailDetailsForTest(ClassPassFailDetailsForTestBody));
  }, [TestId])

  const clickTeacher = (value) => {
    setStandardDivisionId(value)
  }
  const clickExam = (value) => {
    setTestId(value)
  }

  const ClickItem = (value) => {
    navigate('/extended-sidebar/Teacher/SubjectExamMarks');
  }
  return (
    <Container>
      <PageHeader heading={'Exam Results'} subheading={''} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>  
      {IsSubmitted === 'Y' ? (
      <Card sx={{ backgroundColor: "#f8bbd0", height: '40px', width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #000' }}>
        
      <h4 style={{ margin: 0 , color: '#9c27b0'}}>Results for this exam have been published.</h4>
    </Card>
    ) : (
     

<Card sx={{ backgroundColor: "#f8bbd0", height: '35px', width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center' ,border: '1px solid #000' }}>
        
<h4 style={{ margin: 0 , color: '#9c27b0'}}>Not all results for this exam have been submitted.</h4>

</Card>
    )}
      </Box>

      <br></br>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* <Grid item xs={2}>
          <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>
            Select Class Teacher:
          </Typography>
        </Grid> */}
 

        <Grid item xs={4}>
          
          <Dropdown Array={ClassTeachers} handleChange={clickTeacher}
            label={"Teacher"} defaultValue={StandardDivisionId} />
          <br></br>  

        </Grid>

        {/* <Grid item xs={2}>
          <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>
            Select Exam :
          </Typography>
        </Grid> */}
        <Grid item xs={4}>
          <Dropdown Array={AllTestsForClass} handleChange={clickExam}
            label={"Exam"} defaultValue={TestId} />
          <br></br>

        </Grid>
        <ButtonPrimary >Topper</ButtonPrimary>
  
      </Grid>
      <br></br>
      <Box mb={1}>
      <Card sx={{ backgroundColor: "#4dd0e1", height: '40px', width: '55vw', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white' }}>
        
        <h4 style={{ margin: 0 , color: 'balck'}}>Subject</h4>
      </Card>
      </Box>
      <Box mb={1}>
      <DynamicList HeaderList={HeaderList} ItemList={ClassPassFailDetailsForTest}
        IconList={IconList} ClickItem={ClickItem} />
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
  <Button variant="contained" color="primary">VIEW PROGRESS REPORT</Button>
  <Button variant="contained" color="primary">GENERATE TOPPERS</Button>
  <Button variant="contained" color="primary">PUBLISH</Button>
  <Button variant="contained" color="primary">UNPUBLISH</Button>
  <Button variant="contained" color="primary">Progress Remarks</Button>
  <Button variant="contained" color="primary">Transfer Optional Subject Marks</Button>
  <Button variant="contained" color="primary">Termwise Height-Weight</Button>
</Box>
        
         
  
         
    </Container>
  )
}

export default ExamResultBase

