import OnlineExamProgressReport, {
  OnlineExamResult
} from '../../interfaces/Student/OnlineExamProgressReport';
import http from '../../requests/SchoolService/schoolServices';

const getOnlineExamProgressReport = (data: OnlineExamProgressReport) => {
  return http.post<OnlineExamResult>(
    'Student/GetOnlineExamProgressReportDetails',
    data
  );
};

const OnlineExamProgressReportapi = {
  getOnlineExamProgressReport
};

export default OnlineExamProgressReportapi;
