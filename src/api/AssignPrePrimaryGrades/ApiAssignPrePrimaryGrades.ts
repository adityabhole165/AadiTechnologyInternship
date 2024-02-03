import {
  IGetClassTeachersBody,
  IGetClassTeachersResult,
  IGetTeacherXseedSubjectsBody,
  IGetTeacherXseedSubjectsResult,
  IGetTestwiseTermBody,
  IGetTestwiseTermResult,
  ISubmitExamMarksStatusBody
} from 'src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades';
import http from '../../requests/SchoolService/schoolServices';

const GetTestwiseTermA = (data: IGetTestwiseTermBody) => {
  return http.post<IGetTestwiseTermResult[]>(
    'Teacher/GetAssessmentDropdown',
    data
  );
};

const GetClassTeachers = (data: IGetClassTeachersBody) => {
  return http.post<IGetClassTeachersResult[]>(
    'Teacher/GetClassTeacherss',
    data
  );
};

const GetTeacherXseedSubjects = (data: IGetTeacherXseedSubjectsBody) => {
  return http.post<IGetTeacherXseedSubjectsResult[]>(
    'Teacher/GetTeacherXseedSubjects',
    data
  );
};

const SubmitExamMarksStatus = (data: ISubmitExamMarksStatusBody) => {
  return http.post<''>('Teacher/SubmitExamMarksStatus', data);
};

const ApiAssignPrePrimaryGrades = {
  GetTestwiseTermA,
  GetClassTeachers,
  GetTeacherXseedSubjects,
  SubmitExamMarksStatus
};
export default ApiAssignPrePrimaryGrades;
