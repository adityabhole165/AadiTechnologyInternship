import {
  IHomework,
  IHomeworkDetailsResult,
  IHomeworkSubject,
  IHomeworkSubjectResult
} from 'src/interfaces/Student/Homework';
import http from '../../requests/SchoolService/schoolServices';

const GetHomeworkList = (data: IHomework) => {
  return http.post<IHomeworkDetailsResult>('Student/GetHomeworkDetails', data);
};

const GetHomeworkSubjectList = (data: IHomeworkSubject) => {
  return http.post<IHomeworkSubjectResult>('Student/GetHomeworkSubjects', data);
};

const HomeworkApi = {
  GetHomeworkList,
  GetHomeworkSubjectList
};

export default HomeworkApi;
