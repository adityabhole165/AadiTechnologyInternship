
import http from "../../requests/SchoolService/schoolServices";
import IExamResult, { IGetProgressReportFileName, IGetProgressReportFileNameResult,IProgressReportBody,IAcademicYearsForProgressReportBody,IAcademicYearsForProgressResult,IGetTermsForProgressReportBody,IGetTermsForProgressReportResult } from "../../interfaces/Student/ProgressReport"
import IGetAcademicYearsOfStudent from "../../interfaces/Student/ProgressReport"
import IGetReasonforBlockingProgressReport from  "../../interfaces/Student/ProgressReport"
import { IIsPendingFeesForStudent } from "../../interfaces/Student/ProgressReport";



const GetStudentExamResultList  = (data: IExamResult) => {

    return http.post<IExamResult>('ProgressReport/GetStudentExamResult',data);
};
const GetAcademicYears  = (data: IGetAcademicYearsOfStudent) => {

    return http.post<IGetAcademicYearsOfStudent>('GetAcademicYearsOfStudent',data);
};
const GetReasonforBlockingProgressReport  = (data: IGetReasonforBlockingProgressReport) => {

    return http.post<IGetReasonforBlockingProgressReport>('ProgressReport/GetReasonforBlockingProgressReport',data);
};
const GetPendingFees  = (data: IIsPendingFeesForStudent) => {

    return http.post<IIsPendingFeesForStudent>('Student/IsPendingFeesForStudent',data);
};
const GetProgressReportFileName  = (data: IGetProgressReportFileName) => {

    return http.post<IGetProgressReportFileNameResult>('ProgressReport/GetProgressReportFileName',data);
};


const GetProgressReport = (data:IProgressReportBody) => {
    return http.post('Student/GetFileNameForProgressReport',data);
  };

  const AcademicYearsForProgressReport = (data: IAcademicYearsForProgressReportBody) => {

    return http.post<IAcademicYearsForProgressResult>('Student/GetAcademicYearsForProgressReport',data);
};


const TermsForProgressReport = (data: IGetTermsForProgressReportBody) => {

    return http.post<IGetTermsForProgressReportResult[]>('Student/GetTermsForProgressReport',data);
};


const GetExamResultApi= {
    GetStudentExamResultList,
    GetAcademicYears,
    GetReasonforBlockingProgressReport,
    GetPendingFees,
    GetProgressReportFileName,
    GetProgressReport,
    AcademicYearsForProgressReport,
    TermsForProgressReport
   
}

export default GetExamResultApi;