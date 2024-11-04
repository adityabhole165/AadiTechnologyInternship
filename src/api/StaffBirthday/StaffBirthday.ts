import { default as IstaffBirthday, default as IstaffBirthdayBody } from '../../interfaces/Common/StaffBirthday';
import http from '../../requests/SchoolService/schoolServices';

const GetstaffBirthdayList = (data: IstaffBirthday) => {
  return http.post<IstaffBirthday>('Teacher/GetStaffBirthdaysList', data);
};

const GetSchoolStaffBirthday = (data: IstaffBirthdayBody) => {
  return http.post<IstaffBirthday>('AdminStaff/GetSchoolStaffBirthday', data);
};
const staffBirthdayApi = {
  GetstaffBirthdayList,
  GetSchoolStaffBirthday
};

export default staffBirthdayApi;
