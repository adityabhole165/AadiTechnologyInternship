import { createSlice } from '@reduxjs/toolkit';
import AddAnnualPlannerApi from 'src/api/AddAnnualPlanner/ApiAddAnnualPlanner';
import {
  IAddAnnualPlannerBody,
  IDeleteFileDetailsBody,
  IGetFileDetailsBody
} from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import { AppThunk } from 'src/store';

const AddAnnualPlannerSlice = createSlice({
  name: 'AddAnnualPlanner',
  initialState: {
    AddAnnual: '',
    getfile: [],
    deletefile: ''
  },
  reducers: {
    addanual(state, action) {
      state.AddAnnual = action.payload;
    },
    GetFile(state, action) {
      state.getfile = action.payload;
    },
    DeleteFile(state, action) {
      state.deletefile = action.payload;
    },
    RDeleteFileReset(state) {
      state.deletefile = '';
    },
    RaddanualReset(state) {
      state.AddAnnual = '';
    },
  }
});
export const addanual =
  (data: IAddAnnualPlannerBody): AppThunk =>
  async (dispatch) => {
    const response = await AddAnnualPlannerApi.AddAnnualPlanner(data);
    dispatch(AddAnnualPlannerSlice.actions.addanual(response.data));
  };

export const GetFile =
  (data: IGetFileDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await AddAnnualPlannerApi.GetAnnualPlanner(data);
    dispatch(AddAnnualPlannerSlice.actions.GetFile(response.data));
  };
export const DeleteFile =
  (data: IDeleteFileDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await AddAnnualPlannerApi.DeleteAnnualPlanner(data);
    dispatch(AddAnnualPlannerSlice.actions.DeleteFile(response.data));
  };


  export const DeleteFileReset = (): AppThunk => async (dispatch) => {
    dispatch(AddAnnualPlannerSlice.actions.RDeleteFileReset());
  };

  export const addanualReset = (): AppThunk => async (dispatch) => {
    dispatch(AddAnnualPlannerSlice.actions.RaddanualReset());
  };

export default AddAnnualPlannerSlice.reducer;
