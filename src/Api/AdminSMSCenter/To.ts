import http from "../../Client_Api/SchoolService/schoolServices";
import  {IUsergroup}  from "src/Interface/AdminSMSCenter/To";
import {IGetStudentsUser} from "src/Interface/AdminSMSCenter/To"
import {GetAdminAndprincipalUsers} from "src/Interface/AdminSMSCenter/To";

const GetUsersInGroup=(data:IUsergroup)=>{
    return http.post<IUsergroup>('User/GetUsersInGroup',data);
}
const GetStudentGroup=(data:IGetStudentsUser)=>{
    return http.post<IGetStudentsUser>('User/GetStudentsUser',data)
}
const GetGetAdminAndprincipalUsers=(data:GetAdminAndprincipalUsers)=>{
    return http.post<GetAdminAndprincipalUsers>('User/GetAdminAndprincipalUsers',data)
}
const getuserlistapi={
    GetUsersInGroup,
    GetStudentGroup,
    GetGetAdminAndprincipalUsers
}

export default getuserlistapi
