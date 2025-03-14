import {
  IGetClassTeachersBody,
  IGetClassTeachersResult,
  IGetGetStudentsForNonXseedSubjects,
  IGetGetStudentsForNonXseedSubjectsBody,
  IGetInsertStudentGradesBody,
  IGetLearningOutcomesForSubjectSectionBody,
  IGetLearningOutcomesForSubjectSectionResult,
  IGetNonXseedStudentsObs,
  IGetStudentsForStdDevMasters,
  IGetStudentsForStdDevMastersBody,
  IGetSubmitUnsubmitExamMarksStatusBody,
  IGetTeacherDropdownBody,
  IGetTeacherDropdownResult,
  IGetTeacherXseedSubjectsBody,
  IGetTeacherXseedSubjectsResult,
  IGetTestwiseTermBody,
  IGetTestwiseTermResult,
  IGetXseedStudentsInfoBody,
  IGetXseedStudentsInfoResult,
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
const GetTeacherDropdown = (data: IGetTeacherDropdownBody) => {
  return http.post<IGetTeacherDropdownResult[]>(
    'Teacher/GetTeacherDropdown',
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

const GetXseedStudentsDataApi = (data: IGetXseedStudentsInfoBody) => {
  return http.post<IGetXseedStudentsInfoResult>('Teacher/GetStudentsForStdDevMasters', data)
}

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


const GetSubmitUnsubmitExamMarksStatus = (data: IGetSubmitUnsubmitExamMarksStatusBody) => {
  return http.post<string>('Teacher/SubmitUnsubmitExamMarksStatus', data);
}

const GetLearningOutcomesForSubjectSectionApi = (data: IGetLearningOutcomesForSubjectSectionBody) => {
  return http.post<IGetLearningOutcomesForSubjectSectionResult>('Teacher/GetLearningOutcomesForSubjectSection', data)
}

const GetInsertStudentGradesApi = (data: IGetInsertStudentGradesBody) => {
  return http.post<string>('Teacher/InsertStudentGrades', data)
}
const ApiAssignPrePrimaryGrades = {
  GetTestwiseTermA,
  GetClassTeachers,
  GetTeacherXseedSubjects,
  SubmitExamMarksStatus,
  GetStudentsForStdDevMasters,
  GetStudentsForNonXseedSubjects,
  IGetSaveNonXseedSubGrades,
  GetStudentsForNonXseedSubjectWithObs,
  GetSubmitUnsubmitExamMarksStatus,
  GetTeacherDropdown,
  GetXseedStudentsDataApi,
  GetLearningOutcomesForSubjectSectionApi,
  GetInsertStudentGradesApi
};
export default ApiAssignPrePrimaryGrades;