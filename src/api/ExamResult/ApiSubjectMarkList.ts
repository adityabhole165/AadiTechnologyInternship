import {
    IGetTestMarkBody,
    IGetTestMarkResult,
  } from 'src/interfaces/ExamResult/ISubjectMarkList';
  import http from '../../requests/SchoolService/schoolServices';
  
  const TestMarkApi = (data:IGetTestMarkBody,) => {
    return http.post<IGetTestMarkResult>('Teacher/GetTestMark', data);
  };
 

  const ApiSubjectMarkList= {
    TestMarkApi,
    
  };
  export default ApiSubjectMarkList;
  