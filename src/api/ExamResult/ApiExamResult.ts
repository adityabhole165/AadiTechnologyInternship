import {
  IGenerateTestTotalMarksBody,
  IGenerateTestTotalMarksResult,
  IGetAllStudentsByGivenStdDivsBody, IGetAllStudentsByGivenStdDivsResult,
  IGetClassPassFailDetailsForTestBody,
  IGetClassPassFailDetailsForTestResult,
  IGetClassTeachersBody,
  IGetClassTeachersResult,
  IGetClasswiseExamDropdownBody,
  getIsFinalResultPublishedBody,
  getIsTermExamPublishedBody,
  IGetClasswiseExamDropdownResult,
  IGetPrePrimaryProgressSheetStatusBody, IGetPrePrimaryProgressSheetStatusResult,
  IGetSMSTemplateBody, IGetSMSTemplateResult,
  IPublishUnpublishExamResultBody,
  IsMonthConfigurationForExamResult,
  IsMonthConfigurationForExamResultBody,
  IsPrePrimaryExamConfigurationBody, IsPrePrimaryExamConfigurationResult,
  PublishUnpublishExamResult
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
const PrePrimaryExamConfigurationApi = (data: IsPrePrimaryExamConfigurationBody) => {
  return http.post<IsPrePrimaryExamConfigurationResult>(
    'Teacher/IsPrePrimaryExamConfiguration',
    data
  );
};
const MonthConfigurationForExamResultApi = (data: IsMonthConfigurationForExamResultBody) => {
  return http.post<IsMonthConfigurationForExamResult>(
    'Teacher/IsMonthConfigurationForExamResult',
    data
  );
};
const GetAllStudentsByGivenStdDivsApi = (data: IGetAllStudentsByGivenStdDivsBody) => {
  return http.post<IGetAllStudentsByGivenStdDivsResult>(
    'Teacher/GetAllStudentsByGivenStdDivs',
    data
  );
};
const GetSMSTemplateApi = (data: IGetSMSTemplateBody) => {
  return http.post<IGetSMSTemplateResult>(
    'Teacher/GetSMSTemplate',
    data
  );
};
const GenerateTestTotalMarksApi = (data: IGenerateTestTotalMarksBody) => {
  return http.post<IGenerateTestTotalMarksResult>(
    'Teacher/GenerateTestTotalMarks',
    data
  );
};

const getIsFinalResultPublished = (data: getIsFinalResultPublishedBody) => {
  return http.post(
    'ProgressReport/getIsFinalResultPublished',
    data
  );
};
const getIsTermExamPublished = (data: getIsTermExamPublishedBody) => {
  return http.post(
    'ProgressReport/getIsTermExamPublished',
    data
  );
};

const ApiExamResult = {
  ClassTeachersApi,
  GetClasswiseExamDropDownApi,
  GetClassPassFailDetailsForTestApi,
  PublishUnpublishExamResultApi,
  GetPrePrimaryProgressSheetStatusApi,
  PrePrimaryExamConfigurationApi,
  MonthConfigurationForExamResultApi,
  GetAllStudentsByGivenStdDivsApi,
  GetSMSTemplateApi,
  GenerateTestTotalMarksApi,
  getIsFinalResultPublished,
  getIsTermExamPublished
};
export default ApiExamResult;




