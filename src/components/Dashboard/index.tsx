import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'src/assets/style/Bday.css';
import {
  IGetScreensAccessPermissions,
  IGetSettingValueBody,
  IgetModulesPermission
} from 'src/interfaces/SchoolSetting/schoolSettings';
import { INewMessageCount } from 'src/interfaces/Student/dashboard';
import Card2 from 'src/libraries/mainCard/Card2';
import { getMessageCount } from 'src/requests/Dashboard/Dashboard';
import {
  EnableOnlineExamM,
  ShowAadharCardForStudent,
  getEnableHomeworkModule,
  getGetSettingSubTeacher,
  getGetSettingValue,
  getLibrarySchoolSetting,
  getModulesPermission,
  getModulesPermissionsResultt,
  getParentPhotoUpload,
  getShowITRReportOnStudentLogin,
  getTransportCommitteeForStudent
} from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
import NewRelease from '../Authentication/NewRelease/NewRelease';
import BdayPopUp from '../Birthdays/BdayPopUp';
import { isBetweenDate } from '../Common/Util';
import SchoolNoticeBoard from '../SchoolNoticeBoard/SchoolNoticeBoard';
import DashboardData from './Dashboard';
import MissingAttendanceDialog from './MissingAttendanceDialog';

import {
  IMissingattendancealeartNameBody
} from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';

import SettingsDropdown from 'src/libraries/Settingicon/Settingicon';
import {
  MissingAttenNameAleart
} from 'src/requests/MissingAttendanceAleart/ReqMissAttendAleart';
const Text = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  Leftpadding: theme.spacing(1),
  Rightpadding: theme.spacing(1),
  TextAlign: 'center',
  cursor: 'pointer'
}));

function Dashboard() {
  const UserLoginDetails1 = useSelector(
    (state: RootState) => state.Dashboard.UserLoginDetails
  );

  if (UserLoginDetails1 !== null) {
    localStorage.setItem(
      'UserLoginDetails1',
      UserLoginDetails1.LastLoginDetails
    );
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBday, setShowBday] = useState(false);
  const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
  const MissingDays = MissingName.map(item => item.MissingDays);
  const hasMissingDays = MissingDays.some(MissingDays => MissingDays !== 0);

  const ModulesPermission: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ModulesPermission
  );
  const SchoolTrasnportIsEnabled: any = useSelector(
    (state: RootState) => state.getSchoolSettings.SchoolTrasnportIsEnabled
  );
  const TransportCommitteeForStudent: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.EnableTransportCommitteeForStudentLogin
  );
  const ExternalLibrarySite: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ExternalLibrarySite
  );
  const SubTeacherEnabled: any = useSelector(
    (state: RootState) => state.getSchoolSettings.SubTeacher
  );
  const isLibrarySchoolSetting: any = useSelector(
    (state: RootState) => state.getSchoolSettings.isLibrarySchoolSetting
  );
  const GetScreensAccessPermissions: any = useSelector(
    (state: RootState) =>
      state.getModulesPermissionsResult.ModulesPermissionsResult
  );
  const Messagecount: any = useSelector(
    (state: RootState) => state.Dashboard.MessageCount
  );
  const AllowParentPhoto: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.AllowParentPhotoUploadFromStudentLogin
  );
  const showAaadharCard: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ShowAadharCardForStudent
  );
  const showOnlineExam: any = useSelector(
    (state: RootState) => state.getSchoolSettings.EnableOnlineExamModule
  );
  const EnableHomeworkModule: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.EnableHomeworkModuleForStudentLogin
  );

  const getShowITRReportOnStudent: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ShowITRReportOnStudentLogin
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem('Id');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const DOB = sessionStorage.getItem('DOB');

  const getModulePermissionBody: IgetModulesPermission = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYearId,
    asUserId: userId,
    abIsPreprimary: false,
    abXseedApplicable: false
  };
  const MissingNameBody: IMissingattendancealeartNameBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(AcademicYearId),
    asUserId: Number(userId),
    asStandardDivisionId: null,
    asDate: null
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
    asKey: ''
  };

  const getNewMessageCount: INewMessageCount = {
    asSchoolId: asSchoolId,
    asUserId: userId,
    asAcademicYearId: AcademicYearId
  };

  const curYear = new Date().getFullYear();
  const date = DOB;
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString('default', { month: 'short' });
  const year = new Date(date).getFullYear();
  const newdate = `${day} ${month} ${curYear}`;

  useEffect(() => {
    if (RoleId == '3') {
      dispatch(getModulesPermission(getModulePermissionBody));
      dispatch(getGetSettingValue(GetSettingValueBody));
      dispatch(getGetSettingSubTeacher(GetSettingValueBody));
      dispatch(getLibrarySchoolSetting(GetSettingValueBody));
      dispatch(getTransportCommitteeForStudent(GetSettingValueBody));
      dispatch(ShowAadharCardForStudent(GetSettingValueBody));
      dispatch(EnableOnlineExamM(GetSettingValueBody));
      dispatch(getParentPhotoUpload(GetSettingValueBody));
      dispatch(getEnableHomeworkModule(GetSettingValueBody));
      dispatch(getShowITRReportOnStudentLogin(GetSettingValueBody));
    }
    localStorage.setItem('url', window.location.pathname);
    dispatch(getModulesPermissionsResultt(getScreensAccessPermissions));
    dispatch(getMessageCount(getNewMessageCount));
    if (isBetweenDate(newdate, 6)) {
      if (localStorage.getItem('DOBSeen') == newdate) {
        setShowBday(false);
      } else {
        setShowBday(true);
        localStorage.setItem('DOBSeen', newdate);
      }
    } else setShowBday(false);
  }, []);

  let items1 = [];
  let items2 = [];
  let items3 = [];

  if (RoleId === '3') {
    items1 = DashboardData.Student.items1.filter((el) => {
      return ModulesPermission.some((f) => {
        return (
          f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) &&
          (el.ModulesPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items1 = items1.filter((el) => {
      return el.Text1 == 'Transport' ? SchoolTrasnportIsEnabled : true;
    });

    items2 = DashboardData.Student.items2.filter((el) => {
      return ModulesPermission.some((f) => {
        return (
          f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) &&
          (el.ModulesPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items3 = DashboardData.Student.items3.filter((el) => {
      return ModulesPermission.some((f) => {
        return (
          f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) &&
          (el.ModulesPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
  }

  if (RoleId === '3') {
    items1 = DashboardData.Student.items1.filter((el) => {
      return ModulesPermission.some((f) => {
        return (
          f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) &&
          (el.ModulesPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items1 = items1.filter((el) => {
      return el.Text1 == 'Transport' ? SchoolTrasnportIsEnabled : true;
    });
    items1 = items1.filter((el) => {
      return el.Text1 == 'Library' ? isLibrarySchoolSetting : true;
    });
    items1 = items1.filter((el) => {
      return el.Text2 == 'Committee' ? TransportCommitteeForStudent : true;
    });
    items2 = DashboardData.Student.items2.filter((el) => {
      return ModulesPermission.some((f) => {
        return (
          f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) &&
          (el.ModulesPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items2 = items2.filter((el) => {
      return el.Text1 == 'Homework ' ? EnableHomeworkModule : true;
    });

    items3 = DashboardData.Student.items3.filter((el) => {
      return ModulesPermission.some((f) => {
        return (
          f.ModuleName ===
          (el.ModulesPermission === undefined
            ? f.ModuleName
            : el.ModulesPermission) &&
          (el.ModulesPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items3 = items3.filter((el) => {
      return el.Text1 == 'Subject ' ? SubTeacherEnabled : true;
    });
    items3 = items3.filter((el) => {
      return el.Text1 == 'Update ' ? showAaadharCard : true;
    });
    items3 = items3.filter((el) => {
      return el.Text1 == 'Online' ? showOnlineExam : true;
    });
    items3 = items3.filter((el) => {
      return el.Text1 == ' O-Progress ' ? showOnlineExam : true;
    });
    items3 = items3.filter((el) => {
      return el.Text1 == 'Upload' ? AllowParentPhoto : true;
    });

    items3 = items3.filter((el) => {
      return el.Text1 == 'Income' ? getShowITRReportOnStudent : true;
    });
  }

  if (RoleId === '6' || RoleId === '1') {
    items1 = DashboardData.Admin.items1.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return (
          f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) &&
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items2 = DashboardData.Admin.items3.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return (
          f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) &&
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
  }

  if (RoleId === '2') {
    items1 = DashboardData.Teacher.items1.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return (
          f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) &&
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
    items2 = DashboardData.Teacher.items2.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return el.Text1.trim() === 'Attendance' &&
          sessionStorage.getItem('IsClassTeacher') === 'N' &&
          f.IsFullAccess === 'N'
          ? false
          : f.ScreenName ===
          (el.ScreenPermission === undefined
            ? f.ScreenName
            : el.ScreenPermission) &&
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true);
      });
    });
    items3 = DashboardData.Teacher.items3.filter((el) => {
      return GetScreensAccessPermissions.some((f) => {
        return (
          f.ScreenName.replace(/ /g, '') ===
          (el.ScreenPermission === undefined
            ? f.ScreenName.replace(/ /g, '')
            : el.ScreenPermission.replace(/ /g, '')) &&
          (el.ScreenPermission === undefined ? true : f.IsEnabled === true)
        );
      });
    });
  }

  let header2 =
    RoleId === '3'
      ? 'Student'
      : 'Teacher' && RoleId === '1'
        ? 'Communication'
        : 'Teacher';
  let header3 =
    RoleId === '6' || RoleId === '2' ? 'Communication' : 'Exam & Communication';
  let header4 = RoleId === '1' && 'Communication';
  const [forceUpdate, setForceUpdate] = useState(false);

  const [missingAttendanceDialog, setMissingAttendanceDialog] = useState(false);

  const handleMissingAttendanceDialogClose = () => {
    setMissingAttendanceDialog(false);
    sessionStorage.setItem('hasShownMissingAttendancePopup', 'true');
  };

  return (
    <>
      <NewRelease />
      {showBday && <BdayPopUp />}
      <SchoolNoticeBoard />
      <SettingsDropdown />
      <Card2
        items={items1}
        heading={'School'}
        rowsCol="6"
        Messagecount={Messagecount.MESSAGECOUNT}
        ExternalLibrarySite={ExternalLibrarySite}
      ></Card2>
      {RoleId != '6' && (
        <Card2
          items={items2}
          heading={header2}
          rowsCol="6"
          Messagecount={Messagecount.MESSAGECOUNT}
        />
      )}
      {RoleId == '6' && (
        <Card2
          items={items2}
          heading={header3}
          rowsCol="6"
          Messagecount={Messagecount.MESSAGECOUNT}
        />
      )}
      {(RoleId == '2' || RoleId == '3') && (
        <Card2
          items={items3}
          heading={header3}
          rowsCol="6"
          Messagecount={Messagecount.MESSAGECOUNT}
        ></Card2>
      )}
      {missingAttendanceDialog && (
        <MissingAttendanceDialog
          open={missingAttendanceDialog}
          setOpen={handleMissingAttendanceDialogClose}
        />
      )}
    </>
  );
}

export default Dashboard;
