import { createSlice } from '@reduxjs/toolkit';
import TeacherDropdownApi from 'src/api/TermwiseHeightWeight/ApiTermwiseHeightWeight';
import {
  IClassTeacherDropdownBody,
  IStudentsListBody,
  ITermDropdownBody,
  IUpdateStudentDetailsBody
} from 'src/interfaces/TermwiseHeightWeight/ITermwiseHeightWeight';
import { AppThunk } from 'src/store';

const TermwiseHeightWeightSlice = createSlice({
  name: 'Termwise HeightWeight',
  initialState: {
    ClassTeacherList: [],
    TermwiseTermList: [],
    Student: [],
    UpdateStudent: ''
  },
  reducers: {
    TeacherNameList(state, action) {
      state.ClassTeacherList = action.payload;
    },
    TermList(state, action) {
      state.TermwiseTermList = action.payload;
    },
    studentdetails(state, action) {
      state.Student = action.payload;
    },
    updatestudentlist(state, action) {
      state.UpdateStudent = action.payload;
    }
  }
});

export const TeacherNameList =
  (data: IClassTeacherDropdownBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.ClassTeacherDropdown(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.Teacher_Id,
        Name: item.TeacherName,
        Value: item.StandardDivisionId
      };
    });
    dispatch(TermwiseHeightWeightSlice.actions.TeacherNameList(abc));
  };

export const TermList =
  (data: ITermDropdownBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.TermDropdown(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.Term_Id,
        Name: item.Term_Name,
        Value: item.Term_Id
      };
    });
    dispatch(TermwiseHeightWeightSlice.actions.TermList(abc));
  };
export const studentdetails =
  (data: IStudentsListBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.StudentList(data);
    let responseData = response.data.map((item) => {
      return {
        Id: item.RollNo,
        Text1: item.RollNo,
        Text2: item.StudentName,
        Text3: item.Height,
        Text4: item.Weight,
        Text5: item.IsLeftStudent,
        Text6: item.YearWiseStudentId

        // ==="1"?"color=red":item.StudentName
      };
    });
    dispatch(TermwiseHeightWeightSlice.actions.studentdetails(responseData));
  };

export const updatestudentlist =
  (data: IUpdateStudentDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.UpdateStudentList(data);
    dispatch(
      TermwiseHeightWeightSlice.actions.updatestudentlist(response.data)
    );
  };

export default TermwiseHeightWeightSlice.reducer;
