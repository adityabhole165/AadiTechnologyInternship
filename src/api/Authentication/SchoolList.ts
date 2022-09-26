
import http from "../../requests/SchoolService/schoolServices";
import {ISchoolList} from "src/interfaces/Authentication/SchoolList"
import { AnyAction } from "redux";
import { IGetSchoolSettingsResult, ISchoolSettings } from "src/interfaces/Authentication/SchoolSettings";
import { ISchoolId } from "src/interfaces/SchoolSetting/schoolSettings";

  const SchoolList = (data: ISchoolList) => {
    return http.post<ISchoolList>('School/GetAllSchools',data);
  };

  const SchoolSettings = (data: ISchoolId) => {
    return http.post<IGetSchoolSettingsResult>('School/GetSchoolSettings',data);
  };
  
const SchoolListApi ={
    SchoolList,
    SchoolSettings
}

export default SchoolListApi;
