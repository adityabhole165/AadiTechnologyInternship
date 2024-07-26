import CheckCircle from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import FactCheck from '@mui/icons-material/FactCheck';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Person from '@mui/icons-material/Person';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Unpublished from '@mui/icons-material/Unpublished';
import { Box, Button, Checkbox, FormControlLabel, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import {
  IGenerateTestTotalMarksBody,
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
  getGenerateTopper,
  getProgressSheetStatus,
  getPublishUnpublishExam, getSMSTemplate, resetGenerateTopper, resetPublishUnpublishExams
} from 'src/requests/ExamResult/RequestExamResult';
import { RootState, useSelector } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import ExamResultUnpublish from '../ExamResultUnpublish/ExamResultUnpublish';
const ExamResultBase = () => {
  const { ParamsStandardDivisionId, ParamsTestId, selectTeacher } = useParams();
  const [toppersGenerated, setToppersGenerated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserRole = localStorage.getItem('RoleName');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');

  const [Reason, setReason] = useState('');
  const [TestId, setTestId] = useState(
    ParamsTestId == undefined ? "0" : ParamsTestId

  );
  // console.log("ParamsTestId", ParamsTestId)
  const [DisplayNote, setDisplayNote] = useState('');
  // const [InsertedId, setInsertedId] = useState('');
  const [HelpNote, setHelpNote] = useState('');
  const [Open, setOpen] = useState(false);
  const [sendmeassagestudent, setsendmeassagestudent] = useState(false);
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const asUserId = localStorage.getItem('UserId');
  const [StandardDivisionId, setStandardDivisionId] = useState(
    ParamsStandardDivisionId
    //  !== undefined
    //   ? ParamsStandardDivisionId
    //   : ""
    // : (selectTeacher !== undefined ? selectTeacher : "StandardDivisionId")
  );

  const ClassTeachers: any = useSelector(
    (state: RootState) => state.ExamResult.ClassTeachers
  );
  console.log(ClassTeachers, "-", ParamsStandardDivisionId);
  const getTeacherId = () => {
    let TeacherId = '';
    ClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) TeacherId = item.Id;
    });
    return TeacherId;
  };
  // console.log("ParamsStandardDivisionId", ParamsStandardDivisionId)

  const [IconList, setIconList] = useState([]);
  const LinkList = [0]

  const Submitted: any = useSelector(
    (state: RootState) => state.ExamResult.IsSubmitted
  );
  // console.log(Submitted, "abcderg");

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
  const GenerateToppers: any = useSelector(
    (state: RootState) => state.ExamResult.GenerateTopper
  );

  const ProgressSheet: any = useSelector(
    (state: RootState) => state.ExamResult.ProgressSheetStatus
  );
  // console.log(ProgressSheet, "ProgressSheet")
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
  //console.log("GetScreenPermission", GetScreenPermission())

  const ClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    // asTeacherId: GetScreenPermission() === 'Y' ? 0 : (getTeacherId() ? Number(getTeacherId()) : Number(StandardDivisionId))
    asTeacherId: GetScreenPermission() === 'Y'
      ? 0
      : (getTeacherId() ? Number(getTeacherId()) : (ParamsStandardDivisionId != null ? Number(ParamsStandardDivisionId) : Number(StandardDivisionId)))
    // asTeacherId: asTeacherId
    // asTeacherId: 0
  };

  const GetClasswiseExamDropdown: IGetClasswiseExamDropdownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: Number(StandardDivisionId)
    // asStandardDivisionId: ParamsStandardDivisionId != null ? Number(ParamsStandardDivisionId) : Number(StandardDivisionId)
  };
  const GetGenerateTopper: IGenerateTestTotalMarksBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(StandardDivisionId),
    asTestId: Number(TestId),
    asInsertedById: Number(asUserId)

  };

  const handleGenerateToppers = () => {
    // Logic for generating toppers
    setToppersGenerated(true);
  };
  const ClassPassFailDetailsForTestBody: IGetClassPassFailDetailsForTestBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: StandardDivisionId,
    // asStdDivId: ParamsStandardDivisionId != null ? ParamsStandardDivisionId.toString() : StandardDivisionId.toString(),
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

  // useEffect(() => {

  //   dispatch(getGenerateTopper(GetGenerateTopper));
  // }, []);

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

  // useEffect(() => {
  //   if (ClassTeachers.length > 0) {
  //     setStandardDivisionId(ClassTeachers[0].Value);
  //   }
  // }, [ClassTeachers]);
  // useEffect(() => {
  //   if (ClassTeachers && ClassTeachers.length > 0) {
  //     if (ScreensAccessPermission === 'Y') {
  //       setStandardDivisionId(ClassTeachers[0].Value);

  //     } else {
  //       // setStandardDivisionId(sessionStorage.getItem('TeacherId'));
  //       setStandardDivisionId(StandardDivisionId);
  //     }
  //   }
  // }, [ClassTeachers, ScreensAccessPermission]);
  useEffect(() => {
    if (ClassTeachers && ClassTeachers.length > 0) {
      if (ParamsStandardDivisionId == undefined) {
        if (GetScreenPermission() === 'Y') {
          setStandardDivisionId(ClassTeachers[0].Value);
          console.log(GetScreenPermission(), "ClassTeachers 2", ClassTeachers[0].Value)
        } else {
          const teacherIdFromSession = sessionStorage.getItem('StandardDivisionId');
          if (teacherIdFromSession !== null) {
            setStandardDivisionId(teacherIdFromSession);
            console.log(teacherIdFromSession, "ClassTeachers 1")
          }
        }
      }
    }
  }, [ClassTeachers]);


  const getCheckSubmitted = () => {
    let allSubmitted = true;
    ClassPassFailDetailsForButton.LstGetFileDetails.forEach((item) => {
      if (item.Is_Submitted !== "Y") {
        allSubmitted = false;
      }
    });
    return allSubmitted;
  };

  useEffect(() => {
    // Set the help note
    setHelpNote('View the summarised results of your class for the selected exam. Click the subject name link to view the marks / grades scored by each student in the subject. Exam result can be published by clicking on publish button and unpublished by clicking on unpublish button.');

    if (ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish) {
      // Case 1: Results are published
      setDisplayNote('Results for this exam have been published.');
      setIconList([{ Id: 1, Icon: <EditIcon />, Action: 'Edit' }]);
    } else if (ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish) {
      // Case 2: Not all results submitted and not published
      setDisplayNote('Not all results for this exam have been submitted.');
      setIconList([{ Id: 1, Icon: <EditIcon />, Action: 'Edit' }]);
    } else if (ClassPassFailDetailsForButton && getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish) {
      // Case 3: All results submitted but not published
      setDisplayNote('');
      setIconList([{ Id: 1, Icon: <EditIcon />, Action: 'Edit' }]);
    }
  }, [ClassPassFailDetailsForButton]);


  // useEffect(() => {
  //   dispatch(getPrePrimaryExamConfiguration(PrePrimaryExamConfiguration));
  // }, [ClassPassFailDetailsForButton, PrePrimaryExam, StandardDivisionId]);


  // useEffect(() => {
  //   dispatch(getProgressSheetStatus(GetPrePrimaryProgressSheetStatusBody));
  // }, [StandardDivisionId, TestId]);

  // useEffect(() => {
  //   dispatch(getPrePrimaryExamConfiguration(PrePrimaryExamConfiguration));
  //   dispatch(getMonthConfigurationForExamResult(MonthConfigurationForExamResult));
  // }, [StandardDivisionId, TestId]);


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
  // useEffect(() => {
  //   if (ClasswiseExams.length > 0 &&
  //     (TestId == "0" || !getIsTestExists(TestId))
  //   )
  //     setTestId(ClasswiseExams[0].Value);
  // }, [ClasswiseExams]);
  useEffect(() => {
    if (ClasswiseExams.length > 0 && (TestId === "0" || ParamsTestId === "0" || !getIsTestExists(TestId))) {
      setTestId(ClasswiseExams[0].Value);
    }
  }, [ClasswiseExams, TestId, ParamsTestId]);

  useEffect(() => {
    if (StandardDivisionId == '0' || ParamsStandardDivisionId == '0')
      dispatch(getClasswiseExam(GetClasswiseExamDropdown));
  }, [StandardDivisionId, ParamsStandardDivisionId]);

  useEffect(() => {
    if (StandardDivisionId !== '0' || ParamsStandardDivisionId !== '0')
      dispatch(getClasswiseExam(GetClasswiseExamDropdown));
  }, [StandardDivisionId, ParamsStandardDivisionId]);


  useEffect(() => {
    dispatch(getClassPassFailDetailsForTest(ClassPassFailDetailsForTestBody));
    dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody));
  }, [StandardDivisionId, TestId, ParamsStandardDivisionId, ParamsTestId]);

  // useEffect(() => {
  //   dispatch(getGenerateTopper(GetGenerateTopper));
  // }, [StandardDivisionId, TestId, asUserId, ParamsStandardDivisionId, ParamsTestId]);


  const clickTeacher = (value) => {
    setStandardDivisionId(value);
    console.log(value, "clickTeacher 3")

  };
  const clickExam = (value) => {
    setTestId(value);

  };

  const getSubjectId = (index) => {
    // console.log(index, "index");

    let returnVal = "0"
    ClassPassFailDetailsForTestData.map((Item, i) => {
      if (i == index)
        returnVal = Item.SubjectId
    })
    return returnVal
  }
  const ClickItem = (value) => {
    // const isPublish = publish === ClassPassFailDetailsForButton.IsPublish;
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
      'true' + '/' +
      ((ClassPassFailDetailsForButton.IsPublish) ? "true" : "false")

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
    navigate('/extended-sidebar/Teacher/TermwiseHeightWeight/' + getTeacherId());
  };

  // const getClassTeacherName = () => {
  //   let classTeacherName = '';
  //   ClassTeachers.map((item) => {
  //     if (item.Value == StandardDivisionId) classTeacherName = item.Name;
  //   });

  //   return classTeacherName;
  // };

  // console.log(getClassTeacherName(), "----");
  // console.log(StandardDivisionId);



  const ProgressRemark = (value) => {
    navigate('/extended-sidebar/Teacher/ProgressRemarks/' + TestId + '/' + getTeacherId());
  }
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
  const Toppers = (value) => {
    navigate('/extended-sidebar/Teacher/Toppers/' + getTeacherId() + '/' + StandardDivisionId + '/' + TestId + '/' + standardId + '/' + false);
  };
  // const Toppers = (value) => {
  //   navigate('/extended-sidebar/Teacher/ExamResultToppers/' + '/' + StandardDivisionId + '/' + TestId + '/' + standardId + '/' + true);
  // };

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
  const handlePublishClick = () => {
    const confirmation = window.confirm("Once you publish the result it will be visible to parents/students.       Are you sure you want to continue?");
    if (confirmation) {
      clickPublishUnpublish(true);
    }
  };
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
  const getstdTeacherName = (list, value) => {
    const teacher = list.find(teacher => teacher.Value === value);
    return teacher ? teacher.Name : '';
  };

  const getstandardId = () => {
    let returnVal = false
    ClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) {
        returnVal = item.StanderdId
      }
    })
    return returnVal
  }

  const standardId = getstandardId();

  const GenerateTopper = () => {

    console.log('Before toggling ToppersGenerated:', ClassPassFailDetailsForButton.ToppersGenerated);
    const updatedValue = !ClassPassFailDetailsForButton.ToppersGenerated;
    console.log('After toggling ToppersGenerated:', updatedValue);
    dispatch(getGenerateTopper(GetGenerateTopper));
  };
  useEffect(() => {
    if (GenerateToppers != "") {
      toast.success(GenerateToppers, { toastId: "succes1" })

      dispatch(resetGenerateTopper());
      dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody));
    }
  }, [GenerateToppers])
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' }
        ]}
        rightActions={<>

          <SearchableDropdown
            sx={{
              minWidth: '20vw'
              , bgcolor: GetScreenPermission() === 'N' ? '#D3D3D3' : 'inherit'
            }}
            ItemList={ClassTeachers}
            onChange={clickTeacher}
            label={'Select Class Teacher'}
            // defaultValue={ParamsStandardDivisionId != null ? ParamsStandardDivisionId.toString() : StandardDivisionId}
            defaultValue={StandardDivisionId}
            mandatory
            size={"small"}
            DisableClearable={GetScreenPermission() === 'N'}
            disabled={GetScreenPermission() === 'N'}

          />


          <SearchableDropdown
            sx={{ minWidth: '20vw' }}
            ItemList={ClasswiseExams}
            onChange={clickExam}
            label={'Select Exam'}
            // defaultValue={TestId} // Convert number to string
            defaultValue={ParamsTestId != null ? ParamsTestId.toString() : TestId}
            mandatory
            size={"small"}
          />
          <Tooltip title={HelpNote}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600]
                }
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>

          <Tooltip title={"View Progress Report"}>
            <span>
              <IconButton sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[600]
                }
              }} onClick={ViewProgressRemark} disabled={(ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish || ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0 || ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish)

              }>
                {/* VIEW PROGRESS REPORT  */}
                <FactCheck />
              </IconButton>
            </span>
          </Tooltip>

          {/* {!ClassPassFailDetailsForButton?.IsPublish && ClassPassFailDetailsForButton?.ToppersGenerated || ClassPassFailDetailsForButton?.IsPublish && ClassPassFailDetailsForButton?.ToppersGenerated || Submitted === 'N' && !ClassPassFailDetailsForButton?.ToppersGenerated && !ClassPassFailDetailsForButton?.IsPublish && */}

          <Tooltip title={"Generate Toppers"}>
            <span>
              <IconButton
                onClick={GenerateTopper}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                // onClick={GenerateTopper}
                disabled={(ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish) ||
                  (ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0) ||
                  ClassPassFailDetailsForButton?.ToppersGenerated}
              >
                {/* disabled={(!examResultProp || ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0 || ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish || ClassPassFailDetailsForButton?.ToppersGenerated) */}
                {/* GENERATE TOPPERS */}
                <ManageAccounts />
              </IconButton>
            </span>
          </Tooltip>


          {/* } */}
          <Tooltip title={"Publish All"} >
            <span>
              <IconButton sx={{
                color: 'white',
                backgroundColor: green[500],
                '&:hover': {
                  backgroundColor: green[500]
                }
              }}
                //  onClick={() => clickPublishUnpublish(true)} 
                onClick={handlePublishClick}
                disabled={(ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish || ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0 || ClassPassFailDetailsForButton && ClassPassFailDetailsForButton.IsPublish)

                }>
                {/* PUBLISH ALL */}
                <CheckCircle />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={"Unpublish All"}>
            <span>
              <IconButton sx={{
                color: 'white',
                backgroundColor: red[500],
                '&:hover': {
                  backgroundColor: red[500]
                }
              }} onClick={ClickOpenDialogbox} disabled={(ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0 || ClassPassFailDetailsForButton && !ClassPassFailDetailsForButton.IsPublish || ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish)

              }>
                {/* UNPUBLISH ALL */}
                <Unpublished />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={"Toppers"} >
            <span>
              <IconButton
                onClick={Toppers}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                disabled={
                  (ClassPassFailDetailsForButton && ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length === 0) ||
                  (ClassPassFailDetailsForButton && !getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish) ||
                  !ClassPassFailDetailsForButton?.ToppersGenerated}

              >
                  <WorkspacePremiumIcon /> 
              </IconButton>
            </span>
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
            </Stack>
            <Stack direction={'row'} mb={1} justifyContent='space-between'>

              <Stack direction={'row'} gap={1}>
                <Button variant="contained" color="primary" onClick={ProgressRemark}>
                  Progress Remarks
                </Button>

                {GetScreenPermission() === 'Y' ? (
                  <Button variant="contained" color="primary" onClick={TransferOptionalSubjectMarks}>
                    Transfer Optional Subject Marks
                  </Button>
                ) : null}

                <Button variant="contained" color="primary" onClick={TermwiseHighwight}>
                  Termwise Height-Weight
                </Button>

                {ClassPassFailDetailsForButton &&
                  (!ClassPassFailDetailsForButton.IsPublish && getCheckSubmitted()) && (
                    <Box display="flex" justifyContent="flex-end" mb={1}>
                      <Stack direction={'row'} gap={1}>
                        {ClassPassFailDetailsForTest && ClassPassFailDetailsForTest.length > 0 && (
                          <FormControlLabel
                            control={<Checkbox
                              checked={sendmeassagestudent}
                              onChange={(e) => {
                                handleCheckboxChange(e.target.checked);
                              }} />}
                            label="Send Message and Mobile Notification" />
                        )}
                      </Stack>
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
                  </Typography>}
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

