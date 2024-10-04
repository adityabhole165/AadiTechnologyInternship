import {
  GetScreensAccessPermissions,
  IGetAllAcademicYearForSchoolBody,
  IGetAllAcademicYearForSchoolResult,
  IGetAllowedPagesForUserBody,
  IGetAllowedPagesForUserResult,
  IgetModulesPermission,
  IGetSchoolSettingsResult,
  IGetScreensAccessPermissions,
  IGetSettingValueBody,
  IGetSettingValueByNameBody,
  IGetSettingValueByNameResult,
  IGetSettingValueResult,
  IGetUserDetailsBody,
  IGetUserDetailsResult,
  ISchoolId
} from 'src/interfaces/SchoolSetting/schoolSettings';
import http from '../../requests/SchoolService/schoolServices';

const GetSchoolSettings = (data: ISchoolId) => {
  return http.post<IGetSchoolSettingsResult>('School/GetSchoolSettings', data);
};

const GetModulesPermissions = (data: IgetModulesPermission) => {
  return http.post<IgetModulesPermission>('User/GetModulesPermissions', data);
};

const GetScreensAccessPermission = (data: IGetScreensAccessPermissions) => {
  return http.post<GetScreensAccessPermissions>(
    'User/GetScreensAccessPermissions',
    data
  );
};

const GetSettingValueapi = (data: IGetSettingValueBody) => {
  return http.post<IGetSettingValueResult>('School/GetSettingValue', data);
};
const GetSettingValueByNameApi = (data: IGetSettingValueByNameBody) => {
  return http.post<IGetSettingValueByNameResult>(
    'School/GetSettingValueByName',
    data
  );
};
const GetAllAcademicYearApi = (data: IGetAllAcademicYearForSchoolBody) => {
  return http.post<IGetAllAcademicYearForSchoolResult[]>('Teacher/GetAllAcademicYearsForSchool', data);
};
const GetUserDetailApi = (data: IGetUserDetailsBody) => {
  return http.post<IGetUserDetailsResult>('User/GetUserDetails', data);
};

const GetAllowedPagesForUserApi = (data: IGetAllowedPagesForUserBody) => {
  return http.post<IGetAllowedPagesForUserResult[]>('Teacher/GetAllowedPagesForUser', data);
};

const SchoolSettingApi = {
  GetSchoolSettings,
  GetModulesPermissions,
  GetScreensAccessPermission,
  GetSettingValueapi,
  GetSettingValueByNameApi,
  GetAllAcademicYearApi,
  GetUserDetailApi,
  GetAllowedPagesForUserApi
};

export default SchoolSettingApi;
