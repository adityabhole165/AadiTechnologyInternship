import { createSlice } from '@reduxjs/toolkit'
import DraftMessageApi from 'src/api/MessageCenter/ApiDraftMessage';
import { IGetAllDraftMessageBody, IGetDraftMessageBody, ISaveDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import { AppThunk } from 'src/store';


const SliceDraftMessage = createSlice({
    name: 'DraftMessage',
    initialState: {
        SaveDraftMessage: {},
        AllDraftMessage:[],
        DraftMessage:[],
        Loading: true,
    },
    reducers: {
        getSaveDraftMessage(state, action) {
          state.Loading = false;
          state.SaveDraftMessage = action.payload;
        },
        getLoading (state,action) {
            state.Loading = true
            state.SaveDraftMessage = [];
        },

        getAllDraftMessage(state, action) {
          state.AllDraftMessage = action.payload;
          },

          getDraftMessage(state, action) {
            state.DraftMessage = action.payload;
          },
        }
      });

  export const getSaveDraftMessage =
  (data: ISaveDraftMessageBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceDraftMessage.actions.getLoading(true));
      const response = await DraftMessageApi.GetSaveDraftMessage(data)
      dispatch(SliceDraftMessage.actions.getSaveDraftMessage(response.data));
    };

    export const getAllDraftMessage =
    (data: IGetAllDraftMessageBody): AppThunk =>
      async (dispatch) => {
        dispatch(SliceDraftMessage.actions.getLoading(true));
        const response = await DraftMessageApi.GetAllDraftMessage(data)
        dispatch(SliceDraftMessage.actions.getAllDraftMessage(response.data));
      };

      export const getDraftMessage =
      (data: IGetDraftMessageBody): AppThunk =>
        async (dispatch) => {
          dispatch(SliceDraftMessage.actions.getLoading(true));
          const response = await DraftMessageApi.GetDraftMessage(data)
          dispatch(SliceDraftMessage.actions.getDraftMessage(response.data));
        };


  
export default SliceDraftMessage.reducer