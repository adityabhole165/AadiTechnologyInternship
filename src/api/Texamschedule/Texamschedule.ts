import IGetAllStandards, {
  GetExamsListResult,
  GetStandardListResult,
  IGetExamScheduleBody,
  IGetExamScheduleResult,
  IGetExamsList
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

const GetTExamResultListApi = {
  GetAllStandards,
  GetExamsList,
  GetExamScheduleFullAcc
};

export default GetTExamResultListApi;

