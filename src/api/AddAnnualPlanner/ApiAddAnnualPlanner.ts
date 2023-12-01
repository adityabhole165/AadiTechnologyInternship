import http from "../../requests/SchoolService/schoolServices";
import {IAddAnnualPlannerBody,IGetFileDetailsBody,IGetFileDetailsResult,IDeleteFileDetailsBody} from "src/interfaces/AddAnnualPlanner/IAddAnnualPlanner"

const AddAnnualPlanner = (data:IAddAnnualPlannerBody) => {
    return http.post('Teacher/SaveYearwiseAnnualPlannerDetails',data);
};
const GetAnnualPlanner = (data:IGetFileDetailsBody) => {
    return http.post<IGetFileDetailsResult[]>('Teacher/GetFileDetails',data);
};

const DeleteAnnualPlanner = (data:IDeleteFileDetailsBody) => {
    return http.post('Teacher/DeleteFileDetails',data);
};
const AddAnnualPlannerApi ={
    AddAnnualPlanner,
    GetAnnualPlanner,
    DeleteAnnualPlanner
}


export default AddAnnualPlannerApi