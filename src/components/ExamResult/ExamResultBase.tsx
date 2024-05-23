import CheckCircle from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import FactCheck from '@mui/icons-material/FactCheck';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Person from '@mui/icons-material/Person';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Unpublished from '@mui/icons-material/Unpublished';
import { Box, Button, Checkbox, FormControlLabel, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  IGetAllStudentsByGivenStdDivsBody,
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody, IGetClasswiseExamDropdownBody,
  IGetPrePrimaryProgressSheetStatusBody,
  IGetSMSTemplateBody,
  IPublishUnpublishExamResultBody,
  IsMonthConfigurationForExamResultBody,
  IsPrePrimaryExamConfigurationBody
} from 'src/interfaces/ExamResult/IExamResult';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList from 'src/libraries/list/DynamicList';
import {
  getAllStudentsByGivenStdDivsResult,
  getClassPassFailDetailsForButton,
  getClassPassFailDetailsForTest,
  getClassTeachers, getClasswiseExam,
  getMonthConfigurationForExamResult,
  getPrePrimaryExamConfiguration,
  getProgressSheetStatus,
  getPublishUnpublishExam, getSMSTemplate, resetPublishUnpublishExams
} from 'src/requests/ExamResult/RequestExamResult';
import { RootState, useSelector } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import ExamResultUnpublish from '../ExamResultUnpublish/ExamResultUnpublish';
const ExamResultBase = () => {
  const { ParamsStandardDivisionId, ParamsTestId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserRole = localStorage.getItem('RoleName');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [StandardDivisionId, setStandardDivisionId] = useState(
    ParamsStandardDivisionId == undefined ? sessionStorage.getItem('TeacherId') : ParamsStandardDivisionId
  );
  const [Reason, setReason] = useState('');
  const [TestId, setTestId] = useState(
    ParamsTestId == undefined ? "0" : ParamsTestId

  );
  const [DisplayNote, setDisplayNote] = useState('');
  const [HelpNote, setHelpNote] = useState('');
  const [Open, setOpen] = useState(false);
  const [sendmeassagestudent, setsendmeassagestudent] = useState(false);
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


  const HeaderList: any = useSelector(
    (state: RootState) => state.ExamResult.HeaderList
  );
  const GetAllStudentsStdDivs: any = useSelector(
    (state: RootState) => state.ExamResult.GetAllStudentsByGivenStdDivs
  );

  const GetSMSTemplatess: any = useSelector(
    (state: RootState) => state.ExamResult.GetSMSTemplate
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
  const PrePrimaryExam: any = useSelector(
    (state: RootState) => state.ExamResult.IsPrePrimaryExamConfiguration
  );


  const MonthConfigurationForExam: any = useSelector(
    (state: RootState) => state.ExamResult.IsMonthConfigurationForExamResult
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
  const PrePrimaryExamConfiguration: IsPrePrimaryExamConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: Number(StandardDivisionId),
    asUserRole: asUserRole
  }
  const MonthConfigurationForExamResult: IsMonthConfigurationForExamResultBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: Number(StandardDivisionId),

  }
  const GetAllStudentsByGivenStdDivs: IGetAllStudentsByGivenStdDivsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivIds: Number(StandardDivisionId),
    IsLeftStudents: false
  }
  useEffect(() => {
    dispatch(getAllStudentsByGivenStdDivsResult(GetAllStudentsByGivenStdDivs));
  }, [StandardDivisionId]);
  const GetSMSTemplate: IGetSMSTemplateBody = {
    asSchoolId: Number(asSchoolId),
    asSmsTemplateId: Number(sendmeassagestudent)
  }
  useEffect(() => {
    dispatch(getSMSTemplate(GetSMSTemplate));
  }, [sendmeassagestudent]);
  useEffect(() => {
    dispatch(getClassTeachers(ClassTeachersBody));
  }, []);

  useEffect(() => {
    if (ClassTeachers.length > 0) {
      setStandardDivisionId(ClassTeachers[0].Value);
    }
  }, [ClassTeachers]);

  useEffect(() => {
    setHelpNote('View the summarised results of your class for the selected exam.Click the subject name link to view the marks/grades scored by each student in the subject.Exam result can be publish on be clicking publish button and unpublish by clicking unpublish button.');
    if (ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish) {
      setDisplayNote('Results for this exam have been published.');
      setIconList([{ Id: 1, Icon: <EditIcon />, Action: 'Edit' }]);
    } else {
      if (Submitted === 'N' && ClassPassFailDetailsForButton && !ClassPassFailDetailsForButton.IsPublish) {
        setDisplayNote('Not all results for this exam have been submitted.');
        setIconList([{ Id: 1, Icon: <EditIcon />, Action: 'Edit' }]);
      } else if (Submitted === 'Y' && ClassPassFailDetailsForButton && !ClassPassFailDetailsForButton.IsPublish) {

        setDisplayNote('');
        setIconList([{ Id: 1, Icon: <EditIcon />, Action: 'Edit' }]);
      }
    }
  }, [Submitted, ClassPassFailDetailsForButton]);


  useEffect(() => {
    dispatch(getPrePrimaryExamConfiguration(PrePrimaryExamConfiguration));

  }, [ClassPassFailDetailsForButton, PrePrimaryExam, StandardDivisionId]);




  useEffect(() => {
    dispatch(getPrePrimaryExamConfiguration(PrePrimaryExamConfiguration));
    dispatch(getMonthConfigurationForExamResult(MonthConfigurationForExamResult));
  }, [StandardDivisionId]);


  useEffect(() => {
    dispatch(getClasswiseExam(GetClasswiseExamDropdown));
  }, []);

  useEffect(() => {
    dispatch(getProgressSheetStatus(GetPrePrimaryProgressSheetStatusBody));
  }, []);

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
    dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody));
  }, [StandardDivisionId, TestId]);


  const clickTeacher = (value) => {
    setStandardDivisionId(value);
  };
  const clickExam = (value) => {
    setTestId(value);

  };
  // const ClickItem = (value) => {
  //   navigate('/extended-sidebar/Teacher/SubjectExamMarks/' + examResultProp
  //   ) 

  //     ;
  // };


  const getSubjectId = (index) => {
    console.log(index, "index");

    let returnVal = "0"
    ClassPassFailDetailsForTestData.map((Item, i) => {
      if (i == index)
        returnVal = Item.SubjectId
    })
    return returnVal
  }
  const ClickItem = (value) => {
    navigate('/extended-sidebar/Teacher/SubjectExamMarks/' +
      '0' + '/' +
      StandardDivisionId + '/' +
      getSubjectId(value.Index) + '/' +
      '0' + '/' +
      TestId + '/' +
      getTeacherId() + '/' +
      '0/' +
      // value.StandardId + '/' +
      'true' + '/' +
      'false' + '/' +
      'true'

    );
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
  const handleCheckboxChange = (value) => {
    setsendmeassagestudent(value);
  };

  const TermwiseHighwight = (value) => {
    navigate('/extended-sidebar/Teacher/TermwiseHeightWeight');
  };

  const ProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ProgressRemarks');
  };
  const ViewProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ViewProgressReport/' + TestId + '/' + StandardDivisionId);
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
    const GetPublishUnpublish: IPublishUnpublishExamResultBody = {
      asSchoolId: Number(asSchoolId),
      asStdDivId: Number(StandardDivisionId),
      asAcadmicYearId: Number(asAcademicYearId),
      asTest_Id: Number(TestId),
      asUnpublishReason: publish ? null : Reason,
      asPublishById: publish ? 1 : 0
    };

    dispatch(getPublishUnpublishExam(GetPublishUnpublish));
  };
  // const clickPublishUnpublish = (publish, Reason = '') => {
  //   if (publish) {
  //     if (!window.confirm("Once you publish the result it will be visible to parents/students. Are you sure you want to continue?")) {
  //       return;
  //     }

  //     const GetPublishUnpublish: IPublishUnpublishExamResultBody = {
  //       asSchoolId: Number(asSchoolId),
  //       asStdDivId: Number(StandardDivisionId),
  //       asAcadmicYearId: Number(asAcademicYearId),
  //       asTest_Id: Number(TestId),
  //       asUnpublishReason: null, // publish action
  //       asPublishById: 1 //  publish
  //     };

  //     dispatch(getPublishUnpublishExam(GetPublishUnpublish));
  //   } else {
  //     if (Reason !== '') {
  //       const GetPublishUnpublish: IPublishUnpublishExamResultBody = {
  //         asSchoolId: Number(asSchoolId),
  //         asStdDivId: Number(StandardDivisionId),
  //         asAcadmicYearId: Number(asAcademicYearId),
  //         asTest_Id: Number(TestId),
  //         asUnpublishReason: Reason,
  //         asPublishById: 0 //  unpublish
  //       };

  //       dispatch(getPublishUnpublishExam(GetPublishUnpublish));

  //       // toast.success(PublishUnpublish)
  //     }
  //   }
  // };
  useEffect(() => {

    if (PublishUnpublish !== '') {
      toast.success(PublishUnpublish)
      dispatch(resetPublishUnpublishExams())
      dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody))
    }
  }, [PublishUnpublish])

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

          {/* <Tooltip title={DisplayNote}>
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
          </Tooltip> */}

          <Tooltip title={HelpNote}>
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


          {/* <Tooltip title={"Toppers"} >
            <IconButton
              onClick={Toppers}
              disabled={!ClassPassFailDetailsForButton || !ClassPassFailDetailsForButton?.ToppersGenerated}
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

          </Tooltip> */}
          {/* {ClassPassFailDetailsForButton && (
            <Tooltip title={"Toppers"} >
              <IconButton
                onClick={Toppers}
                disabled={!ClassPassFailDetailsForButton?.ToppersGenerated}
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
          )} */}
          {/* {ClassPassFailDetailsForButton?.ToppersGenerated || Submitted === 'Y' && ClassPassFailDetailsForButton?.ToppersGenerated && !ClassPassFailDetailsForButton?.IsPublish || Submitted === 'N' && !ClassPassFailDetailsForButton?.ToppersGenerated && !ClassPassFailDetailsForButton?.IsPublish &&
            // || !MonthConfigurationForExam(
            <Tooltip title={"Toppers"} >
              <IconButton
                onClick={Toppers}
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }} disabled={(Submitted === 'N' && !ClassPassFailDetailsForButton?.ToppersGenerated && !ClassPassFailDetailsForButton?.IsPublish)}

              >
                <Person />
              </IconButton>
            </Tooltip>
          } */}





          <Tooltip title={"View Progress Report"}>
            <IconButton sx={{
              color: 'white',
              backgroundColor: grey[500],
              '&:hover': {
                backgroundColor: grey[600]
              }
            }} onClick={ViewProgressRemark} disabled={(ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish || Submitted === 'N' && !ClassPassFailDetailsForButton?.IsPublish)
              // || !MonthConfigurationForExam
            }>
              {/* VIEW PROGRESS REPORT  */}
              <FactCheck />
            </IconButton>
          </Tooltip>

          {/* {!ClassPassFailDetailsForButton?.IsPublish && ClassPassFailDetailsForButton?.ToppersGenerated || ClassPassFailDetailsForButton?.IsPublish && ClassPassFailDetailsForButton?.ToppersGenerated || Submitted === 'N' && !ClassPassFailDetailsForButton?.ToppersGenerated && !ClassPassFailDetailsForButton?.IsPublish && */}

          <Tooltip title={"Generate Toppers"}>

            <IconButton sx={{
              color: 'white',
              backgroundColor: grey[500],
              '&:hover': {
                backgroundColor: grey[600]
              }
            }} disabled={(Submitted === 'N' && !ClassPassFailDetailsForButton?.ToppersGenerated || ClassPassFailDetailsForButton?.ToppersGenerated)

            }>
              {/* GENERATE TOPPERS */}
              <ManageAccounts />
            </IconButton>
          </Tooltip>

          {/* } */}
          <Tooltip title={"Publish All"} >
            <IconButton sx={{
              color: 'white',
              backgroundColor: grey[500],
              '&:hover': {
                backgroundColor: green[500]
              }
            }} onClick={() => clickPublishUnpublish(true)} disabled={(ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish || Submitted === 'N' && !ClassPassFailDetailsForButton?.IsPublish)

            }>
              {/* PUBLISH ALL */}
              <CheckCircle />
            </IconButton>
          </Tooltip>

          <Tooltip title={"Unpublish All"}>
            <IconButton sx={{
              color: 'white',
              backgroundColor: grey[500],
              '&:hover': {
                backgroundColor: red[500]
              }
            }} onClick={ClickOpenDialogbox} disabled={(ClassPassFailDetailsForButton && !ClassPassFailDetailsForButton.IsPublish || Submitted === 'N' && !ClassPassFailDetailsForButton?.IsPublish)

            }>
              {/* UNPUBLISH ALL */}
              <Unpublished />
            </IconButton>
          </Tooltip>

          <Tooltip title={"Toppers"} >
            <IconButton
              onClick={Toppers}
              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600]
                }
              }} disabled={(Submitted === 'N' && !ClassPassFailDetailsForButton?.ToppersGenerated && !ClassPassFailDetailsForButton?.IsPublish || !ClassPassFailDetailsForButton?.ToppersGenerated)}

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
            <Stack direction={'row'} gap={2}>
              <Typography variant={'h4'} mb={1}>

              </Typography>
              {/* <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 6, color: 'white' }}>
                {DisplayNote}
              </Typography> */}
            </Stack>
            <Stack direction={'row'} mb={1} justifyContent='space-between'>
              {/* {!(ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish) && (
                <Typography margin={'1px'}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendmeassagestudent}
                        onChange={(e) => {
                          handleCheckboxChange(e.target.checked);
                        }}
                      />
                    }
                    label="Send Message and Mobile Notification"
                  />
                </Typography>
              )} */}

              <Stack direction={'row'} gap={1}>
                <Button variant="contained" color="primary" onClick={ProgressRemark}>
                  Progress Remarks
                </Button>
                {/* <Button variant="contained" color="primary" onClick={TransferOptionalSubjectMarks}>
                  Transfer Optional Subject Marks
                </Button> */}
                {GetScreenPermission() === 'Y' ? (
                  <Button variant="contained" color="primary" onClick={TransferOptionalSubjectMarks}>
                    Transfer Optional Subject Marks
                  </Button>
                ) : null}

                <Button variant="contained" color="primary" onClick={TermwiseHighwight}>
                  Termwise Height-Weight
                </Button>
                {ClassPassFailDetailsForButton &&
                  ClassPassFailDetailsForButton.length === 0 || Submitted === 'Y' && !ClassPassFailDetailsForButton?.IsPublish &&
                  (

                    <Box display="flex" justifyContent="flex-end">
                      <Stack direction={'row'} gap={1} >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sendmeassagestudent}
                              onChange={(e) => {
                                handleCheckboxChange(e.target.checked);
                              }}
                            />
                          }
                          label="Send Message and Mobile Notification"
                        /></Stack>
                    </Box>
                  )}
              </Stack>
            </Stack>

            {ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No record found.</b>
              </Typography>
            ) : (
              <>
                {DisplayNote &&
                  <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 6, color: 'white' }}>
                    {DisplayNote}
                  </Typography>
                }
                <br></br>
                <DynamicList
                  HeaderList={HeaderList}
                  ItemList={ClassPassFailDetailsForTest}
                  IconList={IconList}
                  ClickItem={ClickItem}
                  LinkList={LinkList}
                  ClickLink={ClickLink}
                  Data={ClassPassFailDetailsForTestData}
                />
              </>
            )}
          </Box>
        </Box>

      )
      }

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>




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


      </Box>
    </Box >
  );
};

export default ExamResultBase;










