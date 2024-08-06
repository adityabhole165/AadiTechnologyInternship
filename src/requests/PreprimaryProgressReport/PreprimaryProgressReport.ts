import { createSlice } from '@reduxjs/toolkit';
import ApiPreprimaryProgressReport from 'src/api/PreprimaryProgressReport/PreprimaryProgressReport';
import { IGetAllPrimaryClassTeacherssBody,GetStudentDetailsDropdownBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';

import { AppThunk } from 'src/store';

const SlicePreprimaryProgressReport = createSlice({
  name: 'PrePrimaryResult',
  initialState: {
    ISAllPrimaryClassTeacherss: [],
    ISlistStudentNameDetails:[],
    ISlistAssessmentDetailss:[]
    
  },
  reducers: {
    RAllPrimaryClassTeacherss(state, action) {
      state.ISAllPrimaryClassTeacherss = action.payload;
    },
    RStudentDetailsDropdown(state, action) {
        state.ISlistStudentNameDetails = action.payload;
      },
      RAssessmentDropdown(state, action) {
        state.ISlistAssessmentDetailss = action.payload;
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

  export const CDAStudentDetailsDropdown =
  (data: GetStudentDetailsDropdownBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPreprimaryProgressReport.StudentDetailsDropdown(data)

    let StudentName = [{ Id: '0', Name: 'All', Value: '0'}];
    response.data.listStudentNameDetails.map((item, i) => {
        StudentName.push({
        Id: item.YearwiseStudentId,
        Name: item.StudentName,
        Value: item.YearwiseStudentId,
      
      });
    });

    let Assessment   = [{ Id: '0', Name: 'Select', Value: '0'}];
    response.data.listAssessmentDetailss.map((item, i) => {
        Assessment.push({
        Id: item.AssessmentId,
        Name: item.Name,
        Value: item.AssessmentId,
      
      });
    });

    // let listSubjectsDetails = response.data.listStudentNameDetails.map((item, i) => {
    //     return {
    //         Subject_Id: item.Subject_Id,
    //         Subject_Name: item.Subject_Name,
    //         Total_Consideration: item.Total_Consideration
    //     };
    // });

    dispatch(SlicePreprimaryProgressReport.actions.RStudentDetailsDropdown(StudentName));
    dispatch(SlicePreprimaryProgressReport.actions.RAssessmentDropdown(Assessment));

  };


export default SlicePreprimaryProgressReport.reducer;
