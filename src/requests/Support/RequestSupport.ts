import { createSlice } from '@reduxjs/toolkit';
import ApiSupport from 'src/api/Support/ApiSupport';
import { IGetUserDetailsBody, ISaveStudentDetailsForSupportBody } from 'src/interfaces/Student/ISupport';
import { AppThunk } from 'src/store';

const SliceSupport = createSlice({
  name: 'Support',
  initialState: {
    SaveSupport: '',
    getUserDetails: '',
    Loading: true
  },
  reducers: {
    GetSaveSupport(state, action) {
      state.Loading = false;
      state.SaveSupport = action.payload;
    },
    ResetSubmitSupport(state) {
      state.SaveSupport = '';
    },
    GetUserDetails(state, action) {
      state.getUserDetails = action.payload;

    },
    getLoading(state, action) {
      state.Loading = true;
      state.SaveSupport = '';
    },

  }
});

export const getSaveSupport =
  (data: ISaveStudentDetailsForSupportBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSupport.actions.getLoading(true));
      const response = await ApiSupport.SaveSupportapi(data);
      dispatch(SliceSupport.actions.GetSaveSupport(response.data));
    };

export const ResetMessage = (): AppThunk => async (dispatch) => {
  dispatch(SliceSupport.actions.ResetSubmitSupport());
};

export const getUserDetailss =
  (data: IGetUserDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSupport.GetUserDetailApi(data);
      console.log(response.data.TeacherDetails.Email_Address,response.data, 'AAAAAA')
      dispatch(SliceSupport.actions.GetUserDetails(response.data.TeacherDetails.Email_Address));
    };

export default SliceSupport.reducer;
