import { createSlice } from '@reduxjs/toolkit';
import ApiUserLoginExpires from 'src/api/UserLoginExpires/ApiUserLoginExpires';
import { IUserLoginExpiresBody } from 'src/interfaces/Student/ICheckForUserLoginExpires';
import { AppThunk } from 'src/store';

const SliceUserLoginExpires = createSlice({
  name: 'UserLoginExpires',
  initialState: {
    UserLoginExpires: null
  },
  reducers: {
    getuserLoginExpires(state, action) {
      state.UserLoginExpires = action.payload.CheckForUserLoginExpiresResult;
    },
    resetuserLoginExpires(state) {
      state.UserLoginExpires = null;
    }
  }
});

export const getuserLoginExpires =
  (data: IUserLoginExpiresBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiUserLoginExpires.UserLoginExpiresapi(data);
    dispatch(SliceUserLoginExpires.actions.getuserLoginExpires(response.data));
  };

export const resetuserLoginExpires = (): AppThunk => async (dispatch) => {
  dispatch(SliceUserLoginExpires.actions.resetuserLoginExpires());
};

export default SliceUserLoginExpires.reducer;
