import React, { useEffect, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { useDispatch } from 'react-redux';
import { getAllTestsForClass, getClassPassFailDetailsForTest, getClassTeachers } from 'src/requests/ExamResult/RequestExamResult';
import { IGetAllTestsForClassBody, IGetClassPassFailDetailsForTestBody, IGetClassTeachersBody } from 'src/interfaces/ExamResult/IExamResult';
import { RootState, useSelector } from 'src/store';
import EditIcon from '@mui/icons-material/Edit';
import DynamicList from 'src/libraries/list/DynamicList'
import { Box, Container, Grid, Typography } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { useNavigate } from 'react-router';

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

      </Grid>
      <br></br>
      <DynamicList HeaderList={HeaderList} ItemList={ClassPassFailDetailsForTest}
        IconList={IconList} ClickItem={ClickItem} />
    </Container>
  )
}

export default ExamResultBase

