import http from "../../Client_Api/SchoolService/schoolServices";
import IOnlineTest, { IOnlineTestSubject,IOnlineExamQuestions } from "../../Interface/Student/OnlineExam"

  const GetOnlineExamList = (data: IOnlineTest) => {
    return http.post<IOnlineTest>('Student/GetAllTestsForStudent',data);
    
  };

  const GetOnlineExamSubjectList = (data: IOnlineTestSubject) => {
    return http.post<IOnlineTestSubject>('Student/AllSubjectsForExam',data);
    
  };

  const GetOnlineExamQuestionsDetail = (data: IOnlineExamQuestions) => {
    return http.post<IOnlineExamQuestions>('Student/GetQuestionsForOnlineExam',data);
  };
  
const GetOnlineExamListApi ={
    GetOnlineExamList,
    GetOnlineExamSubjectList,
    GetOnlineExamQuestionsDetail
}

export default GetOnlineExamListApi;