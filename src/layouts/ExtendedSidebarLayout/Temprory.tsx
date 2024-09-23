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
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone'; // message center 
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import InsertCommentTwoToneIcon from '@mui/icons-material/InsertCommentTwoTone'; // Progress Remark 
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone'; //Leave Details
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone'; // password
import User from '@mui/icons-material/ManageAccounts';
import PowerOutLined from '@mui/icons-material/PowerSettingsNew';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone'; // Assign Pre-Primary Progress Report Grades
import RuleIcon from '@mui/icons-material/Rule'; //Assign exam mark 
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone'; //Pre-Primary Progress Report Results
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone'; //SMS Center 
import TableChart from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { BookOpenCheck, Copy, NotebookPen } from 'lucide-react';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

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
import {
  MissingAttenNameAleart
} from 'src/requests/MissingAttendanceAleart/ReqMissAttendAleart';
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

  const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
  const MissingDays = MissingName.map(item => item.MissingDays);
  const hasMissingDays = MissingDays.some(MissingDays => MissingDays !== 0);
  const ListAbsentStudent = useSelector(
    (state: RootState) => state.AbsentStudent.getlistAbsentStudentDetails
  );
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'School Notices') perm = item.IsFullAccess;
    });
    return perm;
  };
  const UserId = Number(localStorage.getItem('UserId'));

  const navigate = useNavigate();

  const IconClick = (title) => {
    setActiveItem(title);
  };

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

  const sideList = [
    {
      id: 'Dashboard',
      title: ' Dashboard',
      icon: <DashboardCustomizeOutlinedIcon />,
      link: '/extended-sidebar/landing/landing'
    },
    {
      id: 'Calendar',
      title: 'Exam Shedule',
      icon: <Dataset />,
      link: '/extended-sidebar/Teacher/Texamschedule'
    },
    {
      id: 'Calendar',
      title: 'Holidays',
      icon: <DateRangeOutlinedIcon />,
      link: '/extended-sidebar/Admin/SchoolConfiguration/Holidays'
    },
    {
      id: 'Calendar',
      title: 'Annual Planner',
      icon: <EventOutlinedIcon />,
      link: '/extended-sidebar/Common/AnnualPlanner'
    },
    {
      id: 'Exam',
      title: 'Assign Exam Marks',
      icon: <RuleIcon />,
      link: '/extended-sidebar/Teacher/AssignExamMark'
    },
    {
      id: 'Daily Activities',
      title: 'Attendance',
      icon: <EventNoteOutlinedIcon />,
      link: '/extended-sidebar/Teacher/TAttendance'
    },
    {
      id: 'Daily Activities',
      title: 'Assign Homework',
      icon: <AutoStoriesTwoToneIcon />,
      link: '/extended-sidebar/Teacher/AssignHomework'
    },
    {
      id: 'Daily Activities',
      title: 'Timetable',
      icon: <AccessTimeIcon />,
      link: '/extended-sidebar/Teacher/TeacherTimeTable'
    },
    {
      id: 'Daily Activities',
      title: 'Weekly Timetable',
      icon: <TableChartOutlinedIcon />,
      link: '/extended-sidebar/Teacher/WeeklyTimetable'
    },
    {
      id: 'Other Utilities',
      title: 'Change Password',
      icon: <LockResetTwoToneIcon />,
      link: '/extended-sidebar/common/changePassword'
    },
    {
      id: 'Exam',
      title: 'Exam Result',
      icon: <TableChart />,
      link: '/extended-sidebar/Teacher/ExamResultBase'
    },

    {
      id: 'Exam',
      title: 'Final Result',
      icon: <FactCheck />,
      link: '/extended-sidebar/Teacher/FinalResult'
    },
    {
      id: 'Communication',
      title: 'Message Center',
      icon: <ForwardToInboxTwoToneIcon />,
      link: '/extended-sidebar/MessageCenter/msgCenter'
    },
    {
      id: 'Exam',
      title: 'Progress Remarks',
      icon: <InsertCommentTwoToneIcon />,
      link: '/extended-sidebar/Teacher/ProgressRemarks'
    },

    {
      id: 'Exam',
      title: 'Progress Report',
      icon: <AssessmentOutlinedIcon />,
      link: '/extended-sidebar/Teacher/ProgressReportNew'
    },
    {
      id: 'Other Utilities',
      title: 'Requisition',
      icon: <AddShoppingCartTwoToneIcon />,
      link: '/extended-sidebar/Teacher/Requisition'
    },
    {
      id: 'Communication',
      title: 'SMS Center',
      icon: <SmsTwoToneIcon />,
      link: '/extended-sidebar/Teacher/SmsCenter'
    },
    {
      id: 'Extra Screens',
      title: 'Add Aadhar Card Details',
      icon: <AddCardTwoToneIcon />,
      link: '/extended-sidebar/Teacher/AadharCard'
    },
    {
      id: 'Extra Screens',
      title: 'Investment Declaration',
      icon: <AssuredWorkloadTwoToneIcon />,
      link: '/extended-sidebar/Teacher/InvestmentDeclaration'
    },
    {
      id: 'Extra Screens',
      title: 'Leave Details',
      icon: <LibraryBooksTwoToneIcon />,
      link: '/extended-sidebar/Teacher/LeaveDetails'
    },
    {
      id: 'Extra Screens',
      title: 'Lesson Plan',
      icon: <HistoryEduTwoToneIcon />,
      link: '/extended-sidebar/Teacher/LessonPlanBaseScreen'
    },
    {
      id: 'Extra Screens',
      title: 'Performance Grade Assignment',
      icon: <AddchartIcon />,
      link: '/extended-sidebar/Teacher/PerformanceGradeAssignmentBaseScreen'
    },
    {
      id: 'Extra Screens',
      title: 'Student Records',
      icon: <CoPresentTwoToneIcon />,
      link: '/extended-sidebar/Teacher/StudentRecords'
    },

  ];

  // if (LinkVisible == 'True') {
  //   sideList.push({
  //     title: 'Attendance',
  //     icon: <DateRange />,
  //     link: '/extended-sidebar/Teacher/TAttendance'
  //   });
  // }

  if (hasMissingDays) {
    sideList.push({
      id: 'Daily Activities',
      title: 'Missing Attendance',
      icon: <EventBusyTwoToneIcon />,
      link: null // No link for this item
    });
  }
  if (LinkVisible == 'True' && Number(UsschoolSettings) > 0) {
    sideList.push({
      id: 'Daily Activities',
      title: 'Absent Student Details',
      icon: <PersonOff />,
      link: null
    });
  }
  if (asUserRoleId === '2' && GetScreenPermission() == "Y") {
    sideList.push({
      id: 'Daily Activities',
      title: 'School Notices',
      icon: <AssignmentTwoToneIcon />,
      link: '/extended-sidebar/Teacher/SchoolNoticeBasescreen'
    });
  }
  if (asUserRoleId === '2' && GetScreenPermission() == "N") {
    sideList.push({
      id: 'Daily Activities',
      title: 'School Notices',
      icon: <AssignmentTwoToneIcon />,
      link: '/extended-sidebar/Common/SchoolnoticeOwn'
    });
  }

  if (asUserRoleId === '3') {
    sideList.push({
      id: 'Daily Activities',
      title: 'School Notices',
      icon: <AssignmentTwoToneIcon />,
      link: '/extended-sidebar/Common/SchoolNotice'
    });
  }
  // Conditionally insert the "Assign Pre-Primary Grades" item at the 4th position (index 3)
  if (isPreprimary === true) {
    sideList.splice(6, 0, {
      id: 'Exam',
      title: 'Assign Pre-Primary Grades',
      icon: <ReceiptTwoToneIcon />,
      link: '/extended-sidebar/Teacher/AssignPrePrimaryGrades'
    });
  }
  if (isPreprimary === true) {
    sideList.splice(6, 0, {
      id: 'Exam',
      title: 'Pre-Primary Progress Report',
      icon: <FactCheckTwoToneIcon />,
      link: '/extended-sidebar/Teacher/PreprimaryProgressReport'
    });
  }

  if (isPreprimary === true) {
    sideList.splice(6, 0, {
      id: 'Exam',
      title: 'Pre-Primary Results',
      icon: <SchoolTwoToneIcon />,
      link: '/extended-sidebar/Teacher/PrePrimaryResult'
    });
  }

  if (isPreprimary === true) {
    sideList.push({
      id: 'Exam',
      title: 'Student Wise Progress Report',
      icon: <TableChartTwoToneIcon />,
      link: '/extended-sidebar/Teacher/StudentwiseProgressReport'
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
  }, []);

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

  useEffect(() => {
    if (hasMissingDays && !sessionStorage.getItem('hasShownMissingAttendancePopup')) {
      setMissingAttendanceDialog(true);
      sessionStorage.setItem('hasShownMissingAttendancePopup', 'true');
    } else {
      setMissingAttendanceDialog(false);
    }
  }, [hasMissingDays]);
  //new impliment
  const groupedItems = {
    "Daily Activities": sideList.filter(item => item.id === 'Daily Activities'),
    "Communication": sideList.filter(item => item.id === 'Communication'),
    "Exam": sideList.filter(item => item.id === 'Exam'),
    "Calendar": sideList.filter(item => item.id === 'Calendar'),
    "Other Utilities": sideList.filter(item => item.id === 'Other Utilities'),
    "Extra Screens": sideList.filter(item => item.id === 'Extra Screens'),

  };
  const handleListItemClick1 = (event, link, anchor) => {
    event.stopPropagation(); // Prevent event propagation to AccordionSummary
    if (link) {
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
          {Object.keys(groupedItems).map((group) => (
            <Accordion key={group} >
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
                  {groupedItems[group].map((item) => (
                    <ListItem button key={item.title}
                      //  component="a" href={item.link}
                      onClick={(e) => handleListItemClick1(e, item.link, anchor)}>
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