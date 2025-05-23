import {
  GetFirstThreeToopersBody,
  GetFirstThreeToopersResult,
  GetStudentsForSubjectMarkMouseOverBody,
  GetStudentsForSubjectMarkMouseOverResult,
  IGetTestMarkBody,
  IGetTestMarkResult
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import http from '../../requests/SchoolService/schoolServices';

const TestMarkApi = (data: IGetTestMarkBody) => {
  return http.post<IGetTestMarkResult>('Teacher/GetTestMark', data);
};
const StudentNameMouseoverApi = (data: GetStudentsForSubjectMarkMouseOverBody) => {
  return http.post<GetStudentsForSubjectMarkMouseOverResult[][]>('Teacher/GetStudentsForSubjectMarkSheet', data);
};
const StudentToppersListApi = (data: GetFirstThreeToopersBody) => {
  return http.post<GetFirstThreeToopersResult>('Teacher/GetFirstThreeToopers', data);
};


const ApiSubjectMarkList = {
  TestMarkApi,
  StudentNameMouseoverApi,
  StudentToppersListApi

};
export default ApiSubjectMarkList;
