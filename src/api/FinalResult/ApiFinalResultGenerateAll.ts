
import { IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IGetStudentPrrogressReportResult, IViewBody, IViewResult } from "src/interfaces/FinalResult/IFinalResultGenerateAll";
import http from '../../requests/SchoolService/schoolServices';

const StudentPrrogressReport = (data: IGetStudentPrrogressReportBody) => {
    return http.post<IGetStudentPrrogressReportResult>(
        'Teacher/StudentProgressReport',
        data
    );
};

const GenerateResultAll = (data: IGetGenerateAllStudentBody) => {
    return http.post<string>('Teacher/GenerateAllStudentsResult', data);
};

const ViewReportProgress = (data: IViewBody) => {
    return http.post<IViewResult>(
        'Teacher/GetStudentResult',
        data
    );
};
const ApiFinalResultGenerateAll = {
    StudentPrrogressReport,
    GenerateResultAll,
    ViewReportProgress
};
export default ApiFinalResultGenerateAll;