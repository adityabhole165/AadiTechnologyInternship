import {
  IClassDropDownBody,
  IClassDropDownResult,
  IClassTeacherDropdownBody,
  IClassTeacherDropdownResult,
  IGetSchoolSettingsResult,
  IGetTeacherSubjectDetailsBody,
  IGetTeacherSubjectDetailsResult,
  ISchoolsettingBody,
  ITeacherDropdownBody,
  ITeacherDropdownResult
} from 'src/interfaces/AssignHomework/IAssignHomework';
import http from '../../requests/SchoolService/schoolServices';

const TeacherDropdown = (data: ITeacherDropdownBody) => {
  return http.post<ITeacherDropdownResult[]>('Teacher/GetTeacherName', data);
};
const ClassDropdown = (data: IClassDropDownBody) => {
  return http.post<IClassDropDownResult[]>(
    'Teacher/GetAssignedClassDropDown',
    data
  );
};
const GetTeacherSubjectDetails = (data: IGetTeacherSubjectDetailsBody) => {
  return http.post<IGetTeacherSubjectDetailsResult[]>(
    'Teacher/GetTeacherSubjectAndClassSubject',
    data
  );
};
const fullClassTeacherDropdown = (data: IClassTeacherDropdownBody) => {
  return http.post<IClassTeacherDropdownResult[]>(
    'Teacher/GetAllPrimaryClassTeachers',
    data
  );
};
const GetSchoolSettings = (data: ISchoolsettingBody) => {
  return http.post<IGetSchoolSettingsResult>('School/GetSchoolSettings', data);
};


const TeacherDropdownApi = {
  TeacherDropdown,
  ClassDropdown,
  GetTeacherSubjectDetails,
  fullClassTeacherDropdown,
  GetSchoolSettings
};

export default TeacherDropdownApi;
