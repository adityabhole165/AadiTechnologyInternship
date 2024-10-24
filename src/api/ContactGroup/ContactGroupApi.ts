import {
    IGetMailingGroupsBody,
    IGetMailingGroupsResult,
    IGetUserNameBody,
    IGetUserNameResult
} from 'src/interfaces/ContactGroup/IContactGroup';
import http from '../../requests/SchoolService/schoolServices';

const UserNameApi = (data: IGetUserNameBody) => {
    return http.post<IGetUserNameResult[]>('Teacher/GetUserName', data);
};
const GetMailingGroupsApi = (data: IGetMailingGroupsBody) => {
    return http.post<IGetMailingGroupsResult[]>('Teacher/GetMailingGroups', data);
};

const ContactGroupApi = {
    UserNameApi,
    GetMailingGroupsApi
};
export default ContactGroupApi;
