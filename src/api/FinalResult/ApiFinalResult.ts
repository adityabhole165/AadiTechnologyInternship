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
  IUnpublishedTestexamBody,
  IUnpublishedTestexamResult,
  IViewBody,
  IViewResult,
  IconfiguredExamBody,
  IconfiguredExamResult,
  isAtleastOneResultGeneratedBody,
  isAtleastOneResultGeneratedResult,
  isResultPublishedBody,
  isResultPublishedResult,
  isTestPublishedBody,
  isTestPublishedResult
} from 'src/interfaces/FinalResult/IFinalResult';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeacherList = (data: IClassTeacherListBody) => {
  return http.post<IClassTeacherListRsult[]>(
    'Teacher/GetClassTeachers',
    data
  );
};

const GetStudentResult = (data: IGetPagedStudentBody) => {
  return http.post<IGetPagedStudentResult>(
    'Homework/GetPagedStudentResult',
    data
  );
};

const GetPublishResult = (data: IPublishBody) => {
  return http.post<IPublishResult>('Teacher/AnnualResultPublish', data);
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

const GetResultPublished = (data: isResultPublishedBody) => {
  return http.post<isResultPublishedResult>('Teacher/IsResultPublishedForStdDiv', data);
}

const GetAtleastOneResultGenerated = (data: isAtleastOneResultGeneratedBody) => {
  return http.post<isAtleastOneResultGeneratedResult>('Teacher/isAtleastOneResultGeneratedForStdDiv', data);
}

const GetTestPublished = (data: isTestPublishedBody) => {
  return http.post<isTestPublishedResult>('Teacher/IsTestPublishedForStdDiv', data);
}

const Getisconfigred = (data: IconfiguredExamBody) => {
  return http.post<IconfiguredExamResult>('Teacher/AllConffguredTestPublished', data);
};
const Getunplishedexam = (data: IUnpublishedTestexamBody) => {
  return http.post<IUnpublishedTestexamResult[]>('Teacher//AllUnpublishedTestForStdDiv', data);
};




const FinalResultApi = {
  ClassTeacherList,
  GetStudentResult,
  GetPublishResult,
  GetUnpublishResult,
  GetGenarateAll,
  GetGenerateResult,
  GetViewResult,
  GetConfiguredTestPublished,
  GetResultPublished,
  GetAtleastOneResultGenerated,
  GetTestPublished,
  Getisconfigred,
  Getunplishedexam,


};
export default FinalResultApi;