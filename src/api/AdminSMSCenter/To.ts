import {
  GetAdminAndprincipalUsers,
  IGetStudentsUser,
  IUsergroup
} from 'src/interfaces/AdminSMSCenter/To';
import http from '../../requests/SchoolService/schoolServices';

const GetUsersInGroup = (data: IUsergroup) => {
  return http.post<IUsergroup>('User/GetUsersInGroup', data);
};
const GetStudentGroup = (data: IGetStudentsUser) => {
  return http.post<IGetStudentsUser>('User/GetStudentsUser', data);
};
const GetGetAdminAndprincipalUsers = (data: GetAdminAndprincipalUsers) => {
  return http.post<GetAdminAndprincipalUsers>(
    'User/GetAdminAndprincipalUsers',
    data
  );
};
const getuserlistapi = {
  GetUsersInGroup,
  GetStudentGroup,
  GetGetAdminAndprincipalUsers
};

export default getuserlistapi;
