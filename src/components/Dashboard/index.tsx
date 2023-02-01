import {useTheme,Box,} from '@mui/material';
import 'src/assets/style/Bday.css';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import DashboardData from './Dashboard';
import Card2 from 'src/libraries/mainCard/Card2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {getModulesPermission,getModulesPermissionsResultt,getGetSettingValue,getGetSettingSubTeacher} from 'src/requests/SchoolSetting/schoolSetting';
import {IgetModulesPermission,IGetScreensAccessPermissions, IGetSettingValueBody} from 'src/interfaces/SchoolSetting/schoolSettings';
import {getMessageCount} from 'src/requests/Dashboard/Dashboard'
import { INewMessageCount } from 'src/interfaces/Student/dashboard';
import NewRelease from '../Authentication/NewRelease/NewRelease';
import BdayPopUp from '../Birthdays/BdayPopUp';
import { isBetweenDate } from '../Common/Util';
import { useNavigate } from 'react-router-dom';
const Text = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  Leftpadding: theme.spacing(1),
  Rightpadding: theme.spacing(1),
  TextAlign: 'center',
  cursor: 'pointer'
}));

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBday, setShowBday]= useState(true);
  const ModulesPermission: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ModulesPermission
  );
  const SchoolTrasnportIsEnabled: any = useSelector(
    (state: RootState) => state.getSchoolSettings.SchoolTrasnportIsEnabled
  );
const SubTeacherEnabled: any = useSelector(
  (state: RootState) => state.getSchoolSettings.SubTeacher
);
console.log("SubTeacherEnabled",SubTeacherEnabled);

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
  const DOB = localStorage.getItem('DOB');

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
  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(AcademicYearId),
    asKey: "",
};

const getNewMessageCount: INewMessageCount = {
  asSchoolId:asSchoolId,
  asUserId: userId,
  asAcademicYearId: AcademicYearId,
};
const curYear = new Date().getFullYear();
  const date = DOB;
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString('default',{month:"short"});
  const year = new Date(date).getFullYear();
  const newdate= `${day} ${month} ${curYear}`

  useEffect(() => {
    if (RoleId == '3') {
      dispatch(getModulesPermission(getModulePermissionBody));
      dispatch(getGetSettingValue(GetSettingValueBody));
      dispatch(getGetSettingSubTeacher(GetSettingValueBody))
    }
    localStorage.setItem('url', window.location.pathname);
    dispatch(getModulesPermissionsResultt(getScreensAccessPermissions));
    dispatch(getMessageCount(getNewMessageCount));
    if (isBetweenDate(newdate,6)){

      if(localStorage.getItem('DOB')==newdate){
      setShowBday(false)
      } 
      else {
        setShowBday(true)
        localStorage.setItem('DOB',newdate)
      }
    }
       else
       setShowBday(false)
  }, []);
  
  let items1 = [];
  let items2 = [];
  let items3 = [];

  if (RoleId === '3') {
    items1 = DashboardData.Student.items1.filter((el) => {
      return ModulesPermission.some((f) => {
        return f.ModuleName === (el.ModulesPermission === undefined ? f.ModuleName : el.ModulesPermission) && 
            (el.ModulesPermission === undefined ? true : f.IsEnabled === true);
      });
    });
    items1 = items1.filter((el) => {
      return el.Text1 == 'Transport' ? SchoolTrasnportIsEnabled : true
    })

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
    items1 = items1.filter((el) => {
      return el.Text1 == 'Transport' ? SchoolTrasnportIsEnabled : true
    })
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
    items3 = items3.filter((el) => {
      return el.Text1 == 'Subject ' ? SubTeacherEnabled : true
    })
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
        return (el.Text1.trim() === "Attendance" && 
        sessionStorage.getItem("IsClassTeacher") === "N" && f.IsFullAccess==="N") ? 
          false :
          f.ScreenName === (el.ScreenPermission === undefined ? 
            f.ScreenName : el.ScreenPermission) && (el.ScreenPermission === undefined ?           
              true : 
              f.IsEnabled === true);
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
const [forceUpdate, setForceUpdate] = useState(false)
  const onChangeVersion = () => {
    navigate('../../../UpgradeApp');
  }
  return (
    <>
    <NewRelease onChangeVersion={onChangeVersion}/>
    {showBday && <BdayPopUp/> }
     <Card2 items={items1} heading={'School'} rowsCol="4" Messagecount={Messagecount.MESSAGECOUNT}></Card2>
    {RoleId != '6' && <Card2 items={items2} heading={header2} rowsCol="4"  Messagecount={Messagecount.MESSAGECOUNT}/>}
    {RoleId == '6' && <Card2 items={items2} heading={header3} rowsCol="4"  Messagecount={Messagecount.MESSAGECOUNT}/>}
    {(RoleId == '2' || RoleId == '3') && <Card2 items={items3} heading={header3} rowsCol="4"  Messagecount={Messagecount.MESSAGECOUNT}></Card2>}
    </> 
  );
}

export default LandingPage;
