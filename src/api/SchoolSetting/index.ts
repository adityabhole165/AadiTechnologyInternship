import { IgetModulesPermission, ISchoolId } from "src/interfaces/SchoolSetting/schoolSettings";
import { IGetScreensAccessPermissions,GetScreensAccessPermissions,
    IGetSettingValueBody, IGetSettingValueResult } from "src/interfaces/SchoolSetting/schoolSettings";
import http from "../../requests/SchoolService/schoolServices";


const GetSchoolSettings=(data:ISchoolId)=>{
    return http.post<ISchoolId>("School/GetSchoolSettings",data)
}

const GetModulesPermissions=(data:IgetModulesPermission)=>{
    return http.post<IgetModulesPermission>("User/GetModulesPermissions",data)
}

const GetScreensAccessPermission=(data:IGetScreensAccessPermissions)=>{
    return http.post<GetScreensAccessPermissions>("User/GetScreensAccessPermissions",data)
}

const GetSettingValueapi = (data: IGetSettingValueBody) => {
    return http.post<IGetSettingValueResult>('School/GetSettingValues',data);
  };
const SchoolSettingApi ={
    GetSchoolSettings,
    GetModulesPermissions,
    GetScreensAccessPermission,
    GetSettingValueapi
}

export default SchoolSettingApi