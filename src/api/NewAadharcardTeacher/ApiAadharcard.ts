import { IUpdateTeacherAadharDetailsBody, IDeleteAadharCardPhotoCopyBody, IGetUserDetailsForAadharCardNoBody, IGetUserDetailsForAadharCardNoResult } from "src/interfaces/NewAadharcardTeachers/IAadharcardTeacher";
import http from "../../requests/SchoolService/schoolServices";

const UpdateTeacherAadharDetailsApi = (data: IUpdateTeacherAadharDetailsBody) => {
    return http.post('Teacher/UpdateTeacherAadharDetails', data);
};
const DeleteAadharCardPhotoCopyapi = (data: IDeleteAadharCardPhotoCopyBody) => {
    return http.post('Teacher/DeleteAadharCardPhotoCopy', data);
};


const GetUserDetailsForAadharCardNoapi = (data: IGetUserDetailsForAadharCardNoBody) => {
    return http.post<IGetUserDetailsForAadharCardNoResult>('Teacher/GetUserDetailsForAadharCardNo', data);
};


const ApiAadharcard = {
    UpdateTeacherAadharDetailsApi,
    DeleteAadharCardPhotoCopyapi,
    GetUserDetailsForAadharCardNoapi
}
export default ApiAadharcard;
