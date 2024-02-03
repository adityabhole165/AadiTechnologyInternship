import IViewschoolnotice from 'src/interfaces/Student/ViewSchoolNotice';
import ISchoolnotice from '../../interfaces/Common/SchoolNotice';
import http from '../../requests/SchoolService/schoolServices';

const GetSchoolNoticeList = (data: ISchoolnotice) => {
  return http.post<ISchoolnotice>('School/GetSchoolNotices', data);
};

const ViewSchoolNoticeList = (data: IViewschoolnotice) => {
  return http.post<IViewschoolnotice>('School/GetSchoolNotices', data);
};
const SchoolNoticeApi = {
  GetSchoolNoticeList,
  ViewSchoolNoticeList
};

export default SchoolNoticeApi;
