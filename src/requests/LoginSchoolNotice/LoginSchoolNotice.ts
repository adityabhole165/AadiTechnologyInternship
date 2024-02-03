import { createSlice } from '@reduxjs/toolkit';
import ISchoolnotice from 'src/interfaces/Student/LoginSchoolNotice';
import IViewschoolnotice from 'src/interfaces/Student/LoginViewSchoolNotice';
import { AppThunk } from 'src/store';
import LoginSchoolNoticeApi from '../../api/LoginSchoolNotice/LoginSchoolNotice';

const LoginSchoolNoticeSlice = createSlice({
  name: 'LoginSchoolNotice',
  initialState: {
    LoginSchoolNoticeData: [],
    LoginViewSchoolNoticeData: []
  },
  reducers: {
    getLoginSchoolNoticeList(state, action) {
      state.LoginSchoolNoticeData = action.payload.GetSchoolNoticesResult;
    },
    getLoginViewSchoolNoticeList(state, action) {
      state.LoginViewSchoolNoticeData = action.payload.GetSchoolNoticesResult;
    }
  }
});

export const getLoginSchoolNotice =
  (data: ISchoolnotice): AppThunk =>
  async (dispatch) => {
    const response = await LoginSchoolNoticeApi.GetLoginSchoolNoticeList(data);
    dispatch(
      LoginSchoolNoticeSlice.actions.getLoginSchoolNoticeList(response.data)
    );
  };

export const getLoginViewSchoolNotice =
  (data: IViewschoolnotice): AppThunk =>
  async (dispatch) => {
    const response = await LoginSchoolNoticeApi.ViewLoginSchoolNoticeList(data);
    dispatch(
      LoginSchoolNoticeSlice.actions.getLoginViewSchoolNoticeList(response.data)
    );
  };

export default LoginSchoolNoticeSlice.reducer;
