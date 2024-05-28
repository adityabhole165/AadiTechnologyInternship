import { createSlice } from "@reduxjs/toolkit";
import ApiProgressReport from "src/api/ProgressReport/ApiProgressReport";
import { IGetClassTeachersBody } from "src/interfaces/ProgressReport/IprogressReport";

import { AppThunk } from "src/store";

const ProgressReportSlice = createSlice({
    name: 'ProgressReport',
    initialState: {
        ISGetClassTeachers:[]
  
    },
    reducers: {
        RGetClassTeachers(state, action) {
            state.ISGetClassTeachers = action.payload;
          },
    }
  });

  export const CDAGetClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetClassTeachers(data);
      let StudentList = [{ Id: '0', Name: '--All--', Value: '0' }];
      response.data.map((item, i) => {
        StudentList.push({
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id
        });
      });

      dispatch(ProgressReportSlice.actions.RGetClassTeachers(StudentList));
    };

export default ProgressReportSlice.reducer;
