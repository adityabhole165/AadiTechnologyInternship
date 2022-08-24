import http from "../../requests/SchoolService/schoolServices";
import ISchoolnotice from "src/interfaces/Student/LoginSchoolNotice";
import IViewschoolnotice from "src/interfaces/Student/LoginViewSchoolNotice"

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