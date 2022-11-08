import http from "../../requests/SchoolService/schoolServices";
import  {IUsergroup}  from "src/interfaces/AdminSMSCenter/To1";
import {IGetStudentsUser,GetUsersInGroupResult,GetStudentsUserResult} from "src/interfaces/AdminSMSCenter/To1"
import {GetAdminAndprincipalUsers,GetAdminAndprincipalUsersResult} from "src/interfaces/AdminSMSCenter/To1";

const GetUsersInGroup=(data:IUsergroup)=>{
    return http.post<GetUsersInGroupResult>('User/GetUsersInGroup',data);
}
const GetStudentGroup=(data:IGetStudentsUser)=>{
    return http.post<GetStudentsUserResult>('User/GetStudentsUser',data)
}
const GetGetAdminAndprincipalUsers=(data:GetAdminAndprincipalUsers)=>{
    return http.post<GetAdminAndprincipalUsersResult>('User/GetAdminAndprincipalUsers',data)
}
const getuserlistapi={
    GetUsersInGroup,
    GetStudentGroup,
    GetGetAdminAndprincipalUsers
}

export default getuserlistapi