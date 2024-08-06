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
    const response = await ApiPreprimaryProgressReport.AllPrimaryClassTeachers(data)

    let ClassTeachers = [{ Id: '0', Name: 'Select', Value: '0',Is_PrePrimary:'Y'}];
    response.data.map((item, i) => {
      ClassTeachers.push({
        Id: item.SchoolWise_Standard_Division_Id,
        Name: item.TeacherName,
        Value: item.SchoolWise_Standard_Division_Id,
        Is_PrePrimary: item.Is_PrePrimary,
       
      });
    });

    dispatch(SlicePreprimaryProgressReport.actions.RAllPrimaryClassTeacherss(ClassTeachers));
  };

export default SlicePreprimaryProgressReport.reducer;
