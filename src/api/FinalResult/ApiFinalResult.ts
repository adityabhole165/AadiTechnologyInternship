
import {
  IClassTeacherListBody,
  IClassTeacherListRsult,
  IConfiguredTestPublishedBody,
  IConfiguredTestPublishedResult,
  IGenerateAllBody,
  IGenerateAllResult,
  IGenerateBody,
  IGenerateResult,
  IGetPagedStudentBody,
  IGetPagedStudentResult,
  IPublishBody,
  IPublishResult,
  IUnpublishBody,
  IUnpublishResult,
  IViewBody,
  IViewResult
} from 'src/interfaces/FinalResult/IFinalResult';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeacherList = (data: IClassTeacherListBody) => {
  return http.post<IClassTeacherListRsult[]>(
    'Teacher/GetClassTeachersDropdown',
    data
  );
};

const GetStudentResult = (data: IGetPagedStudentBody) => {
  return http.post<IGetPagedStudentResult[]>(
    'Homework/GetPagedStudentResult',
    data
  );
};

const GetPublishResult = (data: IPublishBody) => {
  return http.post<IPublishResult>('Teacher/IsAllConffguredTestPublished', data);
};

const GetUnpublishResult = (data: IUnpublishBody) => {
  return http.post<IUnpublishResult>('Teacher/UnPublishFinalResult', data);
};

const GetGenarateAll = (data: IGenerateAllBody) => {
  return http.post<IGenerateAllResult>('Teacher/GenerateAllStudentsResult', data);
};

const GetGenerateResult = (data: IGenerateBody) => {
  return http.post<IGenerateResult>('Teacher/StudentProgressReport', data);
}

const GetViewResult = (data: IViewBody) => {
  return http.post<IViewResult>('Teacher/GetStudentResult', data);
}

const GetConfiguredTestPublished = (data: IConfiguredTestPublishedBody) => {
  return http.post<IConfiguredTestPublishedResult[]>('Teacher/AllConffguredTestPublished', data);
};

const FinalResultApi = {
  ClassTeacherList,
  GetStudentResult,
  GetPublishResult,
  GetUnpublishResult,
  GetGenarateAll,
  GetGenerateResult,
  GetViewResult,
  GetConfiguredTestPublished
};
export default FinalResultApi;
