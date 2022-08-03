import http from "../../requests/SchoolService/schoolServices";
import  {IUsergroup}  from "src/interfaces/AdminSMSCenter/To";
import {IGetStudentsUser} from "src/interfaces/AdminSMSCenter/To"
import {GetAdminAndprincipalUsers} from "src/interfaces/AdminSMSCenter/To";

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
