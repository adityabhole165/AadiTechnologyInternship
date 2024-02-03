import {
  IGetSchoolAttendanceOverviewBody,
  IGetSchoolAttendanceOverviewList
} from 'src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview';
import http from '../../requests/SchoolService/schoolServices';

const SchoolAttendanceOverview = (data: IGetSchoolAttendanceOverviewBody) => {
  return http.post<IGetSchoolAttendanceOverviewList>(
    'Teacher/GetSchoolAttendanceOverView',
    data
  );
};

const SchoolAttendanceOverviewApi = {
  SchoolAttendanceOverview
};

export default SchoolAttendanceOverviewApi;
