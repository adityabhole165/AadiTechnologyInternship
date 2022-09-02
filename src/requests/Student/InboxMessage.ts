import { createSlice} from '@reduxjs/toolkit'
import InboxMessageApi from "../../api/MessageCenter/InboxMessage";
import { AppThunk } from 'src/store';
import {IInboxList} from 'src/interfaces/MessageCenter/InboxMessage';
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

export const getNextPageInboxList =
(data: IgetList): AppThunk =>
async (dispatch) => {
  dispatch(InboxMessageSlice.actions.getLoading(true));
  dispatch(InboxMessageSlice.actions.getFilterData(true));
  const response = await InboxMessageApi.GetInboxList(data);
  dispatch(InboxMessageSlice.actions.getInboxList(response.data));
};


export default InboxMessageSlice.reducer
