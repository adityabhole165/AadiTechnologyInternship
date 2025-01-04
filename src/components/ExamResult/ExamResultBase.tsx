import CheckCircle from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Unpublished from '@mui/icons-material/Unpublished';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  getIsFinalResultPublishedBody,
  getIsTermExamPublishedBody,
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
import { ISendMessage } from 'src/interfaces/MessageCenter/MessageCenter';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import { IGetUserDetailsBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import DynamicList from 'src/libraries/list/DynamicList';
import {
  CDAetIsTermExamPublished,
  CDAgetIsFinalResultPublished,
  getAllStudentsByGivenStdDivsResult,
  getClassPassFailDetailsForButton,
  getClassPassFailDetailsForTest,
  getClassTeachers, getClasswiseExam,
  getGenerateTopper,
  getProgressSheetStatus,
  getPublishUnpublishExam, getSMSTemplate, resetGenerateTopper,
  resetPublishUnpublishExams
} from 'src/requests/ExamResult/RequestExamResult';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { getUserDetailss } from 'src/requests/SchoolSetting/schoolSetting';
import { RootState, useSelector } from 'src/store';
import { Constants } from 'src/utils/hooks/constants/Constants';
import { decodeURL, encodeURL, getSchoolConfigurations, GetScreenAccessPermissionByPageID } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import ExamResultUnpublish from '../ExamResultUnpublish/ExamResultUnpublish';
const ExamResultBase = () => {
  let {
    ParamsStandardDivisionId,
    ParamsTestId,
    selectTeacher
  } = useParams();

  // Decode in-place
  ParamsStandardDivisionId = decodeURL(ParamsStandardDivisionId);
  ParamsTestId = decodeURL(ParamsTestId);
  selectTeacher = decodeURL(selectTeacher);

  const [toppersGenerated, setToppersGenerated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserRole = localStorage.getItem('RoleName');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const { showAlert, closeAlert } = useContext(AlertContext);
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem('Id');
  const [Reason, setReason] = useState('');
  const [TestId, setTestId] = useState(
    ParamsTestId == undefined ? "0" : ParamsTestId.toString()
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const [DisplayNote, setDisplayNote] = useState('');
  // const [InsertedId, setInsertedId] = useState('');
  const [HelpNote, setHelpNote] = useState('');
  const [Open, setOpen] = useState(false);
  const [sendmeassagestudent, setsendmeassagestudent] = useState(false);
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const [className, setClassName] = useState('');
  const [classTeacherName, setClassTeacherName] = useState('');
  const [examName, setExamName] = useState('');
  const [MsgLoading, setMsgLoading] = useState(false);

  const asUserId = localStorage.getItem('UserId');
  const [StandardDivisionId, setStandardDivisionId] = useState(
    ParamsStandardDivisionId
    //  !== undefined
    //   ? ParamsStandardDivisionId
    //   : ""
    // : (selectTeacher !== undefined ? selectTeacher : "StandardDivisionId")
  );

  const ClassTeachers: any = useSelector(
    (state: RootState) => state.ExamResult.ISClassTeachers
  );

  const getTeacherId = () => {
    let TeacherId = '';
    ClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId)
        TeacherId = item.Value;
    });
    return TeacherId;
  };



  const getStandardId = () => {
    let returnVal = 0
    ClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) {
        returnVal = item.StanderdId
      }
    })
    return returnVal
  };

  const [IconList, setIconList] = useState([]);
  const LinkList = [0]

  const Submitted: any = useSelector(
    (state: RootState) => state.ExamResult.IsSubmitted
  );


  const HeaderList: any = useSelector(
    (state: RootState) => state.ExamResult.HeaderList
  );
  const GetAllStudentsStdDivs: any = useSelector(
    (state: RootState) => state.ExamResult.GetAllStudentsByGivenStdDivs
  );

  const GetSMSTemplates: any = useSelector(
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

  const PrePrimaryExam: any = useSelector(
    (state: RootState) => state.ExamResult.IsPrePrimaryExamConfiguration
  );

  const MonthConfigurationForExam: any = useSelector(
    (state: RootState) => state.ExamResult.IsMonthConfigurationForExamResult
  );

  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);

  const UserDetail: any = useSelector((state: RootState) => state.getSchoolSettings.getUserDetails);

  const BlockExamPublish = UsGetSchoolSettings?.GetSchoolSettingsResult?.BlockExamPublish || '';
  const ShowTopppers = UsGetSchoolSettings?.GetSchoolSettingsResult?.ShowTopppers || '';



  const USgetIsFinalResultPublished: any = useSelector(
    (state: RootState) => state.ExamResult.ISgetIsFinalResultPublished
  );
  const USgetIsTermExamPublished: any = useSelector(
    (state: RootState) => state.ExamResult.ISgetIsTermExamPublished
  );

  const [AllStdDiv, setAllStdDiv] = useState([]);
  useEffect(() => {
    if (GetAllStudentsStdDivs.length > 0) {
      setAllStdDiv(GetAllStudentsStdDivs);
    }
  }, [GetAllStudentsStdDivs]);

  const loading = useSelector((state: RootState) => state.ExamResult.Loading);
  // ⚠️ Note : Avoid getting ScreenAccessPermission via ScreenName as these names are dynamic across dif. school env's
  // ✔️ Instead use ScreenId's which are same/consistent across dif. school env's  | GetScreenAccessPermissionByPageID('Pass Screen ID here')
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Exam Results') perm = item.IsFullAccess;
    });
    return perm;
  };
  // Correct Function for getting ScreenAccessPermission via ScreeenID
  let isScreenAccess = GetScreenAccessPermissionByPageID('78');

  let CanEdit = getSchoolConfigurations(78)

  const ClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(asAcademicYearId),
    // asTeacherId: GetScreenPermission() === 'Y' ? 0 : (getTeacherId() ? Number(getTeacherId()) : Number(StandardDivisionId))
    asTeacher_id: CanEdit == 'Y' ? 0 : Number(TeacherId)

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
    if (StandardDivisionId !== '0') {
      dispatch(getAllStudentsByGivenStdDivsResult(GetAllStudentsByGivenStdDivs));
    }
  }, [StandardDivisionId]);

  // useEffect(() => {

  //   dispatch(getGenerateTopper(GetGenerateTopper));
  // }, []);

  const GetSMSTemplate: IGetSMSTemplateBody = {
    asSchoolId: Number(asSchoolId),
    asSmsTemplateId: Constants.SMS_Template.ExamPublishSMS  // Constants Include all the SMS Templates ID`s
  }

  const GetSchoolSettings: GetSchoolSettingsBody = {
    asSchoolId: Number(asSchoolId),

  };

  const IsFinalResultPublishedBody: getIsFinalResultPublishedBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: Number(StandardDivisionId)

  };

  const IsTermExamPublishedBody: getIsTermExamPublishedBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: Number(StandardDivisionId)

  };


  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));
  }, [PublishUnpublish]);


  useEffect(() => {
    if (BlockExamPublish) (
      dispatch(CDAgetIsFinalResultPublished(IsFinalResultPublishedBody))
    )
  }, [StandardDivisionId, BlockExamPublish, PublishUnpublish]);


  useEffect(() => {
    if (USgetIsFinalResultPublished == false) (
      dispatch(CDAetIsTermExamPublished(IsTermExamPublishedBody))
    )

  }, [StandardDivisionId, USgetIsFinalResultPublished, PublishUnpublish]);




  useEffect(() => {
    const UserDetailBody: IGetUserDetailsBody = {
      asSchoolId: String(asSchoolId),
      asUserId: userId,
      asRoleId: RoleId
    };
    dispatch(getUserDetailss(UserDetailBody));
  }, []);

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
        if (CanEdit == 'Y') {
          setStandardDivisionId(ClassTeachers[0].Value);
        } else {
          const teacherIdFromSession = sessionStorage.getItem('StandardDivisionId');
          if (teacherIdFromSession !== null) {
            setStandardDivisionId(teacherIdFromSession);
          }
        }
      }
    }
  }, [ClassTeachers]);


  useEffect(() => {
    if ((ClassTeachers.length > 2)) {
      setStandardDivisionId(ClassTeachers[0].Value);
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
    setStandardDivisionId(value.Value);
    // We're splitting Class Name from Dropdown value.Name |  `1-A : Ms. TeacherName`
    setClassName(value?.Name?.split(':')?.[0]);
    setClassTeacherName(value?.Name?.split(':')?.[1]);
  };
  const clickExam = (value) => {
    setTestId(value.Value);
    setExamName(value.Name);

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
    navigate('/RITeSchool/Teacher/SubjectExamMarks/' +
      encodeURL('0') + '/' +
      encodeURL(StandardDivisionId) + '/' +
      encodeURL(getSubjectId(value.Index)) + '/' +
      encodeURL('0') + '/' +
      encodeURL(TestId) + '/' +
      encodeURL(getTeacherId()) + '/' +
      encodeURL('0') + '/' +
      // getStandardId() + '/' +
      encodeURL('true') + '/' +
      encodeURL('false') + '/' +
      encodeURL('true') + '/' +
      encodeURL(((ClassPassFailDetailsForButton.IsPublish) ? "true" : "false")) + '/' +
      encodeURL(getStandardId())
      , { state: { fromInternal: true } }
    );
  };

  const TransferOptionalSubjectMarks = (value) => {
    navigate('/RITeSchool/Teacher/TransferOptionalSubjectMarks', { state: { fromInternal: true } });
  };

  const ClickLink = (value) => {
    navigate(
      '/RITeSchool/Teacher/SubjectMarkList/' +
      encodeURL(TestId) +
      '/' +
      encodeURL(StandardDivisionId) +
      '/' +
      encodeURL(getExamName()) +
      '/' +
      encodeURL(getTeacherName()) +
      '/' +
      encodeURL(value.Id.SubjectName) + '/' + encodeURL(value.Id.SubjectId)
    );
  }
  const handleCheckboxChange = (value) => {
    setsendmeassagestudent(value);
  };

  const TermwiseHighwight = (value) => {
    navigate('/RITeSchool/Teacher/TermwiseHeightWeight/' + encodeURL(StandardDivisionId), { state: { fromInternal: true } });
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
    navigate('/RITeSchool/Teacher/ProgressRemarks/' + encodeURL(TestId) + '/' + encodeURL(getTeacherId()), { state: { fromInternal: true } });
  }
  const ViewProgressRemark = (value) => {
    navigate('/RITeSchool/Teacher/ViewProgressReport/' + encodeURL(TestId) + '/' + encodeURL(StandardDivisionId), { state: { fromInternal: true } });
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
      '/RITeSchool/Teacher/ExamResultUnpublish/' +
      encodeURL(TestId) +
      '/' +
      encodeURL(StandardDivisionId) +
      '/' +
      encodeURL(getExamName()) +
      '/' +
      encodeURL(getTeacherName())
    );
  };
  const Toppers = (value) => {
    navigate('/RITeSchool/Teacher/Toppers/' + encodeURL(getTeacherId()) + '/' + encodeURL(StandardDivisionId) + '/' + encodeURL(TestId) + '/' + encodeURL(standardId) + '/' + encodeURL(false), { state: { fromInternal: true } });
  };
  // const Toppers = (value) => {
  //   navigate('/RITeSchool/Teacher/ExamResultToppers/' + '/' + StandardDivisionId + '/' + TestId + '/' + standardId + '/' + true);
  // };

  const ClickSubject = (Id) => {
    navigate('/RITeSchool/Teacher/SubjectMarkList/' + encodeURL(Id), { state: { fromInternal: true } });
  };
  // send message to students f()
  const sendMessageTostudent = () => {
    let SMS_Template = GetSMSTemplates;
    let teacher_Name = classTeacherName?.trim();
    let class_Name = className?.trim();
    let exam_Name = examName?.trim();
    let SMS_MsgBody = SMS_Template?.SmsTemplateText;
    SMS_MsgBody = SMS_MsgBody.replace("%CLASSTEACHER%", teacher_Name);
    SMS_MsgBody = SMS_MsgBody.replace("%STUDENTCLASS%", class_Name);
    SMS_MsgBody = SMS_MsgBody.replace("%EXAM%", exam_Name);
    let SchoolName = localStorage.getItem('SchoolName');
    let userId = sessionStorage.getItem('Id');
    let AcYearId = sessionStorage.getItem('AcademicYearId');
    let schoolId = localStorage.getItem('SchoolId');
    let senderName = sessionStorage.getItem('StudentName');
    let StudentIdLists = AllStdDiv?.map(item => item.ID); // Filtering only Student ID's from AllStdDiv Array


    // Body for Send Message API
    const sendMessageAPIBody: ISendMessage = {
      asSchoolId: schoolId,
      aoMessage: {
        Body: SMS_MsgBody,
        Subject: `${exam_Name} Result`,
        SenderName: senderName,
        DisplayText: '',
        SenderUserId: userId,
        SenderUserRoleId: RoleId,
        AcademicYearId: AcYearId,
        SchoolId: schoolId,
        InsertedById: userId,
        Attachment: '',
        ScheduleDateTime: '',
        RequestReadReceipt: '0'
      },
      asIsForward: `N`,
      asIsSoftwareCordinator: 0,
      asMessageId: 0,
      asSchoolName: SchoolName,
      asSelectedStDivId: StandardDivisionId.toString(),
      asSelectedUserIds: '',
      sIsReply: `N`,
      attachmentFile: [],
      asFileName: '',
      asSelectedUserIdsCc: '',
      asSelectedStDivIdCc: '',
      asIsSoftwareCordinatorCc: '',
      asDisplayTextCc: ''
    };
    // Calling Send Message API
    setMsgLoading(true);
    MessageCenterApi.SendMessage(sendMessageAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          setMsgLoading(false);
          setsendmeassagestudent(false);
        }
      })
      .catch((err) => {
        toast.error('Message did not sent successfully.', { toastId: 'error1' });
        setMsgLoading(false);
        setsendmeassagestudent(false);
      });
  }
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
    // If send message checkbox is checked then send message to students
    if (sendmeassagestudent) {
      sendMessageTostudent();
    }
  };
  // const handlePublishClick = () => {
  //   const confirmation = window.confirm("Once you publish the result it will be visible to parents/students.       Are you sure you want to continue?");
  //   if (confirmation) {
  //     clickPublishUnpublish(true);
  //   }
  // };


  const handlePublishClick = () => {
    showAlert({
      title: 'Please Confirm',
      message: 'Once you publish the result it will be visible to parents/students. Are you sure you want to continue?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        clickPublishUnpublish(true);
        closeAlert();
      }
    });
  };
  useEffect(() => {
    if (PublishUnpublish !== '') {
      toast.success(PublishUnpublish)
      dispatch(resetPublishUnpublishExams())
      dispatch(getClassPassFailDetailsForButton(ClassPassFailDetailsForTestBody))
    }
  }, [PublishUnpublish, BlockExamPublish, USgetIsFinalResultPublished, USgetIsTermExamPublished, ShowTopppers])

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

    const updatedValue = !ClassPassFailDetailsForButton.ToppersGenerated;
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
          { title: 'Exam Results', path: '/RITeSchool/Teacher/ExamResultBase' }
        ]}
        rightActions={<>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="left"
            gap={1}
            sx={{
              mt: { xs: 0, sm: 0 },
              flexWrap: { xs: 'nowrap', sm: 'nowrap' }
            }}
          >
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown1
                sx={{
                  width: { xs: '70vw', sm: '20vw' }
                  , bgcolor: CanEdit == 'N' && ClassTeachers.length == 2 ? '#F0F0F0' : 'inherit'
                }}
                ItemList={asSchoolId == '18'
                  ? ClassTeachers.filter((teacher: any) => teacher.Is_PrePrimary == "N")
                  : ClassTeachers}
                onChange={clickTeacher}
                label={'Select Class Teacher'}
                // defaultValue={ParamsStandardDivisionId != null ? ParamsStandardDivisionId.toString() : StandardDivisionId}
                defaultValue={StandardDivisionId}
                mandatory
                size={"small"}
                DisableClearable={CanEdit == 'N' && ClassTeachers.length == 2}
                disabled={CanEdit == 'N' && ClassTeachers.length == 2}

              /></Grid>

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown1
                sx={{ width: { xs: '70vw', sm: '20vw' } }}
                ItemList={ClasswiseExams}
                onChange={clickExam}
                label={'Select Exam'}
                // defaultValue={TestId} // Convert number to string
                defaultValue={ParamsTestId != null ? ParamsTestId.toString() : TestId}
                mandatory
                size={"small"}
              /></Grid>
            <Grid
              item
              xs={12}
              gap={1}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            >
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

              {
                ShowTopppers == true && (
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
                        <ManageAccounts />
                      </IconButton>
                    </span>
                  </Tooltip>)
              }

              {
                UserDetail.CanPublishUnpublishExam == true && (
                  <>
                    <Tooltip title={"Publish All"} >
                      <span>
                        <IconButton sx={{
                          color: 'white',
                          backgroundColor: blue[500],
                          '&:hover': {
                            backgroundColor: blue[500]
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
                        <IconButton
                          sx={{
                            color: 'white',
                            backgroundColor: red[500],
                            '&:hover': {
                              backgroundColor: red[500]
                            }
                          }}
                          onClick={ClickOpenDialogbox}
                          disabled={

                            (USgetIsTermExamPublished ||
                              USgetIsFinalResultPublished) ||
                            (ClassPassFailDetailsForButton && (
                              ClassPassFailDetailsForTest?.length === 0 ||  // No test details
                              !ClassPassFailDetailsForButton.IsPublish ||  // Not published
                              (!getCheckSubmitted() && !ClassPassFailDetailsForButton.IsPublish) // Not submitted and not published
                            ))

                          }


                        >
                          <Unpublished />
                        </IconButton>
                      </span>
                    </Tooltip>



                  </>)

              }


              {ShowTopppers == true && (
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
              )
              }
            </Grid>
          </Stack>
        </>}
      />
      {MsgLoading &&
        <SuspenseLoader />}
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

                {CanEdit == 'Y' ? (
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

