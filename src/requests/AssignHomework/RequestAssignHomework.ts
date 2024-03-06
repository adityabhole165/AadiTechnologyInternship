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
    SubjectList1: [],
    ClassTeacherList: []
  },
  reducers: {
    TeacherNameList(state, action) {
      state.TeacherList = action.payload;
    },
    ClassName(state, action) {
      state.ClassList = action.payload;
    },
    resetClassName(state) {
      state.ClassList = [];
    },
    SubjectDetails(state, action) {
      state.SubjectList = action.payload;
    },
    SubjectDetails1(state, action) {
      state.SubjectList1 = action.payload;
    },
    resetSubjectDetails(state) {
      state.SubjectList = [];
    },
    resetSubjectDetails1(state) {
      state.SubjectList1 = [];
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

      abc = abc.slice(1);

      dispatch(AssignHomeworkSlice.actions.ClassName(abc));
    };
export const resetClassName =
  (): AppThunk =>
    async (dispatch) => {


      dispatch(AssignHomeworkSlice.actions.resetClassName());
    };

export const SubjectDetails = (data: IGetTeacherSubjectDetailsBody): AppThunk => async (dispatch) => {
  const response = await TeacherDropdownApi.GetTeacherSubjectDetails(data);

  const trueValues = response.data.filter((item) => item.MySubject === "True").map((item) => ({
    Id: item.Subject_Id,
    Text1: item.StandardDivision,
    Text2: item.Subject_Name,
    Text3: item.MySubject,
    Text5:item.Is_ClassTeacher
  }));
  const falseValues = response.data.filter((item) => item.MySubject === "False").map((item) => ({
    Id: item.Subject_Id,
    Text1: item.StandardDivision,
    Text2: item.Subject_Name,
    Text3: item.MySubject
  }));


  dispatch(AssignHomeworkSlice.actions.SubjectDetails(trueValues));
  dispatch(AssignHomeworkSlice.actions.SubjectDetails1(falseValues));
};
export const resetSubjectDetails =
  (): AppThunk => async (dispatch) => {
    console.log("resetSubjectDetails");

    dispatch(AssignHomeworkSlice.actions.resetSubjectDetails());
    dispatch(AssignHomeworkSlice.actions.resetSubjectDetails1());
  }

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
