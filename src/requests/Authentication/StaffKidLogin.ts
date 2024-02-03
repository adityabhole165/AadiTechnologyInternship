import { createSlice } from '@reduxjs/toolkit';
import LoginApi from 'src/api/Authentication/Login';
import { IStaffDetailsForloginBody } from 'src/interfaces/Authentication/Login';
import { AppThunk } from 'src/store';

const Staffkidslice = createSlice({
  name: 'StaffKid',
  initialState: {
    Stafflogin: []
  },
  reducers: {
    getStafflogin(state, action) {
      state.Stafflogin = action.payload.GetStaffDetailsForlogin;
    }
  }
});
export const Stafflogin =
  (data: IStaffDetailsForloginBody): AppThunk =>
  async (dispatch) => {
    const response = await LoginApi.StaffDetailsForlogin(data);
    dispatch(Staffkidslice.actions.getStafflogin(response.data));
  };

export default Staffkidslice.reducer;
