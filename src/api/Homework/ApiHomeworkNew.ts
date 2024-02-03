import {
  HomeworkDailyLogsBody,
  HomeworkDailyResult,
  IGetDatewiseHomeworkDetailsBody,
  IGetDatewiseHomeworkDetailsResult
} from 'src/interfaces/Student/IHomeworkNew';
import http from '../../requests/SchoolService/schoolServices';

const GetDatewiseHomeworkDetails = (data: IGetDatewiseHomeworkDetailsBody) => {
  return http.post<IGetDatewiseHomeworkDetailsResult>(
    'Student/GetDatewiseHomeworkDetails',
    data
  );
};

const GetHomeworkDailyLogs = (data: HomeworkDailyLogsBody) => {
  return http.post<HomeworkDailyResult>(
    'Student/GetStudentDailyLogDetails',
    data
  );
};

const ApiHomework = {
  GetDatewiseHomeworkDetails,
  GetHomeworkDailyLogs
};

export default ApiHomework;
