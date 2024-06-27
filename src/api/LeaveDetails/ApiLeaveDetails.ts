import { IGetCategoryDropdownBody, IGetCategoryDropdownResult, IGetDeleteLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import http from '../../requests/SchoolService/schoolServices';


const GetCategoryDropdown = (data: IGetCategoryDropdownBody) => {
    return http.post<IGetCategoryDropdownResult[]>(
        'Teacher/GetAllLeaveCategory',
        data
    );
};

const GetDeleteLeaveDetails = (data: IGetDeleteLeaveBody) => {
    return http.post<string>('Teacher/DeleteLeaveApprovalCatgories', data);
};


const LeaveDetailsAPI = {
    GetCategoryDropdown,
    GetDeleteLeaveDetails
  };
  
  
  
  
  export default LeaveDetailsAPI;