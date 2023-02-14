import http from "../../requests/SchoolService/schoolServices";
import IOnlineTest, {GetQuestionsForOnlineExamResult, IOnlineTestSubject,IOnlineExamQuestions,IExamData } from "../../interfaces/Student/OnlineExam"

  const GetOnlineExamList = (data: IOnlineTest) => {
    return http.post<IOnlineTest>('Student/GetAllTestsForStudent',data);
    
  };

  const GetOnlineExamSubjectList = (data: IOnlineTestSubject) => {
    return http.post<IOnlineTestSubject>('Student/AllSubjectsForExam',data);
    
  };

  const GetOnlineExamQuestionsDetail = (data: IOnlineExamQuestions) => {
    return http.post<GetQuestionsForOnlineExamResult>('Student/GetQuestionsForOnlineExam',data);
  };
  const AllExamData = (data: IExamData) => {
    return http.post('Student/GetQuestionsForOnlineExam',data);
  }; 
  
const GetOnlineExamListApi ={
    GetOnlineExamList,
    GetOnlineExamSubjectList,
    GetOnlineExamQuestionsDetail,
    AllExamData
}

export default GetOnlineExamListApi;