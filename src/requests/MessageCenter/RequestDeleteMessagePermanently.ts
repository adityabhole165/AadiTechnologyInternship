import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import ApiDeleteMessagePermanently from 'src/api/MessageCenter/ApiDeleteMsgPermanently'
import { IDeleteMessagePermanentlyBody, IUnDeleteMessagesBody } from 'src/interfaces/MessageCenter/IDeleteMsgPermanently.';

const SliceDeleteMessagePermanetly = createSlice({
    name: 'Delete Message Permanently',
    initialState: {
      DeleteMessagePermanentlyList: [],
      Loading: true,
    },
    reducers: {
        GetDeleteMessagePermantely(state, action) {
          state.Loading = false;
          state.DeleteMessagePermanentlyList = action.payload.DeletionMessage;
        },
        getLoading (state,action) {
            state.Loading = true
            state.DeleteMessagePermanentlyList = [];
        }
        }
      });

      export const getDeleteMessagePermantely =
  (data: IDeleteMessagePermanentlyBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceDeleteMessagePermanetly.actions.getLoading(true));
      const response = await ApiDeleteMessagePermanently.DeleteMessagePermanentlyapi(data)
      dispatch(SliceDeleteMessagePermanetly.actions.GetDeleteMessagePermantely(response.data));
    };


    export const getUnDeleteMessages =
    (data: IUnDeleteMessagesBody): AppThunk =>
      async (dispatch) => {
        dispatch(SliceDeleteMessagePermanetly.actions.getLoading(true));
        const response = await ApiDeleteMessagePermanently.UnDeleteMessagesapi(data)
        dispatch(SliceDeleteMessagePermanetly.actions.GetDeleteMessagePermantely(response.data));
      };
  
export default SliceDeleteMessagePermanetly.reducer