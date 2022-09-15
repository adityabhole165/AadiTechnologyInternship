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
import React, { useEffect } from 'react';
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
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DashboardData from './Dashboard';
import Card2 from 'src/libraries/mainCard/Card2';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  getModulesPermission,
  getModulesPermissionsResultt,
  getSchoolSettings
} from 'src/requests/SchoolSetting/schoolSetting';
import {
  ISchoolId,
  IgetModulesPermission,
  IGetScreensAccessPermissions
} from 'src/interfaces/SchoolSetting/schoolSettings';

const Text = styled(Box)(({ theme }) => ({
  //  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  Leftpadding: theme.spacing(1),
  Rightpadding: theme.spacing(1),
  TextAlign: 'center',
  cursor: 'pointer'
}));

function LandingPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const GetSchoolSettingList = useSelector(
    (state: RootState) => state.getSchoolSettings.SchoolSettingList
  );
  const ModulesPermission: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ModulesPermission
  );

  const GetScreensAccessPermissions: any = useSelector(
    (state: RootState) =>
      state.getModulesPermissionsResult.ModulesPermissionsResult
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem('Id');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const body: ISchoolId = {
    asSchoolId: asSchoolId
  };

  const body1: IgetModulesPermission = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYearId,
    asUserId: userId,
    abIsPreprimary: false,
    abXseedApplicable: false
  };

  const body2: IGetScreensAccessPermissions = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYearId,
    asUserId: userId,
    asUserRoleId: RoleId,
    abIsPreprimaryTeacher: false
  };

  useEffect(() => {
    dispatch(getSchoolSettings(body));

    if (RoleId == '3') {
      dispatch(getModulesPermission(body1));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getModulesPermissionsResultt(body2));
  }, []);
  let items1 = [];
  let items2 = [];
  let items3 = [];
  if (RoleId === '3') {
    items1 = DashboardData.Student.items1.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items2 = DashboardData.Student.items2.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items3 = DashboardData.Student.items3.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
  }

if (RoleId === '3') {
    items1 = DashboardData.Student.items1.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items2 = DashboardData.Student.items2.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items3 = DashboardData.Student.items3.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
  }



  if (RoleId === '6') {
    items1 = DashboardData.Admin.items1.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) && el.ScreenPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items2 = DashboardData.Admin.items2.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) && el.ScreenPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items3 = DashboardData.Teacher.items3.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) && el.ScreenPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
  }





  if (RoleId === '2') {
    items1 = DashboardData.Teacher.items1.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) && el.ScreenPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items2 = DashboardData.Teacher.items2.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) && el.ScreenPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
    items3 = DashboardData.Teacher.items3.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) && el.ScreenPermission === undefined
          ? true
          : f.IsEnabled === true;
      });
    });
  }
  let header2 = RoleId === '3' ? 'Student' : 'Teacher';
  let header3 = RoleId === '6' ? 'Communication' : 'Exam & Communication';

  return (
    <>
      <Card2 items={items1} heading={'School'} rowsCol="4"></Card2>
      <IconButton>
        <NavLink
          to={`/${location.pathname.split('/')[1]}/Teacher/TAttendance`}
          activeStyle={{ color: '#9e9e9e' }}
        >
          <EventNoteIcon />
        </NavLink>
      </IconButton>
      {RoleId != '6' && <Card2 items={items2} heading={header2} rowsCol="4" />}
      <Card2 items={items3} heading={header3} rowsCol="4"></Card2>
    </>
  );
}

export default LandingPage;
