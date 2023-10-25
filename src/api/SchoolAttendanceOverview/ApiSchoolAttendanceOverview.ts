import http from "../../requests/SchoolService/schoolServices";
import {IGetSchoolAttendanceOverviewBody , IGetSchoolAttendanceOverviewList } from "src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview" ;


const  SchoolAttendanceOverview = (data: IGetSchoolAttendanceOverviewBody) => {
    return http.post<IGetSchoolAttendanceOverviewList>('Teacher/GetSchoolAttendanceOverView',data);
};


const SchoolAttendanceOverviewApi={
    SchoolAttendanceOverview
}

export default SchoolAttendanceOverviewApi;

