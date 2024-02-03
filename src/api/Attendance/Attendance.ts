import {
  IAcademicYearData,
  IAttendance,
  IGetAcademicYearsForOldAttendanceBody,
  IGetAttendanceToppersBody,
  IGetAttendanceToppersResult
} from 'src/interfaces/Student/Attendance';
import http from '../../requests/SchoolService/schoolServices';

const Attendance = (data: IAttendance) => {
  return http.post<IAttendance>('Student/GetStudentAttendaceForMonth', data);
};
const AttendanceToppersApi = (data: IGetAttendanceToppersBody) => {
  return http.post<IGetAttendanceToppersResult>(
    'Student/GetAttendanceToppers',
    data
  );
};

const AcademicYearsForOldAttendanceApi = (
  data: IGetAcademicYearsForOldAttendanceBody
) => {
  return http.post<IAcademicYearData>(
    'Student/GetAcademicYearsForOldAttendance',
    data
  );
};
const AttendanceApi = {
  Attendance,
  AttendanceToppersApi,
  AcademicYearsForOldAttendanceApi
};

export default AttendanceApi;
