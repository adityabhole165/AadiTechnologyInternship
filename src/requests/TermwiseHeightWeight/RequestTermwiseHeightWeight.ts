import { createSlice } from '@reduxjs/toolkit';
import TermwiseHeightWeightApi from 'src/api/TermwiseHeightWeight/ApiTermwiseHeightWeight';
import {
  IClassTeacherDropdownBody,
  IGetFinalPublishedExamStatusBody,
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
    UpdateStudent: '',
    FinalPublishedExamStatus: {},
    Loading: true
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
    },
    resetupdatestudentlist(state) {
      state.UpdateStudent = '';
    },
    finalpublishedexamstatus(state, action) {
      state.FinalPublishedExamStatus = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;

    }
  }
});

export const getTeacherNameList =
  (data: IClassTeacherDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await TermwiseHeightWeightApi.ClassTeacherDropdownApi(data);
      let abc = [{ Id: '0', Name: 'Select', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.TeacherName,
          Value: item.SchoolWise_Standard_Division_Id
        });
      });
      dispatch(TermwiseHeightWeightSlice.actions.TeacherNameList(abc));
       console.log(Response, "abc")
    };

export const getTermList =
  (data: ITermDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await TermwiseHeightWeightApi.TermDropdownApi(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Term_Id,
          Name: item.Term_Name,
          Value: item.Term_Id
        };
      });
      dispatch(TermwiseHeightWeightSlice.actions.TermList(abc));
    };
export const getstudentdetails =
  (data: IStudentsListBody): AppThunk =>
    async (dispatch) => {
      const response = await TermwiseHeightWeightApi.StudentListApi(data);
      let responseData = response.data.map((item) => {
        return {
          Id: item.RollNo,
          Text1: item.RollNo,
          Text2: item.StudentName,
          Text3: item.Height,
          Text4: item.Weight,
          IsLeftStudent: item.IsLeftStudent,
          Text6: item.YearWiseStudentId

          // === "1" ? "color=red" : item.StudentName
          //   === "1" ? "color=red" : item.RollNo
        };
      });
      dispatch(TermwiseHeightWeightSlice.actions.studentdetails(responseData));
      console.log(Response, responseData)
    };

export const getupdatestudentlist =
  (data: IUpdateStudentDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await TermwiseHeightWeightApi.UpdateStudentListApi(data);
      dispatch(
        TermwiseHeightWeightSlice.actions.updatestudentlist(response.data)
      );
    };
export const resetupdatestudentlist =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(TermwiseHeightWeightSlice.actions.resetupdatestudentlist());
    };
export const getFinalPublishedExamStatus =
  (data: IGetFinalPublishedExamStatusBody): AppThunk =>
    async (dispatch) => {
      dispatch(TermwiseHeightWeightSlice.actions.getLoading(true));
      const response = await TermwiseHeightWeightApi.GetFinalPublishedExamStatusApi(data);


      dispatch(TermwiseHeightWeightSlice.actions.finalpublishedexamstatus(response.data));
    };


export default TermwiseHeightWeightSlice.reducer;