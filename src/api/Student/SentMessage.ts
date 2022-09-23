import http from "../../requests/SchoolService/schoolServices";
import { IgetList,GetScheduledSMSResult } from "src/interfaces/MessageCenter/GetList";

const GetSentMessageList  = (data: IgetList) => {
    return http.post<GetScheduledSMSResult>('MessageCenter/GetSentMessages',data);
};

const SentMessageApi ={
    GetSentMessageList,
}

export default SentMessageApi;