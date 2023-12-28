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
import Note from 'src/libraries/Note/Note';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const ExamResultBase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem("localSchoolId")
  const asAcademicYearId = sessionStorage.getItem("AcademicYearId")
  const [StandardDivisionId, setStandardDivisionId] = useState("0")
  const [TestId, setTestId] = useState("0")
  const [DisplayNote,setDisplayNote]=useState([])

  const [IconList, setIconList] = useState([])
  const ClassTeachers: any = useSelector((state: RootState) => state.ExamResult.ClassTeachers);
  const IsSubmitted: any = useSelector((state: RootState) => state.ExamResult.IsSubmitted);
  const HeaderList: any = useSelector((state: RootState) => state.ExamResult.HeaderList);
  const ClassPassFailDetailsForTest: any = useSelector((state: RootState) => state.ExamResult.ClassPassFailDetailsForTest);
  const AllTestsForClass: any = useSelector((state: RootState) => state.ExamResult.AllTestsForClass);
  const loading = useSelector((state: RootState) => state.ExamResult.Loading);

  
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
    if (IsSubmitted == "N"){
      setIconList([])
      setDisplayNote(["Not all results for this exam have been submitted."])
    }

    if (IsSubmitted == "Y")
    setDisplayNote(["Results for this exam have been published."])
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

  const TermwiseHighwight = (value) => {
    navigate('/extended-sidebar/Teacher/TermwiseHeightWeight');
  }

  const ProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ProgressRemarks');
  }


  return (
    <Container>
      <PageHeader heading={'Exam Results'} subheading={''} />
      <Note NoteDetail={DisplayNote} />
      <br></br>
      <Grid container spacing={2} justifyContent="center" alignItems="center">

        <Grid item xs={4}>

          <Dropdown Array={ClassTeachers} handleChange={clickTeacher}
            label={"Teacher"} defaultValue={StandardDivisionId} />
          <br></br>

        </Grid>

        <Grid item xs={4}>
          <Dropdown Array={AllTestsForClass} handleChange={clickExam}
            label={"Exam"} defaultValue={TestId} />
          <br></br>

        </Grid>
        <ButtonPrimary >Topper</ButtonPrimary>

      </Grid>
      <br></br>
      <Box mb={1}>
      </Box>
      {loading ?
        (<SuspenseLoader />) :

        (<Box mb={1}>
          <DynamicList HeaderList={HeaderList} ItemList={ClassPassFailDetailsForTest}
            IconList={IconList} ClickItem={ClickItem} />
        </Box>)
      }
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
        <Button variant="contained" color="primary">VIEW PROGRESS REPORT</Button>
        <Button variant="contained" color="primary">GENERATE TOPPERS</Button>
        <Button variant="contained" color="primary">PUBLISH</Button>
        <Button variant="contained" color="primary">UNPUBLISH</Button>
        <Button variant="contained" color="primary" onClick={ProgressRemark}>Progress Remarks</Button>
        <Button variant="contained" color="primary"  >Transfer Optional Subject Marks</Button>
        <Button variant="contained" color="primary" onClick={TermwiseHighwight}>Termwise Height-Weight</Button>
      </Box>




    </Container>
  )
}

export default ExamResultBase

