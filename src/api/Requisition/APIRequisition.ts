import http from "../../requests/SchoolService/schoolServices";
import { IGetRequisitionStatusBody,IGetRequisitionStatusResult,IGetPagedRequisitionBody,IGetPagedRequisitionResult } from "src/interfaces/Requisition/IRequisition";

const RequisitionApi = (data:IGetRequisitionStatusBody) => {
    return http.post<IGetRequisitionStatusResult[]>('Teacher/GetRequsitionStatus',data);
};
const RequisitionListApi = (data:IGetPagedRequisitionBody) => {
    return http.post<IGetPagedRequisitionResult[]>('Teacher/GetPagedRequisition',data);
};    

const ApiRequisition ={
    RequisitionApi,
    RequisitionListApi
}
   
 
export default ApiRequisition;
