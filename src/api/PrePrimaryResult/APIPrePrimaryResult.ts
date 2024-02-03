import {
  IGetAssessmentBody,
  IGetAssessmentResult,
  IGetClassTeacherXseedSubjectsBody,
  IGetClassTeacherXseedSubjectsResult,
  IGetPrePrimaryResultBody,
  IGetPrePrimaryResultResult,
  IGetPublishResltBody,
  IGetUnPublishResltBody
} from 'src/interfaces/PrePrimaryResult/IPrePrimaryResult';
import http from '../../requests/SchoolService/schoolServices';

const PrePrimaryResultApi = (data: IGetPrePrimaryResultBody) => {
  return http.post<IGetPrePrimaryResultResult[]>(
    'Teacher/GetClassTeacherss',
    data
  );
};
const AssessmentApi = (data: IGetAssessmentBody) => {
  return http.post<IGetAssessmentResult[]>(
    'Teacher/GetAssessmentDropdown',
    data
  );
};
const TeacherXseedSubjectsApi = (data: IGetClassTeacherXseedSubjectsBody) => {
  return http.post<IGetClassTeacherXseedSubjectsResult>(
    'Teacher/GetClassTeacherXseedSubjects',
    data
  );
};
const Published = (data: IGetPublishResltBody) => {
  return http.post('Teacher/PublishReslt', data);
};
const UnPublishReslt = (data: IGetUnPublishResltBody) => {
  return http.post('Teacher/UnPublishReslt', data);
};
const ApiPrePrimaryResult = {
  PrePrimaryResultApi,
  AssessmentApi,
  TeacherXseedSubjectsApi,
  Published,
  UnPublishReslt
};

export default ApiPrePrimaryResult;
