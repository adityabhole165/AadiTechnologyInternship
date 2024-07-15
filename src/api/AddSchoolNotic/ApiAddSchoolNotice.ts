
import { IAddNoticeBody, IDeleteSchooNoticeBody, IEditSchoolNoticeDetailsBody, IGetAllClassesAndDivisionsBody, IGetAllNoticeListBody, IGetAllNoticeListResult, IGetStandardDivisionsForSelectedNoticeIdBody, IGetUserRolesForSelectedNoticeIdBody, ISaveUpdateSchoolNoticeBody, IUpdateSelectSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import http from '../../requests/SchoolService/schoolServices';


const GetAllNoticeList = (data: IGetAllNoticeListBody) => {
  return http.post<IGetAllNoticeListResult[]>(
    'Teacher/GetAllNoticeList',
    data
  );
};

const UpdeteSelecteSchoolNotice = (data: IUpdateSelectSchoolNoticeBody) => {
  return http.post<IUpdateSelectSchoolNoticeBody[]>(
    'Teacher/UpdateSelectedSchoolNotices',
    data
  );
};
const DeleteSchoolNotice = (data: IDeleteSchooNoticeBody) => {
  return http.post<IDeleteSchooNoticeBody[]>(
    'Teacher/DeleteSchoolNotice',
    data
  );
};
const AddNotice = (data: IAddNoticeBody) => {
  return http.post<IAddNoticeBody[]>(
    'Teacher/DeleteSchoolNotice',
    data
  );
};
const GetAllClassesAndDivisions = (data: IGetAllClassesAndDivisionsBody) => {
  return http.post<IGetAllClassesAndDivisionsBody[]>(
    'Teacher/GetAllClassesAndDivisions',
    data
  );
};
const GetUserRolesForSelectedNoticeId = (data: IGetUserRolesForSelectedNoticeIdBody) => {
  return http.post<IGetAllClassesAndDivisionsBody[]>(
    'Teacher/GetUserRolesForSelectedNoticeId',
    data
  );
};
const GetStandardDivisionsForSelectedNoticeId = (data: IGetStandardDivisionsForSelectedNoticeIdBody) => {
  return http.post<IGetStandardDivisionsForSelectedNoticeIdBody[]>(
    'Teacher/GetStandardDivisionsForSelectedNoticeId',
    data
  );
};
const SaveUpdateSchoolNotice = (data: ISaveUpdateSchoolNoticeBody) => {
  return http.post<ISaveUpdateSchoolNoticeBody[]>(
    'Teacher/SaveUpdateSchoolNotices',
    data
  );
};
const EditSchoolNoticeDetails = (data: IEditSchoolNoticeDetailsBody) => {
  return http.post<IEditSchoolNoticeDetailsBody[]>(
    'Teacher/EditSchoolNoticeDetails',
    data
  );
};


const AddSchoolNoticApi = {
  GetAllNoticeList,
  UpdeteSelecteSchoolNotice,
  DeleteSchoolNotice,
  AddNotice,
  GetAllClassesAndDivisions,
  GetUserRolesForSelectedNoticeId,
  GetStandardDivisionsForSelectedNoticeId,
  SaveUpdateSchoolNotice,
  EditSchoolNoticeDetails
};

export default AddSchoolNoticApi;
