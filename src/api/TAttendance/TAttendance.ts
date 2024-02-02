import StandardAttendance, {
  GetStandardDivisionsResult
} from 'src/interfaces/Teacher/TAttendance';
import GetClassAttendance, {
  GetStudentDetailsResult,
  IDeleteAttendanceBody,
  IGetAttendanceStatus,
  IGetAttendanceStatusResult,
  IGetClassAttendanceResult,
  IGetClassTeachersBodynew,
  IGetClassTeachersResultnew,
  IGetStudentDetails,
  IGetSummaryCountforAttendanceBody,
  IGetSummaryCountforAttendanceResult,
  ISaveAttendance
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

const GetTAttendanceListApi = {
  GetStandardList,
  GetAttendanceData,
  GetStudentDetails,
  SaveStudentAttendanceDetails,
  GetAttendanceStatus,
  GetSummaryCountforAttendance,
  DeleteAttendance,
  ClassTeacherDropdownnew
};

export default GetTAttendanceListApi;
