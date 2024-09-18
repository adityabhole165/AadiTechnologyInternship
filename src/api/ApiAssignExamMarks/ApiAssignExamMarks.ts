import {
  IAssignClassBody,
  IAssignClassResult,
  IClasswiseExamDropdownBody,
  IClasswiseExamDropdownResult,
  IGetSchoolSettingsResult,
  ISchoolsettingBody,
  ISubjectTeachersForAssignExamMarksBody,
  ISubjectTeachersForAssignExamMarksResult,
  ISubjectsExamMarksStatusForClassBody,
  ISubjectsExamMarksStatusForClassBodyResult,
  ISubmitTestMarksToClassTeacherBody
} from 'src/interfaces/AssignExamMarks/IAssignExamMarks';
import http from '../../requests/SchoolService/schoolServices';

//ClassDropdown
const AssignClass = (data: IAssignClassBody) => {
  return http.post<IAssignClassResult[]>(
    'Teacher/GetAssignedClassDropDown',
    data
  );
};

//ClassWiseExamDropdown
const ClasswiseExamDropdown = (data: IClasswiseExamDropdownBody) => {
  return http.post<IClasswiseExamDropdownResult[]>(
    'Teacher/GetClasswiseExamDropDown',
    data
  );
};

//subjectList
const SubjectsExamMarks = (data: ISubjectsExamMarksStatusForClassBody) => {
  return http.post<ISubjectsExamMarksStatusForClassBodyResult>(
    'Teacher/GetSubjectsExamMarksStatusForClass',
    data
  );
};

const SubmitMarksTeacher = (data: ISubmitTestMarksToClassTeacherBody) => {
  return http.post<string>('Homework/SubmitUnSubmitTestMarksToClassTeacher', data);
};

const SubjectTeachersForAssignExamMarks = (data: ISubjectTeachersForAssignExamMarksBody) => {
  return http.post<ISubjectTeachersForAssignExamMarksResult[]>('Teacher/SubjectTeachersForAssignExamMarks', data);
};
const GetSchoolSettings = (data: ISchoolsettingBody) => {
  return http.post<IGetSchoolSettingsResult>('School/GetSchoolSettings', data);
};



const AssignExamMarkApi = {
  AssignClass,
  ClasswiseExamDropdown,
  SubjectsExamMarks,
  SubmitMarksTeacher,
  SubjectTeachersForAssignExamMarks,
  GetSchoolSettings
};

export default AssignExamMarkApi;
