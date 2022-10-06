import http from "../../requests/SchoolService/schoolServices";
import { IFeedbackList } from "src/interfaces/Student/dashboard";
//Feedback
const Feedback  = (data: IFeedbackList) => {
  return http.post('Dashboard/GetUserFeedback',data);
};

const FeedbackApi ={
     Feedback
}

export default FeedbackApi;
