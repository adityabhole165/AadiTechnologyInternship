import { IGetLeaveBalanceBody, IGetLeaveBalanceResult } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
import http from '../../requests/SchoolService/schoolServices';


const GetLeaveBalanceNote = (data: IGetLeaveBalanceBody) => {
    return http.post<IGetLeaveBalanceResult[]>(
        'Teacher/GetLeaveBalance',
        data
    );
};


const AddLeaveDetailsAPI = {
    GetLeaveBalanceNote,
};


export default AddLeaveDetailsAPI;