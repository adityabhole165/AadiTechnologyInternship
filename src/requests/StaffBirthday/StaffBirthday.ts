import { createSlice } from '@reduxjs/toolkit';
import IstaffBirthday from 'src/interfaces/Common/StaffBirthday';
import { AppThunk } from 'src/store';
import staffBirthdayApi from '../../api/StaffBirthday/StaffBirthday';

const staffBirthdayslice = createSlice({
  name: 'staffBirthday',
  initialState: {
    staffBirthdayData: []
  },
  reducers: {
    getstaffBirthday(state, action) {
      state.staffBirthdayData = action.payload.GetStaffBirthdaysList;
    }
  }
});

export const getstaffBirthday =
  (data: IstaffBirthday): AppThunk =>
  async (dispatch) => {
    const response = await staffBirthdayApi.GetstaffBirthdayList(data);
    dispatch(staffBirthdayslice.actions.getstaffBirthday(response.data));
  };

export default staffBirthdayslice.reducer;
