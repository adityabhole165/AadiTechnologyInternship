import EditIcon from '@mui/icons-material/Edit';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetAllTestsForClassBody,
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody
} from 'src/interfaces/ExamResult/IExamResult';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList from 'src/libraries/list/DynamicList';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  getAllTestsForClass,
  getClassPassFailDetailsForTest,
  getClassTeachers
} from 'src/requests/ExamResult/RequestExamResult';
import { RootState, useSelector } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import ExamResultUnpublish from '../ExamResultUnpublish/ExamResultUnpublish';
const ExamResultBase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [StandardDivisionId, setStandardDivisionId] = useState(
    sessionStorage.getItem('TeacherId')
  );
  //const [SelectTeacher, setSelectTeacher] = useState( Number(sessionStorage.getItem('TeacherId')));

  const [TestId, setTestId] = useState("0");
  const [DisplayNote, setDisplayNote] = useState([]);
  const [Open, setOpen] = useState(false);

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  console.log('ScreensAccessPermission', ScreensAccessPermission);

  const [IconList, setIconList] = useState([]);
  const LinkList = [0]
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
    aiTestId: TestId.toString()
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

  const getIsTestExists = (value) => {
    let IsTestExists = false
    AllTestsForClass.map((Item) => {
      if (Item.Value == value)
        IsTestExists = true
    })
    return IsTestExists
  }
  useEffect(() => {
    if (AllTestsForClass.length > 0 &&
      (TestId == "0" || !getIsTestExists(TestId))
    )
      setTestId(AllTestsForClass[0].Value);
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
    console.log(value, "value")
  };

  const ClickItem = (value) => {
    navigate('/extended-sidebar/Teacher/SubjectExamMarks');
  };



  const TransferOptionalSubjectMarks = (value) => {
    navigate('/extended-sidebar/Teacher/TransferOptionalSubjectMarks');
  };

  const ClickLink = (value) => {
    console.log(value, "ClickLink");

    if (value.Index == 0)
      navigate('/extended-sidebar/Teacher/TermwiseHeightWeight');
  }
  const TermwiseHighwight = (value) => {
    navigate('/extended-sidebar/Teacher/TermwiseHeightWeight');
  };

  const ProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ProgressRemarks');
  };
  const ClickOpenDialogbox = () => {
    setOpen(true);
  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
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
    navigate('/extended-sidebar/Teacher/ExamResultToppers/' + getTeacherId() + '/' + StandardDivisionId);
  };
  const ClickSubject = (Id) => {
    navigate('/extended-sidebar/Teacher/SubjectMarkList/' + Id);
  };
  const clickPublishUnpublish = (IsPublish) => {

    // const AllPublishUnpublishAddHomeworkBody: IAllPublishUnpublishAddHomeworkBody =
    // {
    //   asSchoolId: asSchoolId.toString(),
    //   asAcademicYearId: asAcademicYearId.toString(),
    //   asHomeWorkLogId: getSelectedSubject(),
    //   asUnpublishReason: 'Yesss',
    //   asUpdatedById: TeacherId,
    //   IsPublished: IsPublish,
    //   IsSMSSent: 1
    // };

    // dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody));
    // // dispatch(Publishallreset());
    // // dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

    // // }
  };

  return (
    <Container>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' }
        ]}
        rightActions={<>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={ClassTeachers}
            onChange={clickTeacher}
            label={'Teacher'}
            defaultValue={StandardDivisionId.toString()} // Convert number to string
            mandatory
            size={"small"}
          />
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={AllTestsForClass}
            onChange={clickExam}
            label={'Exam'}
            defaultValue={TestId} // Convert number to string
            mandatory
            size={"small"}
          />
          {/* <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={AllTestsForClass}
            onChange={clickExam}
            label={'Exam'}
            defaultValue={TestId.toString()} // Convert number to string
            mandatory
            size={"small"}
          /> */}
          <Tooltip title={DisplayNote}>
            <IconButton

              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[500]
                }
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
          <ButtonPrimary
            variant="contained"
            style={{ backgroundColor: 'Blue', padding: '18px' }}
            onClick={Toppers}
          >
            {' '}
            TOPPERS{' '}
          </ButtonPrimary>

        </>}
      />

      {loading ? (
        <SuspenseLoader />
      ) : (
        <Box mb={1} sx={{ p: 2, background: 'white' }}>
          <Box>
            <Typography variant={'h4'} mb={1}>
              Results
            </Typography>
            {ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No Record Found.</b>
              </Typography>
            ) : (
              <DynamicList
                HeaderList={HeaderList}
                ItemList={ClassPassFailDetailsForTest}
                IconList={IconList}
                ClickItem={ClickItem}
                LinkList={LinkList}
                ClickLink={ClickLink}
              />
            )}
          </Box>
        </Box>

      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
        <Button variant="contained" color="primary">
          VIEW PROGRESS REPORT
        </Button>
        <Button variant="contained" color="primary">
          GENERATE TOPPERS
        </Button>
        {/* <Button variant="contained" color="primary">
          PUBLISH
        </Button> */}
        <Button color={"primary"} variant={"contained"} onClick={() => clickPublishUnpublish(1)}>
          PUBLISH ALL
        </Button>
        {/* <Button onClick={onClickUnpublish} variant="contained" color="primary">
          UNPUBLISH
        </Button> */}
        <Button color={"primary"} variant={"contained"} onClick={ClickOpenDialogbox}>
          UNPUBLISH ALL
        </Button>

        {Open && (
          <ExamResultUnpublish
            open={Open}
            setOpen={setOpen}
            ClickCloseDialogbox={ClickCloseDialogbox}
            clickPublishUnpublish={clickPublishUnpublish}
          />
        )}

        <Button variant="contained" color="primary" onClick={ProgressRemark}>
          Progress Remarks
        </Button>
        <Button variant="contained" color="primary" onClick={TransferOptionalSubjectMarks}>
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
