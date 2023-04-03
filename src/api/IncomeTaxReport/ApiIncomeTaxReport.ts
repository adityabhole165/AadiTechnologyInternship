
import http from "../../requests/SchoolService/schoolServices";
import {IGetITRFileNameBody,IGetITRFileNameResult,GetAllAcademicYearsApiBody,GetAllAcademicYearsResult} from "src/interfaces/Student/IIncomeTaxReport" ;
// import  { GetAllAcademicYearsApiBody } from 'src/interfaces/Student/Fees';

const GetIncomeTaxReportApi = (data: IGetITRFileNameBody) => {
    return http.post<IGetITRFileNameResult>('Student/GetITRFileName',data);
};

const getAllAcademicYears = (data: GetAllAcademicYearsApiBody) => {
    return http.post<GetAllAcademicYearsResult> ('Student/GetAllAcademicYearsOfStudent',data);
   
    };

const ApiIncomeTaxReport={
    GetIncomeTaxReportApi,
    getAllAcademicYears
}
 export default  ApiIncomeTaxReport;
