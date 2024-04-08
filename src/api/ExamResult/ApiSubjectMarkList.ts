import {
    IGetTestMarkBody,
    IGetTestMarkResult,
    GetStudentsForSubjectMarkMouseOverResult,
    GetStudentsForSubjectMarkMouseOverBody
  } from 'src/interfaces/ExamResult/ISubjectMarkList';
  import http from '../../requests/SchoolService/schoolServices';
  
  const TestMarkApi = (data:IGetTestMarkBody,) => {
    return http.post<IGetTestMarkResult>('Teacher/GetTestMark', data);
  };
  const StudentNameMouseoverApi = (data:GetStudentsForSubjectMarkMouseOverBody,) => {
    return http.post<GetStudentsForSubjectMarkMouseOverResult[]>('Teacher/GetStudentsForSubjectMarkSheet', data);
  };
 

  const ApiSubjectMarkList= {
    TestMarkApi,
    StudentNameMouseoverApi
    
  };
  export default ApiSubjectMarkList;
  