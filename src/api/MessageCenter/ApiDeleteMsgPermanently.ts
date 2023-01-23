import http from "../../requests/SchoolService/schoolServices";
import { IDeleteMessagePermanentlyBody, IDeleteMessagePermanentlyResult} from "src/interfaces/MessageCenter/IDeleteMsgPermanently.";

const DeleteMessagePermanentlyapi = (data: IDeleteMessagePermanentlyBody) => {
    return http.post<IDeleteMessagePermanentlyResult>('MessageCenter/DeleteMessagePermanently',data);
  };
  const ApiDeleteMessagePermanently ={
    DeleteMessagePermanentlyapi
  }
  export default ApiDeleteMessagePermanently;