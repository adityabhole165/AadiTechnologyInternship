import http from "../../requests/SchoolService/schoolServices";
import { IGetStudentNameBody ,IGetStudentNameResult,IGetCalendarForStudentBody,IGetCalendarForStudentResult,ISaveStudentAttendanceBody,ISaveStudentAttendanceResult } from "src/interfaces/IndividualAttendance/IIndividualAttendance"

const StudentNameList = (data: IGetStudentNameBody) => {
    return http.post<IGetStudentNameResult[]>('Teacher/GetStudentNameDropdown',data);
  };
  
  const Calendarforstudent = (data: IGetCalendarForStudentBody) => {
    return http.post<IGetCalendarForStudentResult[]>('Teacher/GetCalendarForStudent',data);
  };
  const SaveAttendance = (data: ISaveStudentAttendanceBody) => {
    return http.post<ISaveStudentAttendanceResult>('Teacher/SaveStudentAttendance',data);
  };
  const GetStudentNameapi={
    StudentNameList,
    Calendarforstudent,
    SaveAttendance
  }
  export default  GetStudentNameapi

