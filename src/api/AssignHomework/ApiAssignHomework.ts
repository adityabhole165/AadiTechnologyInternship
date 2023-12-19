import http from "../../requests/SchoolService/schoolServices";
import {ITeacherDropdownBody,ITeacherDropdownResult,IClassDropDownBody,IClassDropDownResult,IGetTeacherSubjectDetailsBody,IGetTeacherSubjectDetailsResult,IClassTeacherDropdownBody,IClassTeacherDropdownResult} from 'src/interfaces/AssignHomework/IAssignHomework'

const TeacherDropdown = (data:ITeacherDropdownBody) => {
    return http.post<ITeacherDropdownResult[]>('Teacher/GetTeacherName',data);
};
const ClassDropdown = (data:IClassDropDownBody) => {
    return http.post<IClassDropDownResult[]>('Teacher/GetAssignedClassDropDown',data);
};
const GetTeacherSubjectDetails = (data:IGetTeacherSubjectDetailsBody) => {
    return http.post<IGetTeacherSubjectDetailsResult[]>('Teacher/GetTeacherSubjectAndClassSubject',data);
};
const fullClassTeacherDropdown = (data:IClassTeacherDropdownBody) => {
    return http.post<IClassTeacherDropdownResult[]>('Teacher/GetAllPrimaryClassTeachers',data);
};

const TeacherDropdownApi ={
    TeacherDropdown,
    ClassDropdown,
    GetTeacherSubjectDetails,
    fullClassTeacherDropdown
}

export default TeacherDropdownApi