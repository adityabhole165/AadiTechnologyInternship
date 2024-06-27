import {
  IClassTeacherDropdownBody,
  IClassTeacherDropdownResult,
  IGetFinalPublishedExamStatusBody,
  IGetFinalPublishedExamStatusResult,
  IStudentsListBody,
  IStudentsListResult,
  ITermDropdownBody,
  ITermDropdownResult,
  IUpdateStudentDetailsBody
} from 'src/interfaces/TermwiseHeightWeight/ITermwiseHeightWeight';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeacherDropdownApi = (data: IClassTeacherDropdownBody) => {
  return http.post<IClassTeacherDropdownResult[]>('Teacher/GetAllPrimaryClassTeachers1', data);
};
const TermDropdownApi = (data: ITermDropdownBody) => {
  return http.post<ITermDropdownResult[]>('Teacher/GetTestwiseTerm', data);
};
const StudentListApi = (data: IStudentsListBody) => {
  return http.post<IStudentsListResult[]>('Teacher/GetStudentListToCaptureHeighthWeight', data);
};
const UpdateStudentListApi = (data: IUpdateStudentDetailsBody) => {
  return http.post('Teacher/UpdateStudentDetailsForHeightWeight', data);
};
const GetFinalPublishedExamStatusApi = (data: IGetFinalPublishedExamStatusBody) => {
  return http.post<IGetFinalPublishedExamStatusResult>('Teacher/GetFinalPublishedExamStatus', data);
};

const TermwiseHeightWeightApi = {
  ClassTeacherDropdownApi,
  TermDropdownApi,
  StudentListApi,
  UpdateStudentListApi,
  GetFinalPublishedExamStatusApi
};

export default TermwiseHeightWeightApi;
