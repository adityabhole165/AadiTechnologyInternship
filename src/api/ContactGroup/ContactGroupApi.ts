import {
    IAddUpdateGroupBody,
    IAddUpdateGroupResult,
    IDeleteMailGroupBody,
    IDeleteMailingGroupUserBody,
    IGetMailingGroupsBody,
    IGetMailingGroupsResult,
    IGetStandardClassBody,
    IGetStandardClassResult,
    IGetUserNameBody,
    IGetUserNameResult,
    IGetUserRoleBody,
    IGetUserRoleResult
} from 'src/interfaces/ContactGroup/IContactGroup';
import http from '../../requests/SchoolService/schoolServices';

// const UserNameApi = (data: IGetUserNameBody) => {
//     return http.post<IGetUserNameResult[]>('Teacher/GetUserName', data);
// };

const UserNameApi = (data: IGetUserNameBody) => {
    return http.post<IGetUserNameResult>('Teacher/GetUserName', data);
};

const GetMailingGroupsApi = (data: IGetMailingGroupsBody) => {
    return http.post<IGetMailingGroupsResult[]>('Teacher/GetMailingGroups', data);
};
const GetUserRoleApi = (data: IGetUserRoleBody) => {
    return http.post<IGetUserRoleResult[]>('Teacher/GetUserRole', data);
};
const GetStandardClassApi = (data: IGetStandardClassBody) => {
    return http.post<IGetStandardClassResult[]>('Teacher/GetStandardClass', data);
}
const AddUpdateGroupApi = (data: IAddUpdateGroupBody) => {
    return http.post<IAddUpdateGroupResult>('Teacher/AddUpdateGroup', data);
}
const DeleteGroupApi = (data: IDeleteMailGroupBody) => {
    return http.post<string>('Teacher/DeleteMailGroup', data);
};
const DeleteMailingGroupUserApi = (data: IDeleteMailingGroupUserBody) => {
    return http.post<string>('Teacher/DeleteMailingGroupUser', data);
};

const ContactGroupApi = {
    UserNameApi,
    GetMailingGroupsApi,
    GetUserRoleApi,
    GetStandardClassApi,
    AddUpdateGroupApi,
    DeleteGroupApi,
    DeleteMailingGroupUserApi
};
export default ContactGroupApi;
