import { createSlice } from '@reduxjs/toolkit';
import AssignExamMarkApi from 'src/api/ApiAssignExamMarks/ApiAssignExamMarks';
import {
  IAssignClassBody,
  IClasswiseExamDropdownBody,
  ISchoolsettingBody,
  ISubjectTeachersForAssignExamMarksBody,
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
    ISSubmitMarksRest: '',
    ExamMarksStatusForClass: [],
    ISSubjectTeachersForAssignExamMarks: [],
    IsGetSchoolSettings: {},
    Isschoolsetting: {},
    IsschoolsettingExamstatus: {},
    IsschoolsettingPartialSubmit: {}
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
    getExamMarksStatusForClass(state, action) {
      state.ExamMarksStatusForClass = action.payload;
    },

    getsubjectList1(state, action) {
      state.ISSubjectListClass1 = action.payload;
    },

    RSubmitMarksTeacher(state, action) {
      state.ISSubmitMarksTeacher = action.payload;
    },
    RSubjectTeachersForAssignExamMarks(state, action) {
      state.ISSubjectTeachersForAssignExamMarks = action.payload;
    },


    resetMessage(state) {
      state.ISSubmitMarksTeacher = '';
    },
    getSchoolSettings(state, action) {
      state.IsGetSchoolSettings = action.payload;
    },
    RSchoolSettings(state, action) {
      state.Isschoolsetting = action.payload;
    },
    RSchoolSettingsExamStatus(state, action) {
      state.IsschoolsettingExamstatus = action.payload;
    },
    RSchoolSettingsPartialSubmit(state, action) {
      state.IsschoolsettingPartialSubmit = action.payload;
    },
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
          Value: item.Standard_Division_Id,
          IsClassTeacher: item.IsClassTeacher == "true"
        };
      });
      let abc = [{ Id: '0', Name: 'All', Value: '0' }, ...a];
      dispatch(AssignExamMarkSlice.actions.getAssignExamMark(abc));
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
      let serialNumber = 2;
      let ClassList = response.data.ExamMarksStatusForClass ?
        response.data.ExamMarksStatusForClass.map(item => ({
          Id: ++serialNumber,
          Text1: item.StandardDivision,
          Text2: item.Subject_Name,
          Is_Submitted: item.Is_Submitted,
          STATUS: item.STATUS,
          StatusDescription: item.StatusDescription,
          SubjectId: item.Subject_Id,
          StandardId: item.Standard_Id,
          IsMonthConfig: item.Is_MonthConfig,
          StandardDivisionId: item.Standard_Division_Id
        })) : [];

      serialNumber = 2;
      let MyClassList = response.data.ExamMarksStatusForClassTeacher ?
        response.data.ExamMarksStatusForClassTeacher.map(item => ({
          Id: ++serialNumber,
          Text1: item.StandardDivision,
          Text2: item.Subject_Name,
          Is_Submitted: item.Is_Submitted,
          STATUS: item.STATUS,
          StatusDescription: item.StatusDescription,
          SubjectId: item.Subject_Id,
          StandardId: item.Standard_Id,
          IsMonthConfig: item.Is_MonthConfig,
          StandardDivisionId: item.Standard_Division_Id
        })) : [];

      dispatch(AssignExamMarkSlice.actions.getsubjectList(ClassList));
      dispatch(AssignExamMarkSlice.actions.getsubjectList1(MyClassList));
    };






export const ReqSubmitMarksTeacher =
  (data: ISubmitTestMarksToClassTeacherBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.SubmitMarksTeacher(data);
      dispatch(AssignExamMarkSlice.actions.RSubmitMarksTeacher(response.data));
    };


export const CDASubjectTeachersForAssignExamMarks =
  (data: ISubjectTeachersForAssignExamMarksBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.SubjectTeachersForAssignExamMarks(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.TeacherId,
          Name: item.Name,
          Value: item.TeacherId
        };
      });
      dispatch(AssignExamMarkSlice.actions.RSubjectTeachersForAssignExamMarks(a));
    };



export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(AssignExamMarkSlice.actions.resetMessage());
};

export const GetschoolSettings =
  (data: ISchoolsettingBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.GetSchoolSettings(data)

      dispatch(AssignExamMarkSlice.actions.RSchoolSettings(response.data.GetSchoolSettingsResult.EnableAssignExamMarksToAllSubjectOfClass))

    };

export const GetschoolSettingsForUnsubmitMarks =
  (data: ISchoolsettingBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.GetSchoolSettings(data)

      dispatch(AssignExamMarkSlice.actions.getSchoolSettings(response.data.GetSchoolSettingsResult.AllowUnsubmitExamMarks))

    };
export const GetschoolSettingsExamStatusForCoCurriculumS =
  (data: ISchoolsettingBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.GetSchoolSettings(data)

      dispatch(AssignExamMarkSlice.actions.RSchoolSettingsExamStatus(response.data.GetSchoolSettingsResult.AllowExamStatusForCoCurricullarSubjects))

    };
export const GetschoolSettingsPartialSubmit =
  (data: ISchoolsettingBody): AppThunk =>
    async (dispatch) => {
      const response = await AssignExamMarkApi.GetSchoolSettings(data)

      dispatch(AssignExamMarkSlice.actions.RSchoolSettingsPartialSubmit(response.data.GetSchoolSettingsResult.AllowPartialSubmit))

    };

export default AssignExamMarkSlice.reducer;
