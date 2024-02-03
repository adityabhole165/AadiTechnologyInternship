import {
  IAssignClassBody,
  IAssignClassResult,
  IClasswiseExamDropdownBody,
  IClasswiseExamDropdownResult,
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
  return http.post<ISubjectsExamMarksStatusForClassBodyResult[]>(
    'Teacher/GetSubjectsExamMarksStatusForClass',
    data
  );
};

const SubmitMarksTeacher = (data: ISubmitTestMarksToClassTeacherBody) => {
  return http.post<''>('Homework/SubmitTestMarksToClassTeacher', data);
};

const AssignExamMarkApi = {
  AssignClass,
  ClasswiseExamDropdown,
  SubjectsExamMarks,
  SubmitMarksTeacher
};

export default AssignExamMarkApi;
