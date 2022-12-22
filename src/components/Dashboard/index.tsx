import {useTheme,Box,} from '@mui/material';
import 'src/assets/style/Bday.css';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import DashboardData from './Dashboard';
import Card2 from 'src/libraries/mainCard/Card2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {getModulesPermission,getModulesPermissionsResultt,} from 'src/requests/SchoolSetting/schoolSetting';
import {IgetModulesPermission,IGetScreensAccessPermissions} from 'src/interfaces/SchoolSetting/schoolSettings';
import {getMessageCount} from 'src/requests/Dashboard/Dashboard'
import { INewMessageCount } from 'src/interfaces/Student/dashboard';
import NewRelease from '../Authentication/NewRelease/NewRelease';
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
  const ModulesPermission: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ModulesPermission
  );

  const GetScreensAccessPermissions: any = useSelector(
    (state: RootState) =>
      state.getModulesPermissionsResult.ModulesPermissionsResult
  );
  const Messagecount: any = useSelector(
    (state: RootState) => state.Dashboard.MessageCount
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem('Id');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  const getModulePermissionBody: IgetModulesPermission = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYearId,
    asUserId: userId,
    abIsPreprimary: false,
    abXseedApplicable: false
  };

  const getScreensAccessPermissions: IGetScreensAccessPermissions = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYearId,
    asUserId: userId,
    asUserRoleId: RoleId,
    abIsPreprimaryTeacher: false
  };
  const getNewMessageCount: INewMessageCount = {
  asSchoolId:asSchoolId,
  asUserId: userId,
  asAcademicYearId: AcademicYearId,
};

  useEffect(() => {
    if (RoleId == '3') {
      dispatch(getModulesPermission(getModulePermissionBody));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getModulesPermissionsResultt(getScreensAccessPermissions));
  }, []);
  useEffect(() => {
     {
      dispatch(getMessageCount(getNewMessageCount));
    }
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
            : el.ModulesPermission) && (el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true);
      });
    });
    items2 = DashboardData.Student.items2.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && (el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true);
      });
    });
    items3 = DashboardData.Student.items3.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && (el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true);
      });
    });
  }

if (RoleId === '3') {
    items1 = DashboardData.Student.items1.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && (el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true);
      });
    });
    items2 = DashboardData.Student.items2.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) && (el.ModulesPermission === undefined
          ? true
          : f.IsEnabled === true);
      });
    });
    items3 = DashboardData.Student.items3.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName ===(el.ModulesPermission === undefined ? f.ModuleName : el.ModulesPermission) && 
        (el.ModulesPermission === undefined ? true : f.IsEnabled === true);
      });
    });
  }

  if (RoleId === '6') {
    items1 = DashboardData.Admin.items1.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName === (el.ScreenPermission === undefined ? f.ScreenName : el.ScreenPermission) && 
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true);
      });
    });
    items2 = DashboardData.Admin.items3.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName === (el.ScreenPermission === undefined ? f.ScreenName : el.ScreenPermission) && 
        (el.ScreenPermission === undefined ? true : f.IsEnabled === true);
      });
    });
  }

  if (RoleId === '2') {
    items1 = DashboardData.Teacher.items1.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName === (el.ScreenPermission === undefined ? f.ScreenName : el.ScreenPermission) && 
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true);
      });
    });
    items2 = DashboardData.Teacher.items2.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName === (el.ScreenPermission === undefined ? f.ScreenName : el.ScreenPermission) && 
        (el.ScreenPermission === undefined ? true : f.IsEnabled === true);
      });
    });
    items3 = DashboardData.Teacher.items3.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return f.ScreenName === (el.ScreenPermission === undefined ? f.ScreenName : el.ScreenPermission) && 
        (el.ScreenPermission === undefined ? true : f.IsEnabled === true);
      });
    });
  }

  let header2 = RoleId === '3' ? 'Student' : 'Teacher';
  let header3 = RoleId === '6' || RoleId === '2' ? 'Communication' : 'Exam & Communication';

  return (
    <>
    {/* <NewRelease/> */}
     <Card2 items={items1} heading={'School'} rowsCol="4" Messagecount={Messagecount.MESSAGECOUNT}></Card2>
    {RoleId != '6' && <Card2 items={items2} heading={header2} rowsCol="4"  Messagecount={Messagecount.MESSAGECOUNT}/>}
    {RoleId == '6' && <Card2 items={items2} heading={header3} rowsCol="4"  Messagecount={Messagecount.MESSAGECOUNT}/>}
    {(RoleId == '2' || RoleId == '3') && <Card2 items={items3} heading={header3} rowsCol="4"  Messagecount={Messagecount.MESSAGECOUNT}></Card2>}</> 
  );
}

export default LandingPage;
