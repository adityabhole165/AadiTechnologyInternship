import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetAllTestsForClassBody,
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody
} from 'src/interfaces/ExamResult/IExamResult';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Note from 'src/libraries/Note/Note';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import DynamicList from 'src/libraries/list/DynamicList';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  getAllTestsForClass,
  getClassPassFailDetailsForTest,
  getClassTeachers
} from 'src/requests/ExamResult/RequestExamResult';
import { RootState, useSelector } from 'src/store';

const ExamResultBase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [StandardDivisionId, setStandardDivisionId] = useState(
    sessionStorage.getItem('TeacherId')
  );
  //const [SelectTeacher, setSelectTeacher] = useState( Number(sessionStorage.getItem('TeacherId')));

  const [TestId, setTestId] = useState('0');
  const [DisplayNote, setDisplayNote] = useState([]);

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  console.log('ScreensAccessPermission', ScreensAccessPermission);

  const [IconList, setIconList] = useState([]);
  const ClassTeachers: any = useSelector(
    (state: RootState) => state.ExamResult.ClassTeachers
  );
  console.log('ClassTeachers', ClassTeachers);

  const IsSubmitted: any = useSelector(
    (state: RootState) => state.ExamResult.IsSubmitted
  );

  const HeaderList: any = useSelector(
    (state: RootState) => state.ExamResult.HeaderList
  );

  const ClassPassFailDetailsForTest: any = useSelector(
    (state: RootState) => state.ExamResult.ClassPassFailDetailsForTest
  );

  const AllTestsForClass: any = useSelector(
    (state: RootState) => state.ExamResult.AllTestsForClass
  );

  console.log('AllTestsForClass', AllTestsForClass);

  const loading = useSelector((state: RootState) => state.ExamResult.Loading);

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Exam Results') perm = item.IsFullAccess;
    });
    return perm;
  };

  const ClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asTeacherId: Number(GetScreenPermission() == 'Y' ? 0 : StandardDivisionId)
  };

  const AllTestsForClassBody: IGetAllTestsForClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId
  };

  const ClassPassFailDetailsForTestBody: IGetClassPassFailDetailsForTestBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: StandardDivisionId,
    aiTestId: TestId
  };

  useEffect(() => {
    if (IsSubmitted == 'N') {
      setIconList([]);
      setDisplayNote(['Not all results for this exam have been submitted.']);
    }

    if (IsSubmitted == 'Y')
      setDisplayNote(['Results for this exam have been published.']);
    setIconList([
      {
        Id: 1,
        Icon: <EditIcon />,
        Action: 'Edit'
      }
    ]);
  }, [IsSubmitted]);

  useEffect(() => {
    dispatch(getClassTeachers(ClassTeachersBody));
  }, []);
  useEffect(() => {
    dispatch(getAllTestsForClass(AllTestsForClassBody));
  }, []);


  // useEffect(() => {
  //   if (ClassTeachers.length > 0) {
  //     setStandardDivisionId(ClassTeachers[1].Value);
  //   }
  // }, [ClassTeachers]);
  useEffect(() => {
    if (ClassTeachers.length > 0)
      setStandardDivisionId(ClassTeachers[0].Id);
  }, [ClassTeachers]);
  useEffect(() => {
    if (AllTestsForClass.length > 0) setTestId(AllTestsForClass[0].Id);
  }, [AllTestsForClass]);
  useEffect(() => {
    if (StandardDivisionId == '0')
      dispatch(getAllTestsForClass(AllTestsForClassBody));
  }, [StandardDivisionId]);

  useEffect(() => {
    if (StandardDivisionId !== '0')
      dispatch(getAllTestsForClass(AllTestsForClassBody));
  }, [StandardDivisionId]);



  useEffect(() => {
    dispatch(getClassPassFailDetailsForTest(ClassPassFailDetailsForTestBody));
  }, [StandardDivisionId, TestId]);

  const clickTeacher = (value) => {
    setStandardDivisionId(value);
  };
  const clickExam = (value) => {
    setTestId(value);
  };

  const ClickItem = (value) => {
    navigate('/extended-sidebar/Teacher/SubjectExamMarks');
  };

  const TermwiseHighwight = (value) => {
    navigate('/extended-sidebar/Teacher/TermwiseHeightWeight');
  };

  const ProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ProgressRemarks');
  };

  const getExamName = () => {
    let ExamName = '';
    AllTestsForClass.map((item) => {
      if (item.Value == TestId) ExamName = item.Name;
    });
    return ExamName;
  };

  const getTeacherName = () => {
    let TeacherName = '';
    ClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) TeacherName = item.Name;
    });
    return TeacherName;
  };
  const onClickUnpublish = (value) => {
    navigate(
      '/extended-sidebar/Teacher/ExamResultUnpublish/' +
      TestId +
      '/' +
      StandardDivisionId +
      '/' +
      getExamName() +
      '/' +
      getTeacherName()
    );
  };
  const getTeacherId = () => {
    let TeacherId = '';
    ClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) TeacherId = item.Id;
    });
    return TeacherId;
  };
  const Toppers = (value) => {
    navigate('/extended-sidebar/Teacher/FinalResultToppers/' + getTeacherId());
  };

  return (
    <Container>
      <PageHeader heading={'Exam Results'} subheading={''} />
      <Note NoteDetail={DisplayNote} />
      <br></br>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <Dropdown
            Array={ClassTeachers}
            handleChange={clickTeacher}
            label={'Teacher'}
            defaultValue={StandardDivisionId}
          />
          <br></br>
        </Grid>

        <Grid item xs={4}>
          <Dropdown
            Array={AllTestsForClass}
            handleChange={clickExam}
            label={'Exam'}
            defaultValue={TestId}
          />
          <br></br>
        </Grid>
        <ButtonPrimary
          variant="contained"
          style={{ marginLeft: '60px', backgroundColor: 'Blue' }}
          onClick={Toppers}
        >
          {' '}
          TOPPERS{' '}
        </ButtonPrimary>
      </Grid>
      <br></br>
      <Box mb={1}></Box>
      {loading ? (
        <SuspenseLoader />
      ) : (
        <Box mb={1}>
          <DynamicList
            HeaderList={HeaderList}
            ItemList={ClassPassFailDetailsForTest}
            IconList={IconList}
            ClickItem={ClickItem}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
        <Button variant="contained" color="primary">
          VIEW PROGRESS REPORT
        </Button>
        <Button variant="contained" color="primary">
          GENERATE TOPPERS
        </Button>
        <Button variant="contained" color="primary">
          PUBLISH
        </Button>
        <Button onClick={onClickUnpublish} variant="contained" color="primary">
          UNPUBLISH
        </Button>
        <Button variant="contained" color="primary" onClick={ProgressRemark}>
          Progress Remarks
        </Button>
        <Button variant="contained" color="primary">
          Transfer Optional Subject Marks
        </Button>
        <Button variant="contained" color="primary" onClick={TermwiseHighwight}>
          Termwise Height-Weight
        </Button>
      </Box>
    </Container>
  );
};

export default ExamResultBase;
