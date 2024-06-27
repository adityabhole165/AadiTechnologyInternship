import IGetAllStandards, {
  GetStandardListResult,
  IGetExamsList,
  GetExamsListResult
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

const GetTExamResultListApi = {
  GetAllStandards,
  GetExamsList
};

export default GetTExamResultListApi;

