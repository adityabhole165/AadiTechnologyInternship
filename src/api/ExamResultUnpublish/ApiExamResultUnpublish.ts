import { IUnPublishTestBody } from 'src/interfaces/ExamResultUnpublish/IExamResultUnpublish';
import http from '../../requests/SchoolService/schoolServices';

const UnPublishTest = (data: IUnPublishTestBody) => {
  return http.post('Teacher/UnPublishTest', data);
};

const UnPublishTestApi = {
  UnPublishTest
};

export default UnPublishTestApi;
