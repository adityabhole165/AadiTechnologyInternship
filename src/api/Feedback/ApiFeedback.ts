import {
  IGetUserFeedbackBody,
  IGetUserFeedbackDetails,
  ISaveFeedbackDetailsBody,
  ISaveFeedbackDetailsResult
} from 'src/interfaces/Student/IFeedback';
import http from '../../requests/SchoolService/schoolServices';

const Feedbackapi = (data: IGetUserFeedbackBody) => {
  return http.post<IGetUserFeedbackDetails>('Dashboard/GetUserFeedback', data);
};
const AddFeedbackapi = (data: ISaveFeedbackDetailsBody) => {
  return http.post<ISaveFeedbackDetailsResult>('SaveFeedbackDetails', data);
};
const APIFeedback = {
  Feedbackapi,
  AddFeedbackapi
};
export default APIFeedback;
