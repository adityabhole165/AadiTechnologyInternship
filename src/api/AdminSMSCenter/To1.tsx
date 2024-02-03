import {
  GetAdminAndprincipalUsers,
  GetAdminAndprincipalUsersResult,
  GetStudentsUserResult,
  GetUsersInGroupResult,
  IGetStudentsUser,
  IUsergroup
} from 'src/interfaces/AdminSMSCenter/To1';
import http from '../../requests/SchoolService/schoolServices';

import {
  IShowPTAOptionBody,
  IShowPTAOptionResult
} from 'src/interfaces/MessageCenter/MessageCenter';

const GetUsersInGroup = (data: IUsergroup) => {
  return http.post<GetUsersInGroupResult>('User/GetUsersInGroup', data);
};
const GetStudentGroup = (data: IGetStudentsUser) => {
  return http.post<GetStudentsUserResult>('User/GetStudentsUser', data);
};
const GetGetAdminAndprincipalUsers = (data: GetAdminAndprincipalUsers) => {
  return http.post<GetAdminAndprincipalUsersResult>(
    'User/GetAdminAndprincipalUsers',
    data
  );
};
const ShowPTAOption = (data: IShowPTAOptionBody) => {
  return http.post<IShowPTAOptionResult>('MessageCenter/ShowPTAOption', data);
};
const getuserlistapi = {
  GetUsersInGroup,
  GetStudentGroup,
  GetGetAdminAndprincipalUsers,
  ShowPTAOption
};

export default getuserlistapi;
