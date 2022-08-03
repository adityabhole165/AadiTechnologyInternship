import { IgetModulesPermission, ISchoolId } from "src/interfaces/SchoolSetting/schoolSettings";
import { IGetScreensAccessPermissions,GetScreensAccessPermissions } from "src/interfaces/SchoolSetting/schoolSettings";
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

const SchoolSettingApi ={
    GetSchoolSettings,
    GetModulesPermissions,
    GetScreensAccessPermission
}

export default SchoolSettingApi