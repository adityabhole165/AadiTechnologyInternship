import {
  IGetUpcomingStaffBdayList,
  IGetUpcomingStaffBdayListBody
} from 'src/interfaces/Student/IBirthdays';
import http from '../../requests/SchoolService/schoolServices';

const Birthdaysapi = (data: IGetUpcomingStaffBdayListBody) => {
  return http.post<IGetUpcomingStaffBdayList>(
    'Dashboard/GetUpcomingStaffBdayList',
    data
  );
};
const ApiBirthdays = {
  Birthdaysapi
};
export default ApiBirthdays;
