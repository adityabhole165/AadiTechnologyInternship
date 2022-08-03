
import http from "../../requests/SchoolService/schoolServices";
import {IChangePassword,IChangePasswordResult,IAcceptTerms} from "src/interfaces/Common/ChangePassword";

const changepassword=(data:IChangePassword)=>{
    return http.post<IChangePassword>('School/ChangePassword',data);
}
const Terms=(data:IAcceptTerms)=>{
    return http.post<IChangePassword>('School/AcceptTerms',data); 
}
const ChangePasswordapi ={
    changepassword,
    Terms
}
export default ChangePasswordapi;