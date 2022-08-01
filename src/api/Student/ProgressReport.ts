
import http from "../../Client_Api/SchoolService/schoolServices";
import IExamResult from "../../Interface/Student/ProgressReport"
import IGetAcademicYearsOfStudent from "../../Interface/Student/ProgressReport"
import IGetReasonforBlockingProgressReport from  "../../Interface/Student/ProgressReport"


const GetStudentExamResultList  = (data: IExamResult) => {

    return http.post<IExamResult>('ProgressReport/GetStudentExamResult',data);
};
const GetAcademicYears  = (data: IGetAcademicYearsOfStudent) => {

    return http.post<IGetAcademicYearsOfStudent>('GetAcademicYearsOfStudent',data);
};
const GetReasonforBlockingProgressReport  = (data: IGetReasonforBlockingProgressReport) => {

    return http.post<IGetReasonforBlockingProgressReport>('ProgressReport/GetReasonforBlockingProgressReport',data);
};
const GetExamResultApi= {
    GetStudentExamResultList,
    GetAcademicYears,
    GetReasonforBlockingProgressReport,

}

export default GetExamResultApi;