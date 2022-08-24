import { createSlice} from '@reduxjs/toolkit'
import InboxMessageApi from "../../api/MessageCenter/InboxMessage";
import { AppThunk } from 'src/store';
import {IInboxList} from 'src/interfaces/MessageCenter/InboxMessage';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';

const InboxMessageSlice = createSlice({
  name: 'Message Center',
  initialState:{
    InboxList:[],

  },
  reducers: {
    getInboxList (state,action){
      state.InboxList=action.payload.GetMessagesResult;
    }
  }   
});


export const getInboxList =
  (data:IgetList): AppThunk =>
  async (dispatch) => {
    const response = await InboxMessageApi.GetInboxList(data);
    console.log("called GetInbox -- ")
    dispatch(InboxMessageSlice.actions.getInboxList(response.data));
  };


export default InboxMessageSlice.reducer
