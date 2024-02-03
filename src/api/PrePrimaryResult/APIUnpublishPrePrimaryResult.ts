import { IGetUnPublishResltBody } from 'src/interfaces/PrePrimaryResult/IUnpublishPrePrimaryResult';
import http from '../../requests/SchoolService/schoolServices';

const UnPublishReslt = (data: IGetUnPublishResltBody) => {
  return http.post('Teacher/UnPublishReslt', data);
};

const ApiPrePrimaryResult = {
  UnPublishReslt
};
export default ApiPrePrimaryResult;
