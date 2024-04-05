import {
  IGetClassPassFailDetailsForTestBody,
  IGetClassPassFailDetailsForTestResult,
  IGetClassTeachersBody,
  IGetClassTeachersResult,
  IGetClasswiseExamDropdownBody,
  IGetClasswiseExamDropdownResult,
  IGetPrePrimaryProgressSheetStatusBody, IGetPrePrimaryProgressSheetStatusResult,
  IPublishUnpublishExamResultBody, PublishUnpublishExamResult
} from 'src/interfaces/ExamResult/IExamResult';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeachersApi = (data: IGetClassTeachersBody) => {
  return http.post<IGetClassTeachersResult[]>('Teacher/GetClassTeachers', data);
};
const GetClasswiseExamDropDownApi = (data: IGetClasswiseExamDropdownBody) => {
  return http.post<IGetClasswiseExamDropdownResult[]>(
    'Teacher/GetClasswiseExamDropDown',
    data
  );
};

const GetClassPassFailDetailsForTestApi = (
  data: IGetClassPassFailDetailsForTestBody
) => {
  return http.post<IGetClassPassFailDetailsForTestResult>(
    'Teacher/GetClassPassFailDetailsForTest',
    data
  );
};
const PublishUnpublishExamResultApi = (data: IPublishUnpublishExamResultBody) => {
  return http.post<PublishUnpublishExamResult>(
    'Teacher/PublishUnpublishExamResult',
    data
  );
};
const GetPrePrimaryProgressSheetStatusApi = (data: IGetPrePrimaryProgressSheetStatusBody) => {
  return http.post<IGetPrePrimaryProgressSheetStatusResult>(
    'Teacher/GetPrePrimaryProgressSheetStatus',
    data
  );
};
const ApiExamResult = {
  ClassTeachersApi,
  GetClasswiseExamDropDownApi,
  GetClassPassFailDetailsForTestApi,
  PublishUnpublishExamResultApi,
  GetPrePrimaryProgressSheetStatusApi
};
export default ApiExamResult;




