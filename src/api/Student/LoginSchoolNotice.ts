import http from "../../Client_Api/SchoolService/schoolServices";
import ISchoolnotice from "src/Interface/Student/LoginSchoolNotice";
import IViewschoolnotice from "src/Interface/Student/LoginViewSchoolNotice"

const GetLoginSchoolNoticeList = (data: ISchoolnotice) => {
  return http.post<ISchoolnotice>('School/GetSchoolNotices', data);

};

const ViewLoginSchoolNoticeList = (data: IViewschoolnotice) => {
  return http.post<IViewschoolnotice>('School/GetSchoolNotices', data);

};

const LoginSchoolNoticeApi = {
  GetLoginSchoolNoticeList,
  ViewLoginSchoolNoticeList,
}

export default LoginSchoolNoticeApi;