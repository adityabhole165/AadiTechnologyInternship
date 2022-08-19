import {
  Container,
  Card,
  Avatar,
  Grid,
  useTheme,
  Typography,
  Box,
  Paper,
  CardHeader,
  CardContent,
  IconButton
} from '@mui/material';
import React,{ useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import SmsIcon from '@mui/icons-material/Sms';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Card2 from 'src/libraries/mainCard/Card2';


import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getModulesPermission, getModulesPermissionsResultt, getSchoolSettings } from 'src/requests/SchoolSetting/schoolSetting';
import { ISchoolId, IgetModulesPermission, IGetScreensAccessPermissions } from 'src/interfaces/SchoolSetting/schoolSettings';

const Text = styled(Box)(({ theme }) => ({
  //  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  Leftpadding: theme.spacing(1),
  Rightpadding: theme.spacing(1),
  TextAlign: 'center',
  cursor: 'pointer'
}));

function LandingPage() {
  const items1 = [
    {
      Text1: 'School ',
      Text2: 'Notice',
      Color: '#81c784',
      iconColor: '#35abd9',
      Icon: AssignmentIcon,
      Link: 'Common/SchoolNotice',
      index: 1
    },
    {
      Text1: ' Annual ',
      Text2: 'Planner',
      Color: '#ef5350',
      iconColor: '#f0483e',
      Icon: EventIcon,
      Link: 'Common/EventOverview',
      index: 2
    },
    {
      Text1: 'Holiday',
      Text2: '',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: DateRangeIcon,
      Link: 'Common/Holidays',
      index: 3
    },
    {
      Text1: 'Photo ',
      Text2: 'Gallery',
      Color: '#81c784',
      iconColor: '#f0483e',
      Icon: PhotoIcon,
      Link: 'Common/PhotoGallery',
      index: 4
    },
    {
      Text1: 'Video ',
      Text2: 'Gallery',
      Color: '#ef5350',
      iconColor: '#35abd9',
      Icon: VideoLibraryIcon,
      Link: 'Common/VideoGallery',
      index: 5
    }
  ];
  const items2 = [
    {
      Text1: 'Attendance',
      Text2: '',
      Color: '#81c784',
      iconColor: '#424242',
      Icon: EventNoteIcon,
      Link: 'Student/attendance',
      index: 6
    },
    {
      Text1: 'Time Table',
      Text2: '',
      Color: '#ef5350',
      iconColor: '#f0483e',
      Icon: AccessTimeIcon,
      Link: 'Student/Timetable',
      index: 7
    },
    {
      Text1: 'Fees',
      Text2: '',
      Color: '#90a4ae',
      iconColor: ' #35abd9',
      Icon: MonetizationOnIcon,
      Link: 'Student/Fees',
      index: 8
    },
    {
      Text1: 'Home ',
      Text2: 'Work',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: MenuBookIcon,
      Link: 'Student/Homework',
      index: 9
    }
    // {
    //   Text: 'Change Password',
    //   Color: '#90a4ae',
    //   iconColor: '#ef5350',
    //   Icon: LockOpenIcon,
    //   Link: 'Student/changePassword',
    //   index: 10
    // }
  ];

  const items3 = [
    {
      Text1: 'Subject ',
      Text2: 'Teachers',
      Color: '#81c784',
      iconColor: '#f0483e',
      Icon: PeopleIcon,
      Link: 'Student/SubjectTeacher',
      index: 11
    },
    {
      Text1: 'Exam ',
      Text2: 'Schedule',
      Color: '#ef5350',
      iconColor: '#35abd9',
      Icon: CalendarTodayIcon,
      Link: 'Student/Examschedule',
      index: 12
    },
    {
      Text1: 'Progress ',
      Text2: 'Report',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: AssessmentIcon,
      Link: 'Student/Progressreport',
      index: 13
    },

    {
      Text1: 'Online Exam ',
      Text2: 'Schedule',
      Color: '#90a4ae',
      iconColor: '#f0483e',
      Icon: BorderColorOutlinedIcon,
      Link: 'Student/OnlineExam',
      index: 14
    },
    {
      Text1: ' Online Exam ',
      Text2: 'ProgressReport',
      Color: '#90a4ae',
      iconColor: '#35abd9',
      Icon: AssessmentOutlinedIcon,
      Link: 'Student/OnlineExamProgressReport',
      index: 15
    },
    {
      Text1: ' Library ',
      Text2: '',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: HistoryEduOutlinedIcon,
      Link: 'Student/Library',
      index: 16
    },
    {
      Text1: 'Message ',
      Text2: 'Center',
      Color: '#90a4ae',
      iconColor: ' #f0483e',
      Icon: ForwardToInboxIcon,
      Link: 'MessageCenter/msgCenter',
      index: 17
    },
    {
      Text1: 'SMS ',
      Text2: 'center',
      Color: '#90a4ae',
      iconColor: '#35abd9',
      Icon: SmsIcon,
      Link: 'Student/SmsCenter',
      index: 18
    },
    {
      Text1: 'PTA',
      Text2: '',
      Color: '#90a4ae',
      iconColor: '#424242',
      Icon: PeopleIcon,
      Link: 'Common/PTA',
      index: 19
    }
  ];


  const theme = useTheme();
  const dispatch = useDispatch()
  const GetSchoolSettingList = useSelector((state: RootState) => state.getSchoolSettings.SchoolSettingList)
  const ModulesPermission: any = useSelector((state: RootState) => state.getSchoolSettings.ModulesPermission)

  const GetScreensAccessPermissions: any = useSelector((state: RootState) => state.getModulesPermissionsResult.ModulesPermissionsResult)



  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem("Id");
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const body: ISchoolId = {
    "asSchoolId": asSchoolId
  }

  const body1: IgetModulesPermission = {
    "asSchoolId": asSchoolId,
    "asAcademicYearId": AcademicYearId,
    "asUserId": userId,
    "abIsPreprimary": false,
    "abXseedApplicable": false
  }

  const body2: IGetScreensAccessPermissions = {
    "asSchoolId": asSchoolId,
    "asAcademicYearId": AcademicYearId,
    "asUserId": userId,
    "asUserRoleId": RoleId,
    "abIsPreprimaryTeacher": false
  }


  useEffect(() => {
    dispatch(getSchoolSettings(body));

    if (RoleId == "3") {
      dispatch(getModulesPermission(body1))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
    dispatch(getModulesPermissionsResultt(body2))
  }, [])
  return (
    <>
      <Card2 items={items1} heading={'School'} rowsCol="4"></Card2>

      <Card2 items={items2} heading={'Student'} rowsCol="4"></Card2>

      <Card2
        items={items3}
        heading={'Exam & Communication'}
        rowsCol="4"
      ></Card2>
    </>
  );
}

export default LandingPage;
