import { IGetAcademicYearBody, IGetAcademicYearResult, IGetCategoryDropdownBody, IGetCategoryDropdownResult, IGetDeleteLeaveBody, IGetLeaveDetailsListBody, IGetLeaveDetailsListResult, IGetStatusDropdownBody, IGetStatusDropdownResult, IGetViewLeaveBody, IGetViewLeaveResult } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import http from '../../requests/SchoolService/schoolServices';


const GetCategoryDropdown = (data: IGetCategoryDropdownBody) => {
    return http.post<IGetCategoryDropdownResult[]>(
        'Teacher/GetAllLeaveCategory',
        data
    );
};

const GetAcademicYearDropdown = (data: IGetAcademicYearBody) => {
    return http.post<IGetAcademicYearResult[]>('Teacher/GetSchoolwiseAcademicYearDetails', data);
};

const GetStatusDropdown = (data: IGetStatusDropdownBody) => {
    return http.post<IGetStatusDropdownResult[]>('Teacher/GetLeaveStatus', data);
};

const GetLeaveDetailsList = (data: IGetLeaveDetailsListBody) => {
    return http.post<IGetLeaveDetailsListResult[]>('Teacher/GetAllLeaveApprovalCatgories', data);
};
const GetViewLeaveDetails = (data: IGetViewLeaveBody) => {
    return http.post<IGetViewLeaveResult[]>('Teacher/GetLeaveCategoryDetails', data);
}
const GetDeleteLeaveDetails = (data: IGetDeleteLeaveBody) => {
    return http.post<string>('Teacher/DeleteLeaveApprovalCatgories', data);
};


const LeaveDetailsAPI = {
    GetCategoryDropdown,
    GetAcademicYearDropdown,
    GetStatusDropdown,
    GetDeleteLeaveDetails,
    GetViewLeaveDetails,
    GetLeaveDetailsList
};




export default LeaveDetailsAPI;