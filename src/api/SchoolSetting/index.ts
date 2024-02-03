import {
  GetScreensAccessPermissions,
  IgetModulesPermission,
  IGetScreensAccessPermissions,
  IGetSettingValueBody,
  IGetSettingValueByNameBody,
  IGetSettingValueByNameResult,
  IGetSettingValueResult,
  ISchoolId
} from 'src/interfaces/SchoolSetting/schoolSettings';
import http from '../../requests/SchoolService/schoolServices';

const GetSchoolSettings = (data: ISchoolId) => {
  return http.post<ISchoolId>('School/GetSchoolSettings', data);
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
const SchoolSettingApi = {
  GetSchoolSettings,
  GetModulesPermissions,
  GetScreensAccessPermission,
  GetSettingValueapi,
  GetSettingValueByNameApi
};

export default SchoolSettingApi;
