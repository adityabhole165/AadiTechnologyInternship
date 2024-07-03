import { IGetDataForAdditionalClassesBody, IGetDataForAdditionalClassesResult, IGetLectureCountsForTeachersBody, IGetLectureCountsForTeachersResult, IGetTeacherTimeTableBody, IGetTeacherTimeTableResult } from 'src/interfaces/Teacher/ITeacherTimeTable';
import IWdays, { ItimeTable } from '../../interfaces/Student/Tmtimetable';
import http from '../../requests/SchoolService/schoolServices';

const GetWeekdays = (data: IWdays) => {
  return http.post<IWdays>('School/GetWeekDays', data);
};

const GetTimetable = (data: ItimeTable) => {
  return http.post<ItimeTable>('Student/GetTimeTable', data);
};

const GetTimeTableDisplayForTeacher = (data: IGetTeacherTimeTableBody) => {
  return http.post<IGetTeacherTimeTableResult>('Teacher/GetTimeTableDisplayForTeacher', data);
}

const GetLectureCountsForTeachers = (data: IGetLectureCountsForTeachersBody) => {
  return http.post<IGetLectureCountsForTeachersResult[]>('Teacher/GetLectureCountsForTeachers', data);
}

const GetDataForAdditionalClasses = (data: IGetDataForAdditionalClassesBody) => {
  return http.post<IGetDataForAdditionalClassesResult>('Teacher/GetDataForAdditionalClasses', data);
}




const WeekdayApi = {
  GetWeekdays,
  GetTimetable,
  GetTimeTableDisplayForTeacher,
  GetLectureCountsForTeachers,
  GetDataForAdditionalClasses
};

export default WeekdayApi;
