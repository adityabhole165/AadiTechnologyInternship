import http from "../../requests/SchoolService/schoolServices";
import { IGetUpcomingStaffBdayListBody, IGetUpcomingStaffBdayList} from "src/interfaces/Student/IBirthdays"

const Birthdaysapi = (data: IGetUpcomingStaffBdayListBody) => {
    return http.post<IGetUpcomingStaffBdayList>('Dashboard/GetUpcomingStaffBdayList',data);
  };
  const ApiBirthdays ={
    Birthdaysapi
  }
  export default ApiBirthdays;