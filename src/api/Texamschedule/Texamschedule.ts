import IGetAllStandards, {
  GetExamsListResult,
  GetStandardListResult,
  IGetExamScheduleBody,
  IGetExamScheduleResult,
  IGetExamsList,
  IGetSubjectExamScheduleBody,
  IGetSubjectExamScheduleResult
} from 'src/interfaces/Teacher/TExamSchedule';
import http from '../../requests/SchoolService/schoolServices';

const GetAllStandards = (data: IGetAllStandards) => {
  return http.post<GetStandardListResult>('School/GetAllStandards', data);
};


const GetExamsList = (data: IGetExamsList) => {
  return http.post<GetExamsListResult>(
    'Teacher/GetExamScheduleForAllStandard',
    data
  );
};

const GetExamScheduleFullAcc = (data: IGetExamScheduleBody) => {
  return http.post<IGetExamScheduleResult>('School/GetExamScheduleFullacc', data);
};
const GetSubjectExamScheduleList = (data: IGetSubjectExamScheduleBody) => {
  return http.post<IGetSubjectExamScheduleResult>('School/getSubjectExamScheduleList', data);
};

const GetTExamResultListApi = {
  GetAllStandards,
  GetExamsList,
  GetExamScheduleFullAcc,
  GetSubjectExamScheduleList
};

export default GetTExamResultListApi;

