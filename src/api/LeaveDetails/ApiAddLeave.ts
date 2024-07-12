import { IGetLeaveBalanceBody, IGetLeaveBalanceResult, IGetLeaveTypeDropdownBody, IGetLeaveTypeDropdownResult } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
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

const AddLeaveDetailsAPI = {
    GetLeaveBalanceNote,
    GetLeaveTypeDropdown,
};


export default AddLeaveDetailsAPI;