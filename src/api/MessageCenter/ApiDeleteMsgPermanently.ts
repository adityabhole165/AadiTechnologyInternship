import {
  IDeleteMessagePermanentlyBody,
  IDeleteMessagePermanentlyResult,
  IUnDeleteMessagesBody,
  IUnDeleteMessagesResult
} from 'src/interfaces/MessageCenter/IDeleteMsgPermanently.';
import http from '../../requests/SchoolService/schoolServices';

const DeleteMessagePermanentlyapi = (data: IDeleteMessagePermanentlyBody) => {
  return http.post<IDeleteMessagePermanentlyResult>(
    'MessageCenter/DeleteMessagePermanently',
    data
  );
};
const UnDeleteMessagesapi = (data: IUnDeleteMessagesBody) => {
  return http.post<IUnDeleteMessagesResult>(
    'MessageCenter/UnDeleteMessages',
    data
  );
};
const ApiDeleteMessagePermanently = {
  DeleteMessagePermanentlyapi,
  UnDeleteMessagesapi
};
const ApiUnDeleteMessages = {
  DeleteMessagePermanentlyapi
};
export default ApiDeleteMessagePermanently;
