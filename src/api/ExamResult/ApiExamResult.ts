import http from "../../requests/SchoolService/schoolServices";
import { IGetClassTeachersBody, IGetClassTeachersResult,
    IGetAllTestsForClassBody, IGetAllTestsForClassResult, 
    IGetClassPassFailDetailsForTestBody, IGetClassPassFailDetailsForTestResult
} from "src/interfaces/ExamResult/IExamResult"

const ClassTeachersApi = (data: IGetClassTeachersBody) => {
    return http.post<IGetClassTeachersResult[]>('Teacher/GetClassTeachers',data);
  };
  const GetAllTestsForClassApi = (data: IGetAllTestsForClassBody) => {
      return http.post<IGetAllTestsForClassResult[]>('Teacher/GetAllTestsForClass',data);
    };
    
  const GetClassPassFailDetailsForTestApi = (data: IGetClassPassFailDetailsForTestBody) => {
    return http.post<IGetClassPassFailDetailsForTestResult>('Teacher/GetClassPassFailDetailsForTest',data);
  };
  const ApiExamResult ={
    ClassTeachersApi,
    GetAllTestsForClassApi,
    GetClassPassFailDetailsForTestApi
  }
  export default ApiExamResult;