import { IUnPublishFinalResultBody } from 'src/interfaces/FinalResultUnpublish/IFinalResultUnpublish';
import http from '../../requests/SchoolService/schoolServices';

const UnPublishFinalResult = (data: IUnPublishFinalResultBody) => {
  return http.post('Teacher/UnPublishFinalResult', data);
};

const UnPublishApi = {
  UnPublishFinalResult
};

export default UnPublishApi;
