import { createSlice } from '@reduxjs/toolkit';
import ApiPreprimaryProgressReport from 'src/api/PreprimaryProgressReport/PreprimaryProgressReport';
import { IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';

import { AppThunk } from 'src/store';

const SlicePreprimaryProgressReport = createSlice({
  name: 'PrePrimaryResult',
  initialState: {
    ISAllPrimaryClassTeacherss: [],
    
  },
  reducers: {
    RAllPrimaryClassTeacherss(state, action) {
      state.ISAllPrimaryClassTeacherss = action.payload;
    },
    
  }
});

export const CDAAllPrimaryClassTeachers =
  (data: IGetAllPrimaryClassTeacherssBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPreprimaryProgressReport.AllPrimaryClassTeachers(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.SchoolWise_Standard_Division_Id,
        Name: item.TeacherName,
        Value: item.SchoolWise_Standard_Division_Id
      };
    });
    dispatch(SlicePreprimaryProgressReport.actions.RAllPrimaryClassTeacherss(abc));
  };

export default SlicePreprimaryProgressReport.reducer;
