import EditIcon from '@mui/icons-material/Edit';
import Person from '@mui/icons-material/Person';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody, IGetClasswiseExamDropdownBody,
  IGetPrePrimaryProgressSheetStatusBody,
  IPublishUnpublishExamResultBody
} from 'src/interfaces/ExamResult/IExamResult';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList from 'src/libraries/list/DynamicList';
import {
  getClassPassFailDetailsForButton,
  getClassPassFailDetailsForTest,
  getClassTeachers, getClasswiseExam,
  getProgressSheetStatus,
  getPublishUnpublishExam, resetPublishUnpublishExams
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
  const [Reason, setReason] = useState('');
  const [TestId, setTestId] = useState("0");
  const [DisplayNote, setDisplayNote] = useState('');
  const [Open, setOpen] = useState(false);


  // const [isPublished, setIsPublished] = useState(true);
  //const [unpublishReason, setUnpublishReason] = useState('');

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );


  const [IconList, setIconList] = useState([]);
  const LinkList = [0]
  const ClassTeachers: any = useSelector(
    (state: RootState) => state.ExamResult.ClassTeachers
  );


  const Submitted: any = useSelector(
    (state: RootState) => state.ExamResult.IsSubmitted
  );
  console.log(Submitted, "Submit")

  const HeaderList: any = useSelector(
    (state: RootState) => state.ExamResult.HeaderList
  );

  const ClassPassFailDetailsForTest: any = useSelector(
    (state: RootState) => state.ExamResult.ClassPassFailDetailsForTest
  );


  const ClassPassFailDetailsForTestData: any = useSelector(
    (state: RootState) => state.ExamResult.ClassPassFailDetailsForTestData
  );


  const ClassPassFailDetailsForButton: any = useSelector(
    (state: RootState) => state.ExamResult.ClassPassDetailsForButton
  );


  const ClasswiseExams: any = useSelector(
    (state: RootState) => state.ExamResult.ClasswiseExam
  );


  const PublishUnpublish: any = useSelector(
    (state: RootState) => state.ExamResult.PublishUnpublishExam
  );


  const ProgressSheet: any = useSelector(
    (state: RootState) => state.ExamResult.ProgressSheetStatus
  );


  const loading = useSelector((state: RootState) => state.ExamResult.Loading);

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Exam Results') perm = item.IsFullAccess;
    });
    return perm;
  };

  const ClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asTeacherId: Number(GetScreenPermission() == 'Y' ? 0 : StandardDivisionId)
  };

  const GetClasswiseExamDropdown: IGetClasswiseExamDropdownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: Number(StandardDivisionId)
  };


  const ClassPassFailDetailsForTestBody: IGetClassPassFailDetailsForTestBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: StandardDivisionId,
    aiTestId: TestId.toString()
  };

  const GetPrePrimaryProgressSheetStatusBody: IGetPrePrimaryProgressSheetStatusBody = {
    asSchoolId: Number(asSchoolId),
    asStdDivId: Number(StandardDivisionId),
    asAcadmicYearId: Number(asAcademicYearId),
    asTest_Id: Number(TestId)
  };

  // useEffect(() => {
  //   console.log("Submitted:", Submitted);
  //   if (Submitted.IsSubmitted == 'N') {
  //     setIconList([]);
  //     setDisplayNote(['Not all results for this exam have been submitted.']);
  //   }

  //   if (Submitted.IsSubmitted == 'Y')
  //     setDisplayNote(['Results for this exam have been published.']);
  //   setIconList([
  //     {
  //       Id: 1,
  //       Icon: <EditIcon />,
  //       Action: 'Edit'
  //     }
  //   ]);
  // }, [Submitted]);
  // useEffect(() => {
  //   console.log("Submitted:", Submitted);
  //   if (Submitted == 'N') {
  //     setIconList([])
  //     setDisplayNote('Not all results for this exam have been submitted.');
  //   } else if (Submitted == 'Y') {
  //     setDisplayNote('Results for this exam have been published.');
  //     setIconList([
  //       {
  //         Id: 1,
  //         Icon: <EditIcon />,
  //         Action: 'Edit'
  //       }
  //     ]);
  //   }
  // }, [Submitted]);
  useEffect(() => {
    console.log("Submitted:", Submitted);
    if (Submitted === 'N') {
      setIconList([]);
      setDisplayNote('Not all results for this exam have been submitted.');
    } else if (Submitted === 'Y' && ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish) {
      setDisplayNote('Results for this exam have been published.');
      setIconList([
        {
          Id: 1,
          Icon: <EditIcon />,
          Action: 'Edit'
        }
      ]);
    } else {
      setDisplayNote('');
      setIconList([]);
    }
  }, [Submitted, ClassPassFailDetailsForButton]);

  useEffect(() => {
    dispatch(getClassTeachers(ClassTeachersBody));
  }, []);
  useEffect(() => {
    dispatch(getClasswiseExam(GetClasswiseExamDropdown));
  }, []);

  useEffect(() => {
    dispatch(getProgressSheetStatus(GetPrePrimaryProgressSheetStatusBody));
  }, []);

  useEffect(() => {
    if (ClassTeachers.length > 0)
      setStandardDivisionId(ClassTeachers[0].Id);
  }, [ClassTeachers]);

  const getIsTestExists = (value) => {
    let IsTestExists = false
    ClasswiseExams.map((Item) => {
      if (Item.Value == value)
        IsTestExists = true
    })
    return IsTestExists
  }
  useEffect(() => {
    if (ClasswiseExams.length > 0 &&
      (TestId == "0" || !getIsTestExists(TestId))
    )
      setTestId(ClasswiseExams[0].Value);
  }, [ClasswiseExams]);

  useEffect(() => {
    if (StandardDivisionId == '0')
      dispatch(getClasswiseExam(GetClasswiseExamDropdown));
  }, [StandardDivisionId]);

  useEffect(() => {
    if (StandardDivisionId !== '0')
      dispatch(getClasswiseExam(GetClasswiseExamDropdown));
  }, [StandardDivisionId]);



  useEffect(() => {
    dispatch(getClassPassFailDetailsForTest(ClassPassFailDetailsForTestBody));
  }, [StandardDivisionId, TestId]);
  useEffect(() => {
    dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody));
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



  const TransferOptionalSubjectMarks = (value) => {
    navigate('/extended-sidebar/Teacher/TransferOptionalSubjectMarks');
  };

  const ClickLink = (value) => {
    navigate(
      '/extended-sidebar/Teacher/SubjectMarkList/' +
      TestId +
      '/' +
      StandardDivisionId +
      '/' +
      getExamName() +
      '/' +
      getTeacherName() +
      '/' +
      value.Id.SubjectName + '/' + value.Id.SubjectId
    );
  }


  const TermwiseHighwight = (value) => {
    navigate('/extended-sidebar/Teacher/TermwiseHeightWeight');
  };

  const ProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ProgressRemarks');
  };
  const ViewProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ViewProgressRemarks');
  };

  const ClickOpenDialogbox = () => {
    setOpen(true);
  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
  };
  const getExamName = () => {
    let ExamName = '';
    ClasswiseExams.map((item) => {
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

  const clickPublishUnpublish = (publish, Reason = '') => {
    if (publish) {
      const GetPublishUnpublish: IPublishUnpublishExamResultBody = {
        asSchoolId: Number(asSchoolId),
        asStdDivId: Number(StandardDivisionId),
        asAcadmicYearId: Number(asAcademicYearId),
        asTest_Id: Number(TestId),
        asUnpublishReason: null, // publish action
        asPublishById: 1 //  publish
      };

      dispatch(getPublishUnpublishExam(GetPublishUnpublish));
    } else {
      if (Reason !== '') {
        const GetPublishUnpublish: IPublishUnpublishExamResultBody = {
          asSchoolId: Number(asSchoolId),
          asStdDivId: Number(StandardDivisionId),
          asAcadmicYearId: Number(asAcademicYearId),
          asTest_Id: Number(TestId),
          asUnpublishReason: Reason,
          asPublishById: 0 //  unpublish
        };

        dispatch(getPublishUnpublishExam(GetPublishUnpublish));

        // toast.success(PublishUnpublish)
      }
    }
  };
  useEffect(() => {

    if (PublishUnpublish !== '') {
      toast.success(PublishUnpublish)
      dispatch(resetPublishUnpublishExams())
      dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody))
    }
  }, [PublishUnpublish])
  // useEffect(() => {
  //   setIsPublished(ClassPassFailDetailsForTestData.IsPublish);
  // }, [ClassPassFailDetailsForTestData]);
  // useEffect(() => {

  //   if (ClassPassFailDetailsForTestData !== '') {
  //     setIsPublished(ClassPassFailDetailsForTestData.IsPublish);
  //   } else {
  //     setIsPublished(true);

  //   }
  // }, [ClassPassFailDetailsForTestData]);
  const getDropdownName = (List, value) => {
    let returnVal = ""
    List.map((Item) => {
      if (Item.Value == value)
        returnVal = Item.Name
    })
    return returnVal
  }
  return (
    <Box sx={{ px: 2 }}>
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
            ItemList={ClasswiseExams}
            onChange={clickExam}
            label={'Exam'}
            defaultValue={TestId} // Convert number to string
            mandatory
            size={"small"}
          />

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
          <Tooltip title={"Toppers"}>
            <IconButton
              onClick={Toppers}
              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600]
                }
              }}
            >
              <Person />
            </IconButton>
          </Tooltip>

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
            {/* <Typography variant="body1" color="textSecondary">
              {isPublished ? "Result for this exam has been published" : "No record found"}
            </Typography> */}
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
                Data={ClassPassFailDetailsForTestData}
              />
            )}
          </Box>
        </Box>

      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>

        <Button variant="contained" color="primary" onClick={ViewProgressRemark} disabled={ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish}>
          VIEW PROGRESS REPORT
        </Button>
        <Button variant="contained" color="primary" disabled={ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.ToppersGenerated}>
          GENERATE TOPPERS
        </Button>

        <Button color={"primary"} variant={"contained"} onClick={() => clickPublishUnpublish(true)} disabled={ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish}>
          PUBLISH ALL
        </Button>

        <Button color={"primary"} variant={"contained"} onClick={ClickOpenDialogbox} disabled={ClassPassFailDetailsForButton && !ClassPassFailDetailsForButton.IsPublish}>
          UNPUBLISH ALL
        </Button>


        {Open && (
          <ExamResultUnpublish
            open={Open}
            setOpen={setOpen}
            ClickCloseDialogbox={ClickCloseDialogbox}
            clickPublishUnpublish={clickPublishUnpublish}
            ExamName={getDropdownName(ClasswiseExams, TestId)}
            TeacherName={getDropdownName(ClassTeachers, StandardDivisionId)}

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
    </Box >
  );
};

export default ExamResultBase;










