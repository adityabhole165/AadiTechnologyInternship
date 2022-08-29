import { createSlice } from "@reduxjs/toolkit";
import SentMessageApi from "src/api/Student/SentMessage";
import { IgetList } from "src/interfaces/MessageCenter/GetList";
import { ISentList,IViewSent } from "src/interfaces/MessageCenter/Sent_Message";
import { AppThunk } from "src/store";

const SentMessageSlice = createSlice({
    name: 'Sent Message',
    initialState: {
      SentList:[],
      ViewSent: [],
      Loading:true

    },
    reducers: {
        getSentList(state, action) {
        state.Loading = false
        state.SentList = action.payload.GetScheduledSMSResult;
      },
      getLoading (state,action) {
        state.Loading = true
        state.SentList=[];
    }
    }
  })
  
  export const getSentList =
  (data: IgetList): AppThunk =>
    async (dispatch) => {
      dispatch(SentMessageSlice.actions.getLoading(true));
      const response = await SentMessageApi.GetSentMessageList(data)
      dispatch(SentMessageSlice.actions.getSentList(response.data));
    };

   

    export default SentMessageSlice.reducer