import {
  IDeleteDraftMessageBody,
  IDeleteDraftMessageResult,
  IGetAllDraftMessageBody,
  IGetAllDraftResult,
  IGetDraftMessageBody,
  IGetDraftMessageResult,
  ISaveDraftMessageBody
} from 'src/interfaces/MessageCenter/IDraftMessage';
import http from '../../requests/SchoolService/schoolServices';

const GetSaveDraftMessage = (data: ISaveDraftMessageBody) => {
  return http.post<string>('Messagecenter/SaveDraftMessageDetails', data);
};

const GetAllDraftMessage = (data: IGetAllDraftMessageBody) => {
  console.log(data, 'dataDraft');
  return http.post<IGetAllDraftResult>(
    'Messagecenter/GetAllDraftMessageDetails',
    data
  );
};

const GetDraftMessage = (data: IGetDraftMessageBody) => {
  return http.post<IGetDraftMessageResult>(
    'Messagecenter/GetDraftMessageDetails',
    data
  );
};

const DeleteDraftMessage = (data: IDeleteDraftMessageBody) => {
  return http.post<IDeleteDraftMessageResult>(
    'Messagecenter/DeleteDraftMessageDetails',
    data
  );
};

const DraftMessageApi = {
  GetSaveDraftMessage,
  GetAllDraftMessage,
  GetDraftMessage,
  DeleteDraftMessage
};

export default DraftMessageApi;
