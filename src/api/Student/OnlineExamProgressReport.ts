import http from "../../Client_Api/SchoolService/schoolServices";
import OnlineExamProgressReport from "../../Interface/Student/OnlineExamProgressReport"

  const getOnlineExamProgressReport = (data: OnlineExamProgressReport) => {
    return http.post<OnlineExamProgressReport>('Student/GetOnlineExamProgressReportDetails',data);
    
  };
  
const OnlineExamProgressReportapi ={
    getOnlineExamProgressReport
}

export default OnlineExamProgressReportapi;