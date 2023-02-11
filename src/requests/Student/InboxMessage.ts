import { createSlice} from '@reduxjs/toolkit'
import InboxMessageApi from "../../api/MessageCenter/InboxMessage";
import { AppThunk } from 'src/store';
import SentMessageApi from 'src/api/Student/SentMessage';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { isFutureDateTime } from 'src/components/Common/Util';

const InboxMessageSlice = createSlice({
  name: 'Message Center',
  initialState:{
    InboxList:[],
    NextPageList:[],
    FilterData: false,
    Loading:true
  },
  reducers: {
    getInboxList (state,action){
      state.Loading = false;
      state.InboxList=action.payload.GetMessagesResult;
    },
    Messages(state,action){
      state.Loading = false;
      state.InboxList=action.payload;
    },
    NextMessages(state,action){
      state.NextPageList=action.payload;
    },
    getFilterData(state, action) {
      state.FilterData = action.payload;
    },
    getLoading (state,action) {
      state.Loading = true;
      state.InboxList=[];
      state.NextPageList=[];
    }
  }   
});

  export const getListOfMessages =
  (body, ActiveTab:string,Pagination:boolean): AppThunk =>
  async (dispatch) => {
  if(!Pagination){
    dispatch(InboxMessageSlice.actions.getLoading(true));
  }
    
  if(ActiveTab==='Inbox'){
    const response = await InboxMessageApi.GetInboxList(body);
    const data =response.data.GetMessagesResult.map((item)=>{
      return {
        Id:item.DetailsId,
        text1:item.Subject,
        text2:item.UserName,
        text3:item.Date +' '+ item.Time,
        NavPath:item.DetailsId + '/Inbox',
        isActive:false,
        DetailsId:item.DetailsId,
        ReceiverDetailsId:item.ReceiverDetailsId,
        IsRead: item.IsRead,
      }
    })
    if(Pagination == true){
      dispatch(InboxMessageSlice.actions.NextMessages(data))
    }
    if(Pagination == false){
      dispatch(InboxMessageSlice.actions.Messages(data));
    }
  }
  if(ActiveTab==='Sent')
  {
    const response = await SentMessageApi.GetSentMessageList(body);
    let data = []
    data = response.data.GetScheduledSMSResult?.map((item)=>{
      return {
        Id:item.DetailsId,
        text1:item.Subject,
        text2:item.UserName,
        text3:item.Date +' '+item.Time,
        NavPath:item.DetailsId + '/Sent',
        isActive:false,
        DetailsId:item.DetailsId,
        ReceiverDetailsId:item.ReceiverDetailsId,
        IsSchedule:isFutureDateTime(item.Date + "" + item.Time)
      }
    })
    data = data === undefined ? [] : data;

    if(Pagination == true){
      dispatch(InboxMessageSlice.actions.NextMessages(data))
    }
    if(Pagination == false){
      dispatch(InboxMessageSlice.actions.Messages(data));
    }
  }
  if(ActiveTab==='Trash')
  {
    const response = await MessageCenterApi.GetTrashList(body);
    const data =response.data.GetTrashMessagesResult.map((item)=>{
      return {
        Id:item.DetailsId,
        text1:item.Subject,
        text2:item.UserName,
        text3:item.Date +' '+ item.Time,
        NavPath:item.DetailsId + '/Trash',
        isActive:false,
        DetailsId:item.DetailsId,
        ReceiverDetailsId:item.ReceiverDetailsId==="0"?item.DetailsId:item.ReceiverDetailsId
      }
    })
    if(Pagination == true){
      dispatch(InboxMessageSlice.actions.NextMessages(data))
    }
    if(Pagination == false){
      dispatch(InboxMessageSlice.actions.Messages(data));
    }
  }
  
};


export const getInboxList =
  (data:IgetList): AppThunk =>
  async (dispatch) => {
    dispatch(InboxMessageSlice.actions.getLoading(true));
    dispatch(InboxMessageSlice.actions.getFilterData(false));
    const response = await InboxMessageApi.GetInboxList(data);
    dispatch(InboxMessageSlice.actions.getInboxList(response.data));
  };

export const getNextPageInboxList =
(data: IgetList): AppThunk =>
async (dispatch) => {
  dispatch(InboxMessageSlice.actions.getLoading(true));
  dispatch(InboxMessageSlice.actions.getFilterData(true));
  const response = await InboxMessageApi.GetInboxList(data);
  dispatch(InboxMessageSlice.actions.getInboxList(response.data));
};

export default InboxMessageSlice.reducer;
