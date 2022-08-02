import http from "../../requests/SchoolService/schoolServices";
import OnlineExamProgressReport from "../../interfaces/Student/OnlineExamProgressReport"

  const getOnlineExamProgressReport = (data: OnlineExamProgressReport) => {
    return http.post<OnlineExamProgressReport>('Student/GetOnlineExamProgressReportDetails',data);
    
  };
  
const OnlineExamProgressReportapi ={
    getOnlineExamProgressReport
}

export default OnlineExamProgressReportapi;