import {
    IAddUpdateGroupBody,
    IAddUpdateGroupResult,
    IDeleteMailGroupBody,
    IDeleteMailingGroupUserBody,
    IGetContactGroupsBody,
    IGetContactGroupsResult,
    IGetStandardClassBody,
    IGetStandardClassResult,
    IGetUserNameBody,
    IGetUserNameResult,
    IGetUserRoleBody,
    IGetUserRoleResult,
    IGetUsersBody,
    IGetUsersResult
} from 'src/interfaces/ContactGroup/IContactGroup';
import http from '../../requests/SchoolService/schoolServices';

// const UserNameApi = (data: IGetUserNameBody) => {
//     return http.post<IGetUserNameResult[]>('Teacher/GetUserName', data);
// };

const UserNameApi = (data: IGetUserNameBody) => {
    return http.post<IGetUserNameResult>('Teacher/GetUserName', data);
};

const GetContactGroupApi = (data: IGetContactGroupsBody) => {
    return http.post<IGetContactGroupsResult>('Messagecenter/GetContactGroups', data);
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
const GetUsersApi = (data: IGetUsersBody) => {
    return http.post<IGetUsersResult[]>('Teacher/GetUsers', data);
};

const ContactGroupApi = {
    UserNameApi,
    GetContactGroupApi,
    GetUserRoleApi,
    GetStandardClassApi,
    AddUpdateGroupApi,
    DeleteGroupApi,
    DeleteMailingGroupUserApi,
    GetUsersApi
};
export default ContactGroupApi;
