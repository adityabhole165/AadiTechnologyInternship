import http from "../../requests/SchoolService/schoolServices";
import { IGetUserFeedbackBody, IGetUserFeedbackDetails} from "src/interfaces/Student/IFeedback";

const Feedbackapi = (data: IGetUserFeedbackBody) => {
    return http.post<IGetUserFeedbackDetails>('Dashboard/GetUserFeedback',data);
  };
  const APIFeedback ={
    Feedbackapi
  }
  export default APIFeedback;