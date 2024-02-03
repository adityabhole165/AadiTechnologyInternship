import { IPublishUnPublishHomeworkBody } from 'src/interfaces/AssignHomework/IAddUnpublish';
import http from '../../requests/SchoolService/schoolServices';

const PublishUnpublish = (data: IPublishUnPublishHomeworkBody) => {
  return http.post('Teacher/PublishUnPublishHomework', data);
};

const ApiAddUnpublish = {
  PublishUnpublish
};
export default ApiAddUnpublish;
