import http from "../../requests/SchoolService/schoolServices";
import {IGetITRFileNameBody,IGetITRFileNameResult} from "src/interfaces/Student/IIncomeTaxReport" ;

const GetIncomeTaxReportApi = (data: IGetITRFileNameBody) => {
    return http.post<IGetITRFileNameResult>('Student/GetITRFileName',data);
};



const ApiIncomeTaxReport={
    GetIncomeTaxReportApi
}
 export default  ApiIncomeTaxReport;
