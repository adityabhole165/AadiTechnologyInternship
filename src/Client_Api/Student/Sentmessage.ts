import { createSlice } from "@reduxjs/toolkit";
import SentMessageApi from "src/api/Student/SentMessage";
import { IgetList } from "src/Interface/MessageCenter/GetList";
import { ISentList,IViewSent } from "src/Interface/MessageCenter/Sent_Message";
import { AppThunk } from "src/store";

const SentMessageSlice = createSlice({
    name: 'Sent Message',
    initialState: {
        SentList:[],
      ViewSent: [],
    },
    reducers: {
        getSentList(state, action) {
        state.SentList = action.payload.GetScheduledSMSResult;
       
      },
          
    }
  })
  
  export const getSentList =
  (data: IgetList): AppThunk =>
    async (dispatch) => {
      const response = await SentMessageApi.GetSentMessageList(data)
      dispatch(SentMessageSlice.actions.getSentList(response.data));
    };

   

    export default SentMessageSlice.reducer