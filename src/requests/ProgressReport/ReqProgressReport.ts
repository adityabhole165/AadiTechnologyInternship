import { createSlice } from "@reduxjs/toolkit";
import ApiProgressReport from "src/api/ProgressReport/ApiProgressReport";
import { IGetClassTeachersBody,IGetStudentNameDropdownBody,IStudentProgressReportBody } from "src/interfaces/ProgressReport/IprogressReport";

import { AppThunk } from "src/store";

const ProgressReportSlice = createSlice({
    name: 'ProgressReport',
    initialState: {
        ISGetClassTeachers:[],
        ISGetStudentNameDropdown:[],
        ISStudentProgressReport:[]
  
    },
    reducers: {
        RGetClassTeachers(state, action) {
            state.ISGetClassTeachers = action.payload;
          },
          RGetStudentNameDropdown(state, action) {
            state.ISGetStudentNameDropdown = action.payload;
          },
          RStudentProgressReport(state, action) {
            state.ISStudentProgressReport = action.payload;
          }

          
          
    }
  });

  export const CDAGetClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetClassTeachers(data);
      let ClassTeachersList = response.data.map((item) => {
          return {
            Id: item.Teacher_Id,
            Name: item.TeacherName,
            Value: item.Teacher_Id
          };
        
      });
      dispatch(ProgressReportSlice.actions.RGetClassTeachers(ClassTeachersList));
    };

    export const CDAGetStudentName =
    (data: IGetStudentNameDropdownBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiProgressReport.GetStudentNameDropdown(data)
        let StudentList = response.data.map((item) => {
            return {
              Id: item.Student_Id,
              Name: item.StudentName,
              Value: item.Student_Id
            };
          
        });
        dispatch(ProgressReportSlice.actions.RGetStudentNameDropdown(StudentList));

        
      };


      export const CDAStudentProgressReport =
    (data: IStudentProgressReportBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiProgressReport.StudentProgressReport(data)
        dispatch(ProgressReportSlice.actions.RStudentProgressReport(response.data));

        
      };



export default ProgressReportSlice.reducer;
