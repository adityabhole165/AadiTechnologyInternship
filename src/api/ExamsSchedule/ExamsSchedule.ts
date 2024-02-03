import {
  default as IExamList,
  default as ISelectExam
} from '../../interfaces/Student/ExamSchedule';
import http from '../../requests/SchoolService/schoolServices';

const GetSelectExamList = (data: ISelectExam) => {
  return http.post<ISelectExam>('School/GetExamsForStandard', data);
};

const GetExamsList = (data: IExamList) => {
  return http.post<IExamList>('School/GetExamScheduleForStandard', data);
};
const GetSelectExamApi = {
  GetSelectExamList,
  GetExamsList
};

export default GetSelectExamApi;
