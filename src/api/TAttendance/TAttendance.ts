import StandardAttendance, {
  GetStandardDivisionsResult
} from 'src/interfaces/Teacher/TAttendance';
import GetClassAttendance, {
  GetStudentDetailsResult,
  IDeleteAttendanceBody,
  IGetAcademicDatesForStandardDivisionBody,
  IGetAcademicDatesForStandardDivisionResult,
  IGetAttendanceStatus,
  IGetAttendanceStatusResult,
  IGetClassAttendanceResult,
  IGetClassTeachersBodynew,
  IGetClassTeachersResultnew,
  IGetStudentDetails,
  IGetSummaryCountforAttendanceBody,
  IGetSummaryCountforAttendanceResult,
  ISaveAttendance,
  ISaveStudentAttendenceBody
} from 'src/interfaces/Teacher/TAttendanceList';

import http from '../../requests/SchoolService/schoolServices';

const GetStandardList = (data: StandardAttendance) => {
  return http.post<GetStandardDivisionsResult>(
    'Teacher/GetStandardDivisions',
    data
  );
};

const GetAttendanceData = (data: GetClassAttendance) => {
  return http.post<IGetClassAttendanceResult[]>(
    'Teacher/GetClassAttendance',
    data
  );
};

const GetStudentDetails = (data: IGetStudentDetails) => {
  return http.post<GetStudentDetailsResult[]>(
    'Teacher/GetStudentDetails',
    data
  );
};

const SaveStudentAttendanceDetails = (data: ISaveAttendance) => {
  return http.post<ISaveAttendance>(
    'Teacher/SaveStudentAttendanceDetails',
    data
  );
};
const SaveStudentAttendence = (data: ISaveStudentAttendenceBody) => {
  return http.post<string>(
    'Teacher/SaveStudentAttendence',
    data
  );
};

const GetAttendanceStatus = (data: IGetAttendanceStatus) => {
  return http.post<IGetAttendanceStatusResult[]>(
    'Teacher/GetAttendanceStatus',
    data
  );
};

const GetSummaryCountforAttendance = (
  data: IGetSummaryCountforAttendanceBody
) => {
  return http.post<IGetSummaryCountforAttendanceResult>(
    'Teacher/GetSummaryCountforAttendance',
    data
  );
};

const DeleteAttendance = (data: IDeleteAttendanceBody) => {
  return http.post<''>('Teacher/DeleteAttendance', data);
};

const ClassTeacherDropdownnew = (data: IGetClassTeachersBodynew) => {
  return http.post<IGetClassTeachersResultnew[]>(
    'Teacher/GetAllPrimaryClassTeacherss',
    data
  );
};

const GetAcademicDatesForStandardDivision = (data: IGetAcademicDatesForStandardDivisionBody) => {
  return http.post<IGetAcademicDatesForStandardDivisionResult>(
    'Teacher/GetAcademicDatesForStandardDivision',
    data
  );
};

const GetTAttendanceListApi = {
  GetStandardList,
  GetAttendanceData,
  GetStudentDetails,
  SaveStudentAttendanceDetails,
  SaveStudentAttendence,
  GetAttendanceStatus,
  GetSummaryCountforAttendance,
  DeleteAttendance,
  ClassTeacherDropdownnew,
  GetAcademicDatesForStandardDivision
};

export default GetTAttendanceListApi;
