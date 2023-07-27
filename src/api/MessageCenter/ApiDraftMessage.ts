import http from "../../requests/SchoolService/schoolServices";
import { IDeleteDraftMessageBody, IDeleteDraftMessageResult, IGetAllDraftMessageBody, IGetAllDraftMessageResult, IGetDraftMessageBody, IGetDraftMessageResult, ISaveDraftMessageBody, ISaveDraftMessageResult } from "src/interfaces/MessageCenter/IDraftMessage";

const GetSaveDraftMessage = (data: ISaveDraftMessageBody) => {
  return http.post<ISaveDraftMessageResult>('Messagecenter/SaveDraftMessageDetails',data);
};

const GetAllDraftMessage= (data: IGetAllDraftMessageBody) => {
    return http.post<IGetAllDraftMessageResult>('Messagecenter/GetAllDraftMessageDetails',data);
  };

  const GetDraftMessage= (data: IGetDraftMessageBody) => {
    return http.post<IGetDraftMessageResult>('Messagecenter/GetDraftMessageDetails',data);
  };

  const DeleteDraftMessage= (data: IDeleteDraftMessageBody) => {
    return http.post<IDeleteDraftMessageResult>('Messagecenter/DeleteDraftMessageDetails',data);
  };


const DraftMessageApi  ={
    GetSaveDraftMessage,
    GetAllDraftMessage,
    GetDraftMessage,
    DeleteDraftMessage
}

export default DraftMessageApi ;
