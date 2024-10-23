
import { ICheckIfPersonalAddressExistsBody, ICheckIfPersonalAddressGroupAlreadyExistsBody, IDeletePersonalAddressBookBody, IDeletePersonalAddressBookGroupBody, IGetAddressBookGroupDetailsBody, IGetAddressBookGroupDetailsResult, IGetAddressBookGroupListBody, IGetAddressBookGroupListResult, IGetAddressBookListBody, IGetAddressBookListResult, IGetSentItemsBody, IGetSentItemsResult, IInsertPersonalAddressBookBody, IInsertPersonalAddressBookGroupBody, IUpdatePersonalAddressBookBody, IUpdatePersonalAddressBookGroupBody } from 'src/interfaces/SentSms/Sentsms';
import http from '../../requests/SchoolService/schoolServices';

const GetSentItemsapi = (data: IGetSentItemsBody) => {
  return http.post<IGetSentItemsResult[]>(
    'Teacher/GetSentItems',
    data
  );
};
// Teacher/GetAddressBookList
const GetAddressBookListapi = (data: IGetAddressBookListBody) => {
  return http.post<IGetAddressBookListResult[]>(
    'Teacher/GetAddressBookList',
    data
  );
};

// Teacher/CheckIfPersonalAddressExists
const CheckIfPersonalAddressExistsapi = (data: ICheckIfPersonalAddressExistsBody) => {
  return http.post<string>(
    'Teacher/CheckIfPersonalAddressExists',
    data
  );
};
// Teacher/InsertPersonalAddressBook
const InsertPersonalAddressBookapi = (data: IInsertPersonalAddressBookBody) => {
  return http.post<string>(
    'Teacher/InsertPersonalAddressBook',
    data
  );
};
// IDeletePersonalAddressBookBody
const DeletePersonalAddressBookapi = (data: IDeletePersonalAddressBookBody) => {
  return http.post<string>(
    'Teacher/DeletePersonalAddressBook',
    data
  );
};

// UpdatePersonalAddressBook
const UpdatePersonalAddressBookapi = (data: IUpdatePersonalAddressBookBody) => {
  return http.post<string>(
    'Teacher/UpdatePersonalAddressBook',
    data
  );
};
// GetAddressBookGroupList
const GetAddressBookGroupListapi = (data: IGetAddressBookGroupListBody) => {
  return http.post<IGetAddressBookGroupListResult[]>(
    'Teacher/GetAddressBookGroupList',
    data
  );
};
// Teacher/GetAddressBookGroupDetails
const GetAddressBookGroupDetailsapi = (data: IGetAddressBookGroupDetailsBody) => {
  return http.post<IGetAddressBookGroupDetailsResult[]>(
    'Teacher/GetAddressBookGroupDetails',
    data
  );
};
// /Teacher/CheckIfPersonalAddressGroupAlreadyExists
const CheckIfPersonalAddressGroupAlreadyExistsapi = (data: ICheckIfPersonalAddressGroupAlreadyExistsBody) => {
  return http.post<string>(
    'Teacher/CheckIfPersonalAddressGroupAlreadyExists',
    data
  );
};
//  Teacher/InsertPersonalAddressBookGroup
const InsertPersonalAddressBookGroupapi = (data: IInsertPersonalAddressBookGroupBody) => {
  return http.post<string>(
    'Teacher/InsertPersonalAddressBookGroup',
    data
  );
};
// Teacher/UpdatePersonalAddressBookGroup 
const UpdatePersonalAddressBookGroupapi = (data: IUpdatePersonalAddressBookGroupBody) => {
  return http.post<string>(
    'Teacher/UpdatePersonalAddressBookGroup',
    data
  );
};
// IDeletePersonalAddressBookGroupBody Teacher/DeletePersonalAddressBookGroup
const DeletePersonalAddressBookGroupapi = (data: IDeletePersonalAddressBookGroupBody) => {
  return http.post<string>(
    'Teacher/DeletePersonalAddressBookGroup',
    data
  );
};


const ApiSentsms = {
  GetSentItemsapi,
  GetAddressBookListapi,
  CheckIfPersonalAddressExistsapi,
  InsertPersonalAddressBookapi,
  DeletePersonalAddressBookapi,
  UpdatePersonalAddressBookapi,
  GetAddressBookGroupListapi,
  GetAddressBookGroupDetailsapi,
  CheckIfPersonalAddressGroupAlreadyExistsapi,
  InsertPersonalAddressBookGroupapi,
  UpdatePersonalAddressBookGroupapi,
  DeletePersonalAddressBookGroupapi
};

export default ApiSentsms;
