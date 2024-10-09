import { useTheme } from '@emotion/react';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // time table 
import AddCardTwoToneIcon from '@mui/icons-material/AddCardTwoTone';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import AddchartIcon from '@mui/icons-material/Addchart'; //Performance Grade Assignment
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'; //Progress Report
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone'; //School Notices
import AssuredWorkloadTwoToneIcon from '@mui/icons-material/AssuredWorkloadTwoTone'; //Investment Declaration
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone'; //Assign Homework
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dataset from '@mui/icons-material/CalendarViewMonth';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import CoPresentTwoToneIcon from '@mui/icons-material/CoPresentTwoTone'; // Student Record List
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'; //Holidays
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone'; // missing attendance
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'; // Attendance
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'; //Annual Planner
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FactCheck from '@mui/icons-material/FactCheck';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone'; // Pre Primary Progress Report
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone'; // message center 
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import InsertCommentTwoToneIcon from '@mui/icons-material/InsertCommentTwoTone'; // Progress Remark 
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone'; //Leave Details
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone'; // password
import User from '@mui/icons-material/ManageAccounts';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import PowerOutLined from '@mui/icons-material/PowerSettingsNew';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone'; // Assign Pre-Primary Progress Report Grades
import RuleIcon from '@mui/icons-material/Rule'; //Assign exam mark 
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone'; //Pre-Primary Progress Report Results
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone'; //SMS Center 
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import TableChart from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import { red } from '@mui/material/colors';
import { Inbox, MailCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { GetIsPrePrimaryTeacher, logoURL } from 'src/components/Common/Util';
import AbsentStudentDetailsPopup from 'src/components/Dashboard/AbsentStudentDetails/AbsentStudentDetailsPopup';
import MissingAttendanceDialog from 'src/components/Dashboard/MissingAttendanceDialog';
import { IGetAbsentStudentBody, ISchoolIdBody } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';

import {
  IMissingattendancealeartNameBody
} from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';
import { AbsentStudents, GetSchoolSettings } from 'src/requests/AbsentStudentPopCp/ReqAbsentStudent';

import { PersonOff } from '@mui/icons-material';
import { IGetAllowedPagesForUserBody, IGetScreensAccessPermissions } from 'src/interfaces/SchoolSetting/schoolSettings';
import { getSchoolSettingsValue } from 'src/requests/Authentication/SchoolList';
import {
  MissingAttenNameAleart
} from 'src/requests/MissingAttendanceAleart/ReqMissAttendAleart';
import { getAllowedPagesForUser, getModulesPermissionsResultt } from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer({ opend, toggleDrawer }) {

  // Checking if Teacher / User if for Primary or Preprimary
  const isPreprimary: boolean = GetIsPrePrimaryTeacher();

  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asUserId = Number(sessionStorage.getItem('Id'));
  const asUserRoleId = sessionStorage.getItem('RoleId');
  const [opent, setopent] = useState(opend ? opend : 'false');
  const [missingAttendanceDialog, setMissingAttendanceDialog] = useState(false); // Set initial state to false
  const [AbsentStudentDialog, setAbsentStudentDialog] = useState(false);
  const [imgsrc, setimgsrc] = useState(
    logoURL +
    localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') +
    '_logo.png'
  );
  const [state, setState] = useState({
    left: false
  });
  const [activeItem, setActiveItem] = useState(null);

  const LinkVisible = useSelector(
    (state: RootState) => state.AbsentStudent.getlistLinkVisible
  );
  const UsschoolSettings = useSelector(
    (state: RootState) => state.AbsentStudent.IsGetSchoolSettings
  );
  const GetScreensAccessPermissions: any = useSelector(
    (state: RootState) =>
      state.getModulesPermissionsResult.ModulesPermissionsResult
  );

  const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
  const MissingDays = MissingName.map(item => item.MissingDays);
  const hasMissingDays = MissingDays.some(MissingDays => MissingDays !== 0);
  const ListAbsentStudent = useSelector(
    (state: RootState) => state.AbsentStudent.getlistAbsentStudentDetails
  );
  const ScreensAccessPermission = GetScreensAccessPermissions;
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'School Notices') perm = item.IsFullAccess;
    });
    return perm;
  };
  const AllowedPagesListForUser = useSelector(
    (state: RootState) => state.getSchoolSettings.ISAllowedPagesForUser
  );
  const UserId = Number(localStorage.getItem('UserId'));

  function getPageName(screenId) {
    let filteredArray = ScreensAccessPermission?.filter(
      (item) => item.ScreenId === screenId
    );
    if (filteredArray?.length > 0) {
      return filteredArray[0]?.ScreenName?.trim();
    }
    // console.log('🦥', AllowedPagesListForUser)
    if (filteredArray?.length === 0) {
      let filteredList = AllowedPagesListForUser.filter((item) => item?.Screen_Id === screenId);

      if (filteredList.length > 0) {
        return filteredList[0]?.Configure_Name?.trim();
      }
    }
  }

  const navigate = useNavigate();

  const IconClick = (title) => {
    setActiveItem(title);
  };



  //useEffect to call the allowed screens API for the current logged in user
  let auth = JSON.parse(localStorage.getItem('auth'))
  useEffect(() => {
    const AllowedPageApiBody: IGetAllowedPagesForUserBody = {
      asSchoolId: Number(localStorage.getItem('SchoolId')),
      asUserId: Number(sessionStorage.getItem('Id')),
      asScreenLevel: null,
      asConfigId: null
    }
    const getScreensAccessPermissions: IGetScreensAccessPermissions = {
      asSchoolId: asSchoolId.toString(),
      asAcademicYearId: sessionStorage.getItem('AcademicYearId'),
      asUserId: sessionStorage.getItem('Id'),
      asUserRoleId: sessionStorage.getItem('RoleId'),
      abIsPreprimaryTeacher: auth?.data?.TeacherDetails?.IsPreprimary === 'Y' ? true : false,
    };
    dispatch(getAllowedPagesForUser(AllowedPageApiBody));
    dispatch(getModulesPermissionsResultt(getScreensAccessPermissions));
  }, [])

  useEffect(() => {
    if (AllowedPagesListForUser.length > 0 && sessionStorage.getItem('AllowedScreens') === null) {
      let allowedScreens = JSON.stringify(AllowedPagesListForUser);
      sessionStorage.setItem('AllowedScreens', allowedScreens);
    }
  }, [AllowedPagesListForUser])
  // #region School Settings
  // Following useEffect() is to call the School Settings API and get necessary metadata 
  const schoolSettingList: any = useSelector((state: RootState) => state.SchoolSettings.SchoolSettings);
  useEffect(() => {
    dispatch(getSchoolSettingsValue({ asSchoolId: localStorage.getItem('SchoolId') }));
  }, [dispatch]);
  const [showWeeklyTimetable, setShowWeeklyTimetable] = useState(false);
  useEffect(() => {
    if (Object.keys(schoolSettingList).length > 0) {
      let isWeeklytTimetable = schoolSettingList['DisplayWeeklyTimtableLink'];
      if (isWeeklytTimetable?.toLowerCase() === 'true') {
        setShowWeeklyTimetable(true);
      } else {
        setShowWeeklyTimetable(false);
      }
    }
  }, [schoolSettingList])

  // #endregion

  const ActionStyle = {
    backgroundColor: (theme) => theme.palette.primary.main,
    pt: 1,
    color: '#fff',
    ':hover': {
      backgroundColor: '#fff',
      color: (theme) => theme.palette.primary.main,

      cursor: 'pointer'
    }
  };
  const activebuttonStyle = {
    backgrounColor: (theme) => theme.palette.primary.main,
    cursor: 'pointer',
    color: 'white'
  };
  const buttonStyle = {};

  let sideList = [
    {
      id: 'Dashboard',
      title: ' Dashboard',
      icon: <DashboardCustomizeOutlinedIcon />,
      link: '/extended-sidebar/landing/landing',
      screenId: 0
    },
    {
      id: 'Calendar',
      title: 'Exam Shedule',
      icon: <Dataset />,
      link: '/extended-sidebar/Teacher/Texamschedule',
      screenId: 0
    },
    {
      id: 'Calendar',
      title: 'Holidays',  // getPageName(14),
      icon: <DateRangeOutlinedIcon />,
      link: '/extended-sidebar/Admin/SchoolConfiguration/Holidays',
      screenId: 0  // 14
    },
    {
      id: 'Calendar',
      title: 'Annual Planner', // getPageName(62),
      icon: <EventOutlinedIcon />,
      link: '/extended-sidebar/Common/AnnualPlanner',
      screenId: 0 //62
    },
    {
      id: 'Exam',
      title: getPageName(74),
      icon: <RuleIcon />,
      link: '/extended-sidebar/Teacher/AssignExamMark',
      screenId: 74
    },
    {
      id: 'Daily Activities',
      title: getPageName(77),
      icon: <EventNoteOutlinedIcon />,
      link: '/extended-sidebar/Teacher/TAttendance',
      screenId: 77
    },
    {
      id: 'Daily Activities',
      title: getPageName(201),
      icon: <AutoStoriesTwoToneIcon />,
      link: '/extended-sidebar/Teacher/AssignHomework',
      screenId: 201
    },
    {
      id: 'Daily Activities',
      title: 'Timetable',
      icon: <AccessTimeIcon />,
      link: '/extended-sidebar/Teacher/TeacherTimeTable',
      screenId: 0
    },
    {
      id: 'Other Utilities',
      title: 'Change Password',
      icon: <LockResetTwoToneIcon />,
      link: '/extended-sidebar/common/changePassword',
      screenId: 0
    },
    {
      id: 'Exam',
      title: 'Exam Result', // getPageName(78),
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/ExamResultBase',
      screenId: 0 // 78
    },

    {
      id: 'Exam',
      title: 'Final Result', // getPageName(80),
      icon: <FactCheck />,
      link: '/extended-sidebar/Teacher/FinalResult',
      screenId: 0
    },
    {
      id: 'Communication',
      title: 'Message Center',
      icon: <ForwardToInboxTwoToneIcon />,
      link: '/extended-sidebar/MessageCenter/msgCenter',
      screenId: 0
    },
    {
      id: 'Exam',
      title: 'Progress Remark',  // getPageName(266),
      icon: <InsertCommentTwoToneIcon />,
      link: '/extended-sidebar/Teacher/ProgressRemarks',
      screenId: 266
    },

    {
      id: 'Exam',
      title: 'Progress Report',  //getPageName(79),
      icon: <AssessmentOutlinedIcon />,
      link: '/extended-sidebar/Teacher/ProgressReportNew',
      screenId: 0 // 79
    },
    {
      id: 'Other Utilities',
      title: 'Requisition',
      icon: <AddShoppingCartTwoToneIcon />,
      link: '/extended-sidebar/Teacher/Requisition',
      screenId: 0
    },
    {
      id: 'Communication',
      title: 'SMS Center',
      icon: <SmsTwoToneIcon />,
      link: '/extended-sidebar/Teacher/SmsCenter',
      screenId: 0 // 81
    },
    {
      id: 'Extra Screens',
      title: 'Add Aadhar Card Details',
      icon: <AddCardTwoToneIcon />,
      link: '/extended-sidebar/Teacher/AadharCard',
      screenId: 267
    },
    {
      id: 'Extra Screens',
      title: 'Students',
      icon: <SwitchAccountIcon />,
      link: '/extended-sidebar/Teacher/Students',
      screenId: 0
    },
    {
      id: 'Extra Screens',
      title: 'Investment Declaration',
      icon: <AssuredWorkloadTwoToneIcon />,
      link: '/extended-sidebar/Teacher/InvestmentDeclaration',
      screenId: 240
    },
    {
      id: 'Extra Screens',
      title: 'Leave Details',
      icon: <LibraryBooksTwoToneIcon />,
      link: '/extended-sidebar/Teacher/LeaveDetails',
      screenId: 0
    },
    {
      id: 'Extra Screens',
      title: getPageName(233),
      icon: <HistoryEduTwoToneIcon />,
      link: '/extended-sidebar/Teacher/LessonPlanBaseScreen',
      screenId: 233
    },
    {
      id: 'Extra Screens',
      title: 'Performance Grade Assignment',
      icon: <AddchartIcon />,
      link: '/extended-sidebar/Teacher/PerformanceGradeAssignmentBaseScreen',
      screenId: 0
    },
    {
      id: 'Extra Screens',
      title: getPageName(271),
      icon: <CoPresentTwoToneIcon />,
      link: '/extended-sidebar/Teacher/StudentRecords',
      screenId: 271
    },
    {
      id: 'Extra Screens',
      title: 'School Notices',
      icon: <AssignmentTwoToneIcon />,
      link: GetScreenPermission() === 'N' ? '/extended-sidebar/Common/SchoolnoticeOwn' : '/extended-sidebar/Teacher/SchoolNoticeBasescreen',
      screenId: 187
    }

  ];

  // if (LinkVisible == 'True') {
  //   sideList.push({
  //     title: 'Attendance',
  //     icon: <DateRange />,
  //     link: '/extended-sidebar/Teacher/TAttendance'
  //   });
  // }

  if (showWeeklyTimetable) {
    sideList.push(
      {
        id: 'Daily Activities',
        title: 'Weekly Timetable',
        icon: <TableChartOutlinedIcon />,
        link: '/extended-sidebar/Teacher/WeeklyTimetable',
        screenId: 0
      }
    )
  }

  if (hasMissingDays) {
    sideList.push({
      id: 'Daily Activities',
      title: 'Missing Attendance',
      icon: <EventBusyTwoToneIcon />,
      link: null,
      screenId: 0
    });
  }
  if (LinkVisible == 'True' && Number(UsschoolSettings) > 0) {
    sideList.push({
      id: 'Daily Activities',
      title: 'Absent Student Details',
      icon: <PersonOff />,
      link: null,
      screenId: 0
    });
  }
  // if (asUserRoleId === '2' && GetScreenPermission() == "Y") {
  //   // if (asUserRoleId === '2') {
  //   sideList.push({
  //     id: 'Daily Activities',
  //     title: 'School Notices',
  //     icon: <AssignmentTwoToneIcon />,
  //     link: '/extended-sidebar/Teacher/SchoolNoticeBasescreen',
  //     screenId: 0
  //   });
  // }
  // if (asUserRoleId === '2' && GetScreenPermission() == "N") {
  //   sideList.push({
  //     id: 'Extra Screens',
  //     title: 'School Notices',
  //     icon: <AssignmentTwoToneIcon />,
  //     link: '/extended-sidebar/Common/SchoolnoticeOwn',
  //     screenId: 187
  //   });
  // }

  if (asUserRoleId === '3') {
    sideList.push({
      id: 'Daily Activities',
      title: 'School Notices',
      icon: <AssignmentTwoToneIcon />,
      link: '/extended-sidebar/Common/SchoolNotice',
      screenId: 0
    });
  }
  // Conditionally insert the "Assign Pre-Primary Grades" item at the 4th position (index 3)
  if (isPreprimary || !isPreprimary) {
    sideList.splice(6, 0, {
      id: 'Extra Screens',
      title: getPageName(162),
      icon: <ReceiptTwoToneIcon />,
      link: '/extended-sidebar/Teacher/AssignPrePrimaryGrades',
      screenId: 162
    });
  }
  if (isPreprimary || !isPreprimary) {
    sideList.splice(6, 0, {
      id: 'Extra Screens',
      title: getPageName(164),
      icon: <FactCheckTwoToneIcon />,
      link: '/extended-sidebar/Teacher/PreprimaryProgressReport',
      screenId: 164
    });
  }

  if (isPreprimary || !isPreprimary) {
    sideList.splice(6, 0, {
      id: 'Extra Screens',
      title: getPageName(163),
      icon: <SchoolTwoToneIcon />,
      link: '/extended-sidebar/Teacher/PrePrimaryResult',
      screenId: 163
    });
  }

  if (isPreprimary || !isPreprimary) {
    sideList.push({
      id: 'Extra Screens',
      title: getPageName(179),
      icon: <TableChartTwoToneIcon />,
      link: '/extended-sidebar/Teacher/StudentwiseProgressReport',
      screenId: 179
    });
  }



  const activeStyle = {
    backgroundColor: (theme) => theme.palette.primary.main,
    ':hover': {
      backgroundColor: (theme) => theme.palette.primary.main
    }
  };

  const ClickUser = (value) => {
    navigate('/extended-sidebar/Student/Profile');
  };
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      //localStorage.clear();
      localStorage.removeItem('auth');
      sessionStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const ListAbsentStudentBody: IGetAbsentStudentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(UserId),
  };
  const AbsentStudentsBody: ISchoolIdBody = {
    asSchoolId: Number(asSchoolId),
  };
  useEffect(() => {
    dispatch(AbsentStudents(ListAbsentStudentBody));
    dispatch(GetSchoolSettings(AbsentStudentsBody));
  }, [dispatch]);

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem('UserLoginDetails1');
    if (ListAbsentStudent.length > 0 && !sessionStorage.getItem('hasShownAbsentStudentPopup')) {
      setAbsentStudentDialog(true);
      sessionStorage.setItem('hasShownAbsentStudentPopup', 'true');
    } else {
      setAbsentStudentDialog(false);
    }
  }, []);

  const MissingNameBody: IMissingattendancealeartNameBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(asUserId),
    asStandardDivisionId: null,
    asDate: null
  };

  const handleListItemClick = (text) => {
    if (text.title === 'Missing Attendance') {
      if (hasMissingDays) {
        setMissingAttendanceDialog(true);
      } else {
        setMissingAttendanceDialog(false);
      }
    } else if (text.title === 'Absent Student Details') {
      if (ListAbsentStudent.length > 0 && LinkVisible === 'True') {
        setAbsentStudentDialog(true);
      } else {
        setAbsentStudentDialog(false);
      }
    } else {
      navigate(text.link);
    }

    // Trigger icon click for all cases
    IconClick(text.title);
  };

  useEffect(() => {
    dispatch(MissingAttenNameAleart(MissingNameBody));
  }, []);
  function removeCircularReferences() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return; // Skip circular references
        }
        seen.add(value);
      }
      return value;
    };
  }

  useEffect(() => {
    if (sideList.length > 0 && !sessionStorage.getItem('sideList')) {
      sessionStorage.setItem('sideList', JSON.stringify(sideList, removeCircularReferences()));

    }
  }, [sideList]);

  useEffect(() => {
    if (hasMissingDays && !sessionStorage.getItem('hasShownMissingAttendancePopup')) {
      setMissingAttendanceDialog(true);
      sessionStorage.setItem('hasShownMissingAttendancePopup', 'true');
    } else {
      setMissingAttendanceDialog(false);
    }
  }, [hasMissingDays]);

  function filt() {
    let sd = sideList;
    let AllowedScreens = AllowedPagesListForUser;
    let configSetting = JSON.parse(sessionStorage.getItem('SchoolConfiguration'));
    let finalArr = [];

    sd.map((item, i) => {
      if (item.screenId === 0) {
        finalArr.push(item)
        // console.log(item)
      } else {
        // let arr1 = allw?.filter((item1) => item1.screenId === String(item.screenId));
        // let arr2 = allw?.filter((item2) => item2.Configure_Name.includes(item.title));
        // if (arr1?.length > 0) {
        //   finalArr.push(item)
        // } else if (arr2?.length > 0) {
        //   finalArr.push(item)
        // }
        // need to uncomment / but for now keep it commented !!!!!
        // finalArr.push(item)
        let isAccess = configSetting?.filter((item1) => item1.Configure_Id === Number(item.screenId));
        if (isAccess?.length > 0) {
          finalArr.push(item)
        }
      }
    })

    AllowedScreens?.map((item1) => {
      // finding match in allowed screens array and side list
      let match1 = sd?.filter((item2) => item2?.screenId === Number(item1.screenId));
      // finding any mathces who are similar in newly created array and allowed screens array
      let match2 = finalArr?.filter((item3) => item3?.screenId === Number(item1.screenId));
      if (match1?.length > 0 && match2?.length === 0) {
        let updatedItem = sideList?.find((item) => item?.screenId === Number(item1.screenId));
        finalArr.push(updatedItem)
      }
    })
    // console.log('final list --->>>', finalArr)

    return finalArr;
  }


  //new impliment
  // useEffect(() => {
  //   if (sideList.length > 0) {
  //     console.log('final list to follow', filt())
  //     sideList = filt();
  //   }
  // }, [sideList])
  const groupedItems = {
    "Daily Activities": filt().filter(item => item.id === 'Daily Activities'),
    "Communication": filt().filter(item => item.id === 'Communication'),
    "Exam": filt().filter(item => item.id === 'Exam'),
    "Calendar": filt().filter(item => item.id === 'Calendar'),
    "Other Utilities": filt().filter(item => item.id === 'Other Utilities'),
    "Extra Screens": filt().filter(item => item.id === 'Extra Screens'),
  };

  groupedItems['Extra Screens'] = groupedItems['Extra Screens'].sort((a, b) => {
    const titleA = a?.title?.toUpperCase();
    const titleB = b?.title?.toUpperCase();

    return titleA?.localeCompare(titleB); // Shorter comparison using localeCompare
  });
  const handleListItemClick1 = (event, link, anchor, title) => {
    event.stopPropagation(); // Prevent event propagation to AccordionSummary
    if (title === 'Missing Attendance') {
      if (hasMissingDays) {
        setMissingAttendanceDialog(true);
      } else {
        setMissingAttendanceDialog(false);
      }
    } else if (title === 'Absent Student Details') {
      if (ListAbsentStudent.length > 0 && LinkVisible === 'True') {
        setAbsentStudentDialog(true);
      } else {
        setAbsentStudentDialog(false);
      }
    } else if (link) {
      // window.location.href = link; // Redirect to the specified link
      navigate(link);
      toggleDrawer(anchor, false);
    }
  };
  //end new impliment

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 260 }}
      role="presentation"

    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2} sx={{ pl: 1 }}>
        <Box onClick={() => {
          toggleDrawer(anchor, false);
          navigate('/extended-sidebar/landing/landing')
        }} sx={{ cursor: 'pointer', zIndex: '1000' }}>
          <img src={imgsrc} className={classes.smalllogo} />
        </Box>
      </Stack>
      <Divider />
      <Box
        sx={{
          height: 'calc(100vh - 150px)', // Adjust height based on the fixed content height
          overflow: 'auto'
        }}
      >
        {/* <List>
          {sideList.map((text, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 0
              }}
            >
              <ListItemButton
                sx={text.title === activeItem ? activeStyle : buttonStyle}
                onClick={() => handleListItemClick(text)}
              >
                <ListItemIcon
                  sx={{
                    color: text.title === activeItem ? 'white' : 'black',
                    minWidth: '35px'
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <Typography
                  sx={{ color: text.title === activeItem ? 'white' : 'black' }}
                >
                  {text.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <div>
          <Box px={0}>
            <ListItemButton onClick={() => {
              toggleDrawer(anchor, false);
              navigate('/extended-sidebar/landing/landing')
            }}>
              <IconButton
                onKeyDown={() => { toggleDrawer(anchor, false); }} >
                <DashboardCustomizeOutlinedIcon />
              </IconButton>
              <Typography variant='h5' pl={0.1}>
                Dashboard
              </Typography>
            </ListItemButton>
          </Box>
          {Object.keys(groupedItems).map((group, index) => (
            <Accordion key={index} >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                {group === 'Daily Activities' && <IconButton sx={{ pt: 0, borderRadius: '7px', }}><NoteAltOutlinedIcon /></IconButton>}
                {group === 'Communication' && <IconButton sx={{ pt: 0, borderRadius: '7px' }}><MailCheck /></IconButton>}
                {group === 'Exam' && <IconButton sx={{ pt: 0, borderRadius: '7px' }}><ImportContactsOutlinedIcon /></IconButton>}
                {group === 'Calendar' && <IconButton sx={{ pt: 0, borderRadius: '7px' }}><CalendarMonthIcon /></IconButton>}
                {group === 'Other Utilities' && <IconButton sx={{ pt: 0, borderRadius: '7px' }}><Inbox /></IconButton>}
                {group === 'Extra Screens' && <IconButton sx={{ pt: 0, borderRadius: '7px' }}><FolderCopyOutlinedIcon /></IconButton>}
                <b style={{ marginTop: '4px' }}> {group}</b>
              </AccordionSummary >
              <AccordionDetails sx={{ py: 0, pl: 0 }}>
                <List sx={{ pt: 0, px: 0 }}>
                  {groupedItems[group].map((item, index) => (
                    <ListItem button key={index}
                      //  component="a" href={item.link}
                      onClick={(e) => handleListItemClick1(e, item.link, anchor, item.title)}>
                      <ListItemIcon sx={{ pt: 0, px: 0, pl: 2 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Box>
      <Box sx={{ position: 'absolute', top: 0 }}>
        <Tooltip title="Back">
          <IconButton
            onClick={() => {
              toggleDrawer('left', false);
            }}
            sx={{
              color: '#38548A',
              //  backgroundColor: grey[500], 
              mt: 2, ml: 23,
              borderRadius: '7px',
              ':hover': {
                color: red[600],
                backgroundColor: red[100]
              }
            }}>
            <CloseTwoTone />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, display: 'flow', width: '100%' }}>
        <Divider className="m-5" />
        <Grid className="p-8" container>
          <Tooltip title={'Profile'}>
            <Grid item xs={4} sx={ActionStyle} textAlign="center">
              <User onClick={ClickUser}></User>
            </Grid>
          </Tooltip>
          <Tooltip title={'Settings'}>
            <Grid item xs={4} sx={ActionStyle} textAlign="center">
              <SettingsTwoTone />
            </Grid>
          </Tooltip>
          <Tooltip title={'Logout'}>
            <Grid item xs={4} sx={ActionStyle} textAlign="center">
              <PowerOutLined onClick={handleLogout} />
            </Grid>
          </Tooltip>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment>{list('left')}  </React.Fragment>
      {missingAttendanceDialog && (
        <MissingAttendanceDialog
          open={missingAttendanceDialog}
          setOpen={setMissingAttendanceDialog}
        />
      )}

      {(AbsentStudentDialog && Number(UsschoolSettings) > 0) && (
        <AbsentStudentDetailsPopup
          open={AbsentStudentDialog}
          setOpen={setAbsentStudentDialog}
        />
      )}

    </div>
  );
}
