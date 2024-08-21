
import { IGetAbsentStudentBody, IGetAbsentStudentResult, IGetSchoolSettingsResult, ISchoolIdBody } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';
import http from '../../requests/SchoolService/schoolServices';

const GetAbsentStudentDetailsPopup = (data: IGetAbsentStudentBody) => {
    return http.post<IGetAbsentStudentResult>('Teacher/GetAbsentStudentDetailsPopup', data);

};

const GetSchoolSettings = (data: ISchoolIdBody) => {
    return http.post<IGetSchoolSettingsResult[]>('School/GetSchoolSettings', data);
  };
  

const AbsentStudentapi = {
    GetAbsentStudentDetailsPopup,
    GetSchoolSettings
};

export default AbsentStudentapi;