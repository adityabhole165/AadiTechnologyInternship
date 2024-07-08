import {
  IGetClassTeachersBody,
  IGetClassTeachersResult,
  IGetGetStudentsForNonXseedSubjects,
  IGetGetStudentsForNonXseedSubjectsBody,
  IGetNonXseedStudentsObs,
  IGetStudentsForStdDevMasters,
  IGetStudentsForStdDevMastersBody,
  IGetTeacherXseedSubjectsBody,
  IGetTeacherXseedSubjectsResult,
  IGetTestwiseTermBody,
  IGetTestwiseTermResult,
  ISaveNonXseedSubGrades,
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

const GetStudentsForNonXseedSubjectWithObs = (data: IGetGetStudentsForNonXseedSubjects) => {
  return http.post<IGetNonXseedStudentsObs[]>(
    'Teacher/GetStudentsForNonXseedSubjects',
    data
  );
};

const GetStudentsForStdDevMasters = (data: IGetStudentsForStdDevMasters) => {
  return http.post<IGetStudentsForStdDevMastersBody>(
    'Teacher/GetStudentsForStdDevMasters',
    data
  );
};

const GetTeacherXseedSubjects = (data: IGetTeacherXseedSubjectsBody) => {
  return http.post<IGetTeacherXseedSubjectsResult[]>(
    'Teacher/GetTeacherXseedSubjects',
    data
  );
};

const GetStudentsForNonXseedSubjects = (data: IGetGetStudentsForNonXseedSubjects) => {
  return http.post<IGetGetStudentsForNonXseedSubjectsBody[]>(
    "Teacher/GetStudentsForNonXseedSubjects",
    data
  )
}

const SubmitExamMarksStatus = (data: ISubmitExamMarksStatusBody) => {
  return http.post<''>('Teacher/SubmitExamMarksStatus', data);
};

const IGetSaveNonXseedSubGrades = (
  data: ISaveNonXseedSubGrades
) => {
  return http.post<''>('Teacher/SaveNonXseedSubGrades', data);
};

const ApiAssignPrePrimaryGrades = {
  GetTestwiseTermA,
  GetClassTeachers,
  GetTeacherXseedSubjects,
  SubmitExamMarksStatus,
  GetStudentsForStdDevMasters,
  GetStudentsForNonXseedSubjects,
  IGetSaveNonXseedSubGrades,
  GetStudentsForNonXseedSubjectWithObs
};
export default ApiAssignPrePrimaryGrades;