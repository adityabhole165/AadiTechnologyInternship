import { createSlice } from "@reduxjs/toolkit";
import { IGetTestwiseTermBody, IGetClassTeachersBody, IGetTeacherXseedSubjectsBody, ISubmitExamMarksStatusBody} from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"
import { AppThunk } from "src/store";
import ApiAssignPrePrimaryGrades from 'src/api/AssignPrePrimaryGrades/ApiAssignPrePrimaryGrades'



const AssignPrePrimaryGradesSlice = createSlice({
  name: 'AssignPrePrimary',
  initialState: {
    ISGetTestwiseTerm:[],
    ISGetClassTeachers:[],
    ISGetTeacherXseedSubjectsBody:[],
    ISSubmitExamMarksStatus:"",
    ISSubmitMarksRest:""
  },
  reducers: {
    RGetTestwiseTerm  (state, action) {
      state.ISGetTestwiseTerm = action.payload
    },

    RGetClassTeachers  (state, action) {
      state.ISGetClassTeachers = action.payload
    },

    RGetTeacherXseedSubjects  (state, action) {
      state.ISGetTeacherXseedSubjectsBody = action.payload
    },

    RSubmitExamMarksStatus  (state, action) {
      state.ISSubmitExamMarksStatus = action.payload
    },
    resetMessage(state) {
      state.ISSubmitMarksRest = ""
  }
   
  }
});

    export const CDAGetTestwiseTerm = (data: IGetTestwiseTermBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.GetTestwiseTermA(data);
        let TestwiseTerm = response.data.map((item, i) => {
            return {
                Id: item.AssessmentId,
                Name: item.Name,
                Value: item.AssessmentId,
            }
        })

        dispatch(AssignPrePrimaryGradesSlice.actions.RGetTestwiseTerm(TestwiseTerm));
    }


    export const CDAGetClassTeachers = (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.GetClassTeachers(data);
        let ClassTeachers = response.data.map((item, i) => {
            return {
                Id: item.Teacher_Id,
                Name: item.TeacherName,
                Value: item.Teacher_Id,
            }
        })

        dispatch(AssignPrePrimaryGradesSlice.actions.RGetClassTeachers(ClassTeachers));
    }


    export const CDAGetTeacherXseedSubjects= (data: IGetTeacherXseedSubjectsBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.GetTeacherXseedSubjects(data);
        let TeacherXseedSubjects = response.data.map((item, i) => {
            return {
                 Id:item.SubjectId,
                Text1: item.StandardDivision,
                Text2: item.Subject_Name,
                Text3: item.EditStatus,
                Text4:item.SubmitStatus
            }
        })

        dispatch(AssignPrePrimaryGradesSlice.actions.RGetTeacherXseedSubjects(TeacherXseedSubjects));
    }



    export const CDASubmitExamMarksStatus= (data: ISubmitExamMarksStatusBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.SubmitExamMarksStatus(data);
       console.log(response,"response----------");
       

        dispatch(AssignPrePrimaryGradesSlice.actions.RSubmitExamMarksStatus(response.data));
    }

    export const resetMessage =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AssignPrePrimaryGradesSlice.actions.resetMessage());
        }


export default AssignPrePrimaryGradesSlice.reducer