import http from "../../requests/SchoolService/schoolServices";
import OnlineExamProgressReport,{ OnlineExamResult } from "../../interfaces/Student/OnlineExamProgressReport"

  const getOnlineExamProgressReport = (data: OnlineExamProgressReport) => {
    return http.post<OnlineExamResult>('Student/GetOnlineExamProgressReportDetails',data);
    
  };
  
const OnlineExamProgressReportapi ={
    getOnlineExamProgressReport
}

export default OnlineExamProgressReportapi;