import http from "../../requests/SchoolService/schoolServices";
import { IGetUserFeedbackBody, IGetUserFeedbackResult} from "src/interfaces/Student/IFeedback";

const Feedbackapi = (data: IGetUserFeedbackBody) => {
    return http.post<IGetUserFeedbackResult>('Dashboard/GetUserFeedback',data);
  };
  const APIFeedback ={
    Feedbackapi
  }
  export default APIFeedback;