
import http from "../../requests/SchoolService/schoolServices";
import IExamResult from "../../interfaces/Student/ProgressReport"
import IGetAcademicYearsOfStudent from "../../interfaces/Student/ProgressReport"
import IGetReasonforBlockingProgressReport from  "../../interfaces/Student/ProgressReport"


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