import {
  IAcademicYearsForProgressReportBody,
  IAcademicYearsForProgressResult,
  default as IExamResult,
  default as IGetAcademicYearsOfStudent,
  IGetProgressReportFileName,
  IGetProgressReportFileNameResult,
  default as IGetReasonforBlockingProgressReport,
  IGetTermsForProgressReportBody,
  IGetTermsForProgressReportResult,
  IIsPendingFeesForStudent,
  IProgressReportBody
} from '../../interfaces/Student/ProgressReport';
import http from '../../requests/SchoolService/schoolServices';

const GetStudentExamResultList = (data: IExamResult) => {
  return http.post<IExamResult>('ProgressReport/GetStudentExamResult', data);
};
const GetAcademicYears = (data: IGetAcademicYearsOfStudent) => {
  return http.post<IGetAcademicYearsOfStudent>(
    'GetAcademicYearsOfStudent',
    data
  );
};
const GetReasonforBlockingProgressReport = (
  data: IGetReasonforBlockingProgressReport
) => {
  return http.post<IGetReasonforBlockingProgressReport>(
    'ProgressReport/GetReasonforBlockingProgressReport',
    data
  );
};
const GetPendingFees = (data: IIsPendingFeesForStudent) => {
  return http.post<IIsPendingFeesForStudent>(
    'Student/IsPendingFeesForStudent',
    data
  );
};
const GetProgressReportFileName = (data: IGetProgressReportFileName) => {
  return http.post<IGetProgressReportFileNameResult>(
    'ProgressReport/GetProgressReportFileName',
    data
  );
};

const GetProgressReport = (data: IProgressReportBody) => {
  return http.post('Student/GetFileNameForProgressReport', data);
};

const AcademicYearsForProgressReport = (
  data: IAcademicYearsForProgressReportBody
) => {
  return http.post<IAcademicYearsForProgressResult>(
    'Student/GetAcademicYearsForProgressReport',
    data
  );
};

const TermsForProgressReport = (data: IGetTermsForProgressReportBody) => {
  return http.post<IGetTermsForProgressReportResult[]>(
    'Student/GetTermsForProgressReport',
    data
  );
};

const GetExamResultApi = {
  GetStudentExamResultList,
  GetAcademicYears,
  GetReasonforBlockingProgressReport,
  GetPendingFees,
  GetProgressReportFileName,
  GetProgressReport,
  AcademicYearsForProgressReport,
  TermsForProgressReport
};

export default GetExamResultApi;
