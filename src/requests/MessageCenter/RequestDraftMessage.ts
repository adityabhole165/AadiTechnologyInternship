import { createSlice } from '@reduxjs/toolkit';
import DraftMessageApi from 'src/api/MessageCenter/ApiDraftMessage';
import {
  IDeleteDraftMessageBody,
  IGetAllDraftMessageBody,
  IGetDraftMessageBody,
  ISaveDraftMessageBody
} from 'src/interfaces/MessageCenter/IDraftMessage';
import { AppThunk } from 'src/store';

const SliceDraftMessage = createSlice({
  name: 'DraftMessage',
  initialState: {
    SaveDraftMessage: {},
    AllDraftMessage: [],
    DraftMessage: null,
    DeleteDraftMessage: null,
    Loading: true
  },
  reducers: {
    getSaveDraftMessage(state, action) {
      state.Loading = false;
      state.SaveDraftMessage = action.payload.Message;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.SaveDraftMessage = [];
    },

    getAllDraftMessage(state, action) {
      state.AllDraftMessage = action.payload.GetAllDraftMessageDetails;
    },

    getDraftMessage(state, action) {
      state.DraftMessage = action.payload.GetDraftMessageDetails;
    },

    getDeleteDraftMessage(state, action) {
      state.DeleteDraftMessage = action.payload;
    },

    resetDeleteDraftMessage(state) {
      state.DeleteDraftMessage = '';
    },

    resetSaveDraftMessage(state) {
      state.SaveDraftMessage = '';
    }
  }
});

export const getSaveDraftMessage =
  (data: ISaveDraftMessageBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceDraftMessage.actions.getLoading(true));
    const response = await DraftMessageApi.GetSaveDraftMessage(data);
    dispatch(SliceDraftMessage.actions.getSaveDraftMessage(response.data));
  };

export const resetSaveDraftMessage = (): AppThunk => async (dispatch) => {
  dispatch(SliceDraftMessage.actions.resetSaveDraftMessage());
};

export const getAllDraftMessage =
  (data: IGetAllDraftMessageBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceDraftMessage.actions.getLoading(true));
    const response = await DraftMessageApi.GetAllDraftMessage(data);

    dispatch(SliceDraftMessage.actions.getAllDraftMessage(response.data));
  };

export const getDraftMessage =
  (data: IGetDraftMessageBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceDraftMessage.actions.getLoading(true));
    const response = await DraftMessageApi.GetDraftMessage(data);
    dispatch(SliceDraftMessage.actions.getDraftMessage(response.data));
  };

export const getDeleteDraftMessage =
  (data: IDeleteDraftMessageBody): AppThunk =>
  async (dispatch) => {
    const response = await DraftMessageApi.DeleteDraftMessage(data);
    dispatch(
      SliceDraftMessage.actions.getDeleteDraftMessage(response.data.Message)
    );
  };

export const resetDeleteDraftMessage = (): AppThunk => async (dispatch) => {
  dispatch(SliceDraftMessage.actions.resetDeleteDraftMessage());
};

export default SliceDraftMessage.reducer;
