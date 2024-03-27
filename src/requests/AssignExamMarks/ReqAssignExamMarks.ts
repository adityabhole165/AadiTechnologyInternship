import { createSlice } from '@reduxjs/toolkit';
import AssignExamMarkApi from 'src/api/ApiAssignExamMarks/ApiAssignExamMarks';
import {
  IAssignClassBody,
  IClasswiseExamDropdownBody,
  ISubjectsExamMarksStatusForClassBody,
  ISubmitTestMarksToClassTeacherBody
} from 'src/interfaces/AssignExamMarks/IAssignExamMarks';
import { AppThunk } from 'src/store';

const AssignExamMarkSlice = createSlice({
  name: 'ExamMark',
  initialState: {
    ISAssignExam: [],
    ISAssignClassExam: [],
    ISSubjectListClass: [],
    ISSubjectListClass1: [],
    ISSubmitMarksTeacher: '',
    ISSubmitMarksRest: ''
  },
  reducers: {
    //AssignClass
    getAssignExamMark(state, action) {
      state.ISAssignExam = action.payload;
    },

    //ClasswiseExam
    getClassWiseExam(state, action) {
      state.ISAssignClassExam = action.payload;
    },

    getsubjectList(state, action) {
      state.ISSubjectListClass = action.payload;
    },

    getsubjectList1(state, action) {
      state.ISSubjectListClass1 = action.payload;
    },

    RSubmitMarksTeacher(state, action) {
      state.ISSubmitMarksTeacher = action.payload;
    },

    resetMessage(state) {
      state.ISSubmitMarksRest = '';
    }
  }
});

//AssignClass
export const GetAssignExamMarkList =
  (data: IAssignClassBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.AssignClass(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.Standard_Division_Id
        };
      });
      dispatch(AssignExamMarkSlice.actions.getAssignExamMark(a));
    };

//ClassWiseExam
export const GetClassWiseExam =
  (data: IClasswiseExamDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.ClasswiseExamDropdown(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.schoolwise_test_id,
          Name: item.schoolwise_test_name,
          Value: item.schoolwise_test_id
        };
      });
      dispatch(AssignExamMarkSlice.actions.getClassWiseExam(a));
    };

//SubjectList
// export const GetSubjectListClass =
//     (data: ISubjectsExamMarksStatusForClassBody): AppThunk =>
//         async (dispatch) => {
//             const response = await AssignExamMarkApi.SubjectsExamMarks(data);

//             let a = response.data.map((item, i) => {
//                 return {

//                     Text1:item.StandardDivision,
//                     Text2:item.Subject_Name,
//                     Text3:item.STATUS,
//                 }
//             })
//             dispatch(AssignExamMarkSlice.actions.getsubjectList(a));
//         };

export const GetSubjectList =
  (data: ISubjectsExamMarksStatusForClassBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.SubjectsExamMarks(data);
      let ClassList = response.data.ExamMarksStatusForClass.map(item => ({
        Id: item.Subject_Id,
        Text1: item.StandardDivision,
        Text2: item.Subject_Name,
        Text3: item.Is_Submitted,
        Text4: item.STATUS,
        Text5: item.StatusDescription,
        SubjectId: item.Subject_Id,
        StandardDivisionId: item.Standard_Division_Id
      }))


      let MyClassList = response.data.ExamMarksStatusForClassTeacher.map(item => ({
        Id: item.Subject_Id,
        Text1: item.StandardDivision,
        Text2: item.Subject_Name,
        Text3: item.Is_Submitted,
        Text4: item.STATUS,
        Text5: item.StatusDescription,
        SubjectId: item.Subject_Id,
        StandardDivisionId: item.Standard_Division_Id
      }))


      dispatch(AssignExamMarkSlice.actions.getsubjectList(ClassList));
      dispatch(AssignExamMarkSlice.actions.getsubjectList1(MyClassList));
     

    };




export const ReqSubmitMarksTeacher =
  (data: ISubmitTestMarksToClassTeacherBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.SubmitMarksTeacher(data);
      dispatch(AssignExamMarkSlice.actions.RSubmitMarksTeacher(response.data));
    };

export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(AssignExamMarkSlice.actions.resetMessage());
};

export default AssignExamMarkSlice.reducer;
