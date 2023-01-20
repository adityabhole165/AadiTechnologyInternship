import http from "../../requests/SchoolService/schoolServices";
import { IGetUpcomingStaffBdayListBody, IGetUpcomingStaffBdayListResult} from "src/interfaces/Student/IBirthdays"

const Birthdaysapi = (data: IGetUpcomingStaffBdayListBody) => {
    return http.post<IGetUpcomingStaffBdayListResult>('Dashboard/GetUpcomingStaffBdayList',data);
  };
  const ApiBirthdays ={
    Birthdaysapi
  }
  export default ApiBirthdays;