import {
  IGetCalendarForStudentBody,
  IGetCalendarForStudentResult,
  IGetStudentNameBody,
  IGetStudentNameResult,
  ISaveStudentAttendanceBody,
  ISaveStudentAttendanceResult
} from 'src/interfaces/IndividualAttendance/IIndividualAttendance';
import http from '../../requests/SchoolService/schoolServices';

const StudentNameList = (data: IGetStudentNameBody) => {
  return http.post<IGetStudentNameResult>(
    'School/GetStudentListForDropDownList',
    data
  );
};

const Calendarforstudent = (data: IGetCalendarForStudentBody) => {
  return http.post<IGetCalendarForStudentResult[]>(
    'Teacher/GetCalendarForStudent',
    data
  );
};
const SaveAttendance = (data: ISaveStudentAttendanceBody) => {
  return http.post<ISaveStudentAttendanceResult>(
    'Teacher/SaveStudentAttendance',
    data
  );
};
const GetStudentNameapi = {
  StudentNameList,
  Calendarforstudent,
  SaveAttendance
};
export default GetStudentNameapi;
