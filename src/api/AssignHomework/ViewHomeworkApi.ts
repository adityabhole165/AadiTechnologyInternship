import {
  IGetHomeworkDetailBody,
  IGetHomeworkDetailResult
} from 'src/interfaces/AssignHomework/IViewHomework';
import http from '../../requests/SchoolService/schoolServices';

const HomeworkDetail = (data: IGetHomeworkDetailBody) => {
  return http.post<IGetHomeworkDetailResult[]>(
    'Homework/GetHomeworkDetails',
    data
  );
};

const ViewHomeworkApi = {
  HomeworkDetail
};
export default ViewHomeworkApi;
