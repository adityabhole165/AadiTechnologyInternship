import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ISchoolnotice from 'src/interfaces/Common/SchoolNotice';
import SchoolNoticeApi from "../../api/SchoolNotice/SchoolNotice";
import IViewschoolnotice from 'src/interfaces/Student/ViewSchoolNotice'

const Schoolnoticeslice = createSlice({
  name: 'schoolnotice',
  initialState: {
    SchoolNoticeData: [],
    ViewSchoolNotice: [],
    Loading: true
  },
  reducers: {
    getSchoolNotice(state, action) {
      state.SchoolNoticeData = action.payload.GetSchoolNoticesResult;
      state.Loading = false;

    },
    getviewSchoolNotice(state, action) {
      state.ViewSchoolNotice = action.payload.GetSchoolNoticesResult;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true
      state.SchoolNoticeData = [];
    }
  }
});


export const getSchoolNotice =
  (data: ISchoolnotice): AppThunk =>
    async (dispatch) => {
      dispatch(Schoolnoticeslice.actions.getLoading(true));
      const response = await SchoolNoticeApi.GetSchoolNoticeList(data);
      dispatch(Schoolnoticeslice.actions.getSchoolNotice(response.data));
    };

export const getviewSchoolNotice =
  (data: IViewschoolnotice): AppThunk =>
    async (dispatch) => {
      dispatch(Schoolnoticeslice.actions.getLoading(true));
      const response = await SchoolNoticeApi.ViewSchoolNoticeList(data);
      dispatch(Schoolnoticeslice.actions.getviewSchoolNotice(response.data));
    };


export default Schoolnoticeslice.reducer