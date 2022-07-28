import http from "../../Client_Api/SchoolService/schoolServices";
import { IAttendance } from "src/Interface/Student/Attendance";


const Attendance =(data:IAttendance)=>{
    return http.post<IAttendance>('Student/GetStudentAttendaceForMonth',data);
};

const AttendanceApi={
    Attendance
}

export default AttendanceApi
