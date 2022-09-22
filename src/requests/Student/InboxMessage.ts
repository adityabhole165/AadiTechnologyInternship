import { createSlice} from '@reduxjs/toolkit'
import InboxMessageApi from "../../api/MessageCenter/InboxMessage";
import { AppThunk } from 'src/store';
import {IInboxList} from 'src/interfaces/MessageCenter/InboxMessage';
import SentMessageApi from 'src/api/Student/SentMessage';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';

const InboxMessageSlice = createSlice({
  name: 'Message Center',
  initialState:{
    InboxList:[],
    FilterData: false,
    Loading:true
  },
  reducers: {
    getInboxList (state,action){
      state.Loading = false;
      state.InboxList=action.payload.GetMessagesResult;
    },
    getInboxList1 (state,action){
      state.Loading = false;
      state.InboxList=action.payload;
    },
    getFilterData(state, action) {
      state.FilterData = action.payload;
    },
    getLoading (state,action) {
      state.Loading = true
      state.InboxList=[];
    }
  }   
});


export const getInboxList =
  (data:IgetList): AppThunk =>
  async (dispatch) => {
    dispatch(InboxMessageSlice.actions.getLoading(true));
    dispatch(InboxMessageSlice.actions.getFilterData(false));
    const response = await InboxMessageApi.GetInboxList(data);
    dispatch(InboxMessageSlice.actions.getInboxList(response.data));
  };

  export const getInboxList1 =
  (data:IgetList, ActiveTab:string): AppThunk =>
  async (dispatch) => {
    if(ActiveTab==='Inbox'){
    const response = await InboxMessageApi.GetInboxList(data);
    const data2 =response.data.GetMessagesResult.map((item)=>{
      return {
        Id:item.DetailsId,
        text1:item.Subject,
        text2:item.UserName,
        text3:item.Date + item.Time,
        NavPath:item.DetailsId + '/Inbox',
        isActive:false,
        DetailsId:item.DetailsId,
        ReceiverDetailsId:item.ReceiverDetailsId
      }
    })
    dispatch(InboxMessageSlice.actions.getInboxList1(data2));
  }
  else
  {
    const response = await SentMessageApi.GetSentMessageList(data);
    const data2 =response.data.GetScheduledSMSResult.map((item)=>{
      return {
        Id:item.DetailsId,
        text1:item.Subject,
        text2:item.UserName,
        text3:item.Date + item.Time,
        NavPath:item.DetailsId + '/Sent',
        isActive:false
      }
    })

    dispatch(InboxMessageSlice.actions.getInboxList1(data2));
  }
};

export const getNextPageInboxList =
(data: IgetList): AppThunk =>
async (dispatch) => {
  dispatch(InboxMessageSlice.actions.getLoading(true));
  dispatch(InboxMessageSlice.actions.getFilterData(true));
  const response = await InboxMessageApi.GetInboxList(data);
  dispatch(InboxMessageSlice.actions.getInboxList(response.data));
};


export default InboxMessageSlice.reducer
