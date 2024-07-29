
import { IDeleteSchooNoticeBody, IEditSchoolNoticeDetailsBody, IEditSchoolNoticeDetailsResult, IGetAllNoticeListBody, IGetAllNoticeListResult, IUpdateSelectSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import http from '../../requests/SchoolService/schoolServices';


const GetAllNoticeList = (data: IGetAllNoticeListBody) => {
  return http.post<IGetAllNoticeListResult[]>(
    'Teacher/GetAllNoticeList',
    data
  );
};

const UpdateSelectSchoolNotice = (data: IUpdateSelectSchoolNoticeBody) => {
  return http.post<string>(
    'Teacher/UpdateSelectedSchoolNotices',
    data
  );
};
const DeleteSchoolNotice = (data: IDeleteSchooNoticeBody) => {
  return http.post<string>(
    'Teacher/DeleteSchoolNotice',
    data
  );
};

const EditSchoolNoticeDetails = (data: IEditSchoolNoticeDetailsBody) => {
  return http.post<IEditSchoolNoticeDetailsResult>(
    'Teacher/EditSchoolNoticeDetails',
    data
  );
};


const AddSchoolNoticApi = {
  GetAllNoticeList,
  UpdateSelectSchoolNotice,
  DeleteSchoolNotice,
  EditSchoolNoticeDetails
};

export default AddSchoolNoticApi;
