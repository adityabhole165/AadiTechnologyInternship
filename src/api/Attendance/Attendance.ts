import http from "../../requests/SchoolService/schoolServices";
import { IAttendance } from "src/interfaces/Student/Attendance";


const Attendance =(data:IAttendance)=>{
    return http.post<IAttendance>('Student/GetStudentAttendaceForMonth',data);
};

const AttendanceApi={
    Attendance
}

export default AttendanceApi
