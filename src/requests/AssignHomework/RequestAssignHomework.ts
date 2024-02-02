import { createSlice } from '@reduxjs/toolkit';
import TeacherDropdownApi from 'src/api/AssignHomework/ApiAssignHomework';
import {
  IClassDropDownBody,
  IClassTeacherDropdownBody,
  IGetTeacherSubjectDetailsBody,
  ITeacherDropdownBody
} from 'src/interfaces/AssignHomework/IAssignHomework';
import { AppThunk } from 'src/store';

const AssignHomeworkSlice = createSlice({
  name: 'Assign Homework',
  initialState: {
    TeacherList: [],
    ClassList: [],
    SubjectList: [],
    ClassTeacherList: []
  },
  reducers: {
    TeacherNameList(state, action) {
      state.TeacherList = action.payload;
    },
    ClassName(state, action) {
      state.ClassList = action.payload;
    },
    SubjectDetails(state, action) {
      state.SubjectList = action.payload;
      //state.MyClassSubjectList = action.payload
    },
    FullTeacherName(state, action) {
      state.ClassTeacherList = action.payload;
    }
  }
});
export const TeacherNameList =
  (data: ITeacherDropdownBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.TeacherDropdown(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.Teacher_Id,
        Name: item.TeacherName,
        Value: item.Teacher_Id
      };
    });
    dispatch(AssignHomeworkSlice.actions.TeacherNameList(abc));
  };
export const ClassName =
  (data: IClassDropDownBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.ClassDropdown(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.Standard_Division_Id,
        Name: item.StandardDivision,
        Value: item.Standard_Division_Id
      };
    });
    dispatch(AssignHomeworkSlice.actions.ClassName(abc));
  };
export const SubjectDetails =
  (data: IGetTeacherSubjectDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.GetTeacherSubjectDetails(data);
    let responseData = response.data.map((item) => {
      return {
        Id: item.Subject_Id,
        Text1: item.StandardDivision,
        Text2: item.Subject_Name,
        Text3: item.MySubject
      };
    });
    dispatch(AssignHomeworkSlice.actions.SubjectDetails(responseData));
  };

export const FullTeacherName =
  (data: IClassTeacherDropdownBody): AppThunk =>
  async (dispatch) => {
    const response = await TeacherDropdownApi.fullClassTeacherDropdown(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.Teacher_Id,
        Name: item.TeacherName,
        Value: item.StandardDivisionId
      };
    });
    dispatch(AssignHomeworkSlice.actions.FullTeacherName(abc));
  };

export default AssignHomeworkSlice.reducer;
