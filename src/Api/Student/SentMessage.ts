import http from "../../Client_Api/SchoolService/schoolServices";
import { IgetList } from "src/Interface/MessageCenter/GetList";

const GetSentMessageList  = (data: IgetList) => {
    return http.post<IgetList>('MessageCenter/GetSentMessages',data);
};

const SentMessageApi ={
    GetSentMessageList,
}

export default SentMessageApi;