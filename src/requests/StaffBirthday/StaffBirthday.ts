import { createSlice } from '@reduxjs/toolkit';
import { default as IstaffBirthday, default as IstaffBirthdayBody } from 'src/interfaces/Common/StaffBirthday';
import { AppThunk } from 'src/store';
import staffBirthdayApi from '../../api/StaffBirthday/StaffBirthday';

const staffBirthdayslice = createSlice({
  name: 'staffBirthday',
  initialState: {
    staffBirthdayData: [],
    SchoolStaffBirthday: []
  },
  reducers: {
    getstaffBirthday(state, action) {
      state.staffBirthdayData = action.payload.GetStaffBirthdaysList;

    },
    getSchoolStaffBirthday(state, action) {
      state.SchoolStaffBirthday = action.payload.GetSchoolStaffBirthday;
    }
  }
});

export const getstaffBirthday =
  (data: IstaffBirthday): AppThunk =>
    async (dispatch) => {
      const response = await staffBirthdayApi.GetstaffBirthdayList(data);
      dispatch(staffBirthdayslice.actions.getstaffBirthday(response.data));
    };



export const getSchoolStaffBirthday =
  (data: IstaffBirthdayBody): AppThunk =>
    async (dispatch) => {
      const response = await staffBirthdayApi.GetSchoolStaffBirthday(data);
      dispatch(staffBirthdayslice.actions.getSchoolStaffBirthday(response.data));
    };


export default staffBirthdayslice.reducer;
