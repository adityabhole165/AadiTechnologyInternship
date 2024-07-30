import { IGetApproveOrRejectLeaveBody, IGetIsValidateLeaveDateBody, IGetLeaveBalanceBody, IGetLeaveBalanceResult, IGetLeaveTypeDropdownBody, IGetLeaveTypeDropdownResult, IGetSubmitLeaveBody } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
import http from '../../requests/SchoolService/schoolServices';


const GetLeaveBalanceNote = (data: IGetLeaveBalanceBody) => {
    return http.post<IGetLeaveBalanceResult[]>(
        'Teacher/GetLeaveBalance',
        data
    );
};
const GetLeaveTypeDropdown = (data: IGetLeaveTypeDropdownBody) => {
    return http.post<IGetLeaveTypeDropdownResult[]>('Teacher/GetConfiguredLeavesType', data);
};
const SubmitLeave = (data: IGetSubmitLeaveBody) => {
    return http.post<string>('Teacher/SubmitLeaveBtn', data);
}
const GetStartDateEndDateValidation = (data: IGetIsValidateLeaveDateBody) => {
    return http.post<boolean>('Teacher/IsValidateLeaveDateOverlapping', data);

};
const ApproveOrRejectLeave = (data: IGetApproveOrRejectLeaveBody) => {
    return http.post<string>('Teacher/ApproveOrRejectLeave', data);
}
const AddLeaveDetailsAPI = {
    GetLeaveBalanceNote,
    GetLeaveTypeDropdown,
    SubmitLeave,
    GetStartDateEndDateValidation,
    ApproveOrRejectLeave
};


export default AddLeaveDetailsAPI;