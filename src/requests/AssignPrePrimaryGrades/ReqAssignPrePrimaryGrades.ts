import { createSlice } from '@reduxjs/toolkit';
import ApiAssignPrePrimaryGrades from 'src/api/AssignPrePrimaryGrades/ApiAssignPrePrimaryGrades';
import {
  IGetGetStudentsForNonXseedSubjects,
  IGetStudentsForStdDevMasters,
  IGetSubmitUnsubmitExamMarksStatusBody,
  IGetTeacherDropdownBody,
  IGetTeacherXseedSubjectsBody,
  IGetTestwiseTermBody,
  ISaveNonXseedSubGrades,
  ISubmitExamMarksStatusBody
} from 'src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades';
import { AppThunk } from 'src/store';

const AssignPrePrimaryGradesSlice = createSlice({
  name: 'AssignPrePrimary',
  initialState: {
    ISGetTestwiseTerm: [],
    ISGetClassTeachers: [],
    ISGetTeacherXseedSubjectsBody: [],
    ISSubmitExamMarksStatus: '',
    ISSubmitMarksRest: '',
    IGetStudentsForStdDevMasters: [],
    listGradesDetails: [],
    ISGetStudentsForNonXseedSubjects: [],
    ISGetNonXseedStudentsName: [],
    IGetSaveNonXseedSubGradesMsg: '',
    ISGetNonXseedStudentsObs: [],
    ISGetTeacherDropdown: [],
    ISGetSubmitUnsubmitExamMarksStatusMsg: '',
  },
  reducers: {
    RGetTestwiseTerm(state, action) {
      state.ISGetTestwiseTerm = action.payload;
    },

    RGetClassTeachers(state, action) {
      state.ISGetClassTeachers = action.payload;
    },

    RGetTeacherXseedSubjects(state, action) {
      state.ISGetTeacherXseedSubjectsBody = action.payload;
    },

    RSubmitExamMarksStatus(state, action) {
      state.ISSubmitExamMarksStatus = action.payload;
    },
    resetMessage(state) {
      state.ISSubmitMarksRest = '';
    },
    GetStudentsForStdDevMasters(state, action) {
      state.IGetStudentsForStdDevMasters = action.payload;
    },
    RGetListGradesDetails(state, action) {
      state.listGradesDetails = action.payload;
    },
    RGetStudentsForNonXseedSubjects(state, action) {
      state.ISGetStudentsForNonXseedSubjects = action.payload;
    },
    RGetStudentsNameForNonXseedSubjects(state, action) {
      state.ISGetNonXseedStudentsName = action.payload;
    },
    RIGetSaveNonXseedSubGrades(state, action) {
      state.IGetSaveNonXseedSubGradesMsg = action.payload;
    },
    ResetSaveNonXseedSubGradesMsg(state) {
      state.IGetSaveNonXseedSubGradesMsg = ''
    },
    RGetNonXseedStudentsObs(state, action) {
      state.ISGetNonXseedStudentsObs = action.payload;
    },

    RGetTeacherDropdown(state, action) {
      state.ISGetTeacherDropdown = action.payload;
    },

    RGetSubmitUnsubmitExamMarksStatusMsg(state, action) {
      state.ISGetSubmitUnsubmitExamMarksStatusMsg = action.payload;
    },
    ResetGetSubmitUnsubmitExamMarksStatusMsg(state) {
      state.ISGetSubmitUnsubmitExamMarksStatusMsg = ''
    },
  }
});

export const CDAGetNonXseedStudentsObs =
  (data: IGetGetStudentsForNonXseedSubjects): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetStudentsForNonXseedSubjectWithObs(
        data
      );

      let NonXseedStudentsObs = response.data.map((item, i) => {
        return {
          Id: item.Roll_No,
          Text1: item.StudentName,
          Text2: item.GradeId.toString(),
          Text3: item.Observation,
          Text4: item.YearwiseStudentId
        };
      })
      console.log(response, 'NonXseedObservation >> ');

      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetNonXseedStudentsObs(NonXseedStudentsObs)
      );
    };

export const CDAGetTestwiseTerm =
  (data: IGetTestwiseTermBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetTestwiseTermA(data);
      let TestwiseTerm = response.data.map((item, i) => {
        return {
          Id: item.AssessmentId,
          Name: item.Name,
          Value: item.AssessmentId
        };
      });
      TestwiseTerm.unshift({ Id: '0', Name: 'Select', Value: '0' });
      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetTestwiseTerm(TestwiseTerm)
      );
    };

export const GetStudentsForStdDevMasters =
  (data: IGetStudentsForStdDevMasters): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetStudentsForStdDevMasters(data);
      // let GradesList = response.data.listGradesDetails ? response.data.listGradesDetails.map((item, i) => {
      //   return {
      //     Id: item.GradeId,
      //     Name: item.GradeName,
      //     Value: item.GradeId
      //   };
      // }) : [];

      let GradesList = [{ Id: 0, Name: '--Select--', Value: "0" }];
      response.data.listGradesDetails.map((item, i) => {
        GradesList.push({
          Id: item.GradeId,
          Name: item.GradeName,
          Value: item.GradeId.toString()
        });
      });

      let NonXseedStudentsList = response.data.listYearwiseStudentDetails.map((item, i) => {
        return {
          Id: item.YearWise_Student_Id,
          Text1: item.StudentName,
          Text2: item.YearWise_Student_Id,
          Text3: item.SchoolWise_Standard_Division_Id,
          Text4: item.AssessmentId,
          Text5: item.SchoolLeft_Date,
          Text6: item.StartDate
        };
      })
      console.log(GradesList)
      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetListGradesDetails(GradesList)
      );
      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetStudentsNameForNonXseedSubjects(NonXseedStudentsList)
      );
    };

export const CDAGetTeacherDropdown =
  (data: IGetTeacherDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetTeacherDropdown(data);
      // Removing the Class Name and Division from Data through Regex
      function extractTeacherName(str) {
        const regex = /\s-\s([A-Z])\s+(.*)/;
        const match = str.match(regex);
        return match ? match[2] : null;
      }
      console.log(response, "pppppppppssssssssss");
      let listGradesDetails = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id.toString(),
          Name: item.TeacherName,
          Value: item.Teacher_Id.toString()
        };
      });
      console.log("These are teacher dropdown list ----", listGradesDetails);
      listGradesDetails.unshift({ Id: "0", Name: 'Select', Value: '0' });
      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetTeacherDropdown(listGradesDetails)
      );
    };



export const CDAGetTeacherXseedSubjects =
  (data: IGetTeacherXseedSubjectsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetTeacherXseedSubjects(
        data
      );
      let TeacherXseedSubjects = response.data.map((item, i) => {
        return {
          Id: i,
          SubjectId: item.SubjectId,
          StandardDivisionID: item.StandardDivisionID,
          Text1: item.StandardDivision,
          Text2: item.Subject_Name,
          Text3: item.EditStatus,
          Text4: item.SubmitStatus,
          Text5: item.IncompleteRollNoString
        };
      });

      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetTeacherXseedSubjects(
          TeacherXseedSubjects
        )
      );
    };

export const CDAGetStudentsForNonXseedSubjects =
  (data: IGetGetStudentsForNonXseedSubjects): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetStudentsForNonXseedSubjects(
        data
      );
      console.log(response, 'response----------students');
      let StudentsForNonXseedSubjects = response.data.map((item, i) => {
        return {
          Id: item.Roll_No,
          Text1: item.Roll_No,
          Text2: item.StudentName,
          Text3: item.YearwiseStudentId,
          Text4: item.Observation,
          Text5: item.GradeId
        };
      });

      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetStudentsForNonXseedSubjects(
          StudentsForNonXseedSubjects
        )
      );
    };

export const CDASubmitExamMarksStatus =
  (data: ISubmitExamMarksStatusBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.SubmitExamMarksStatus(
        data
      );
      console.log(response, 'response----------');

      dispatch(
        AssignPrePrimaryGradesSlice.actions.RSubmitExamMarksStatus(response.data)
      );
    };

export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(AssignPrePrimaryGradesSlice.actions.resetMessage());
};

export const CDASaveNonXseedSubGrades =
  (data: ISaveNonXseedSubGrades): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.IGetSaveNonXseedSubGrades(
        data
      );
      dispatch(
        AssignPrePrimaryGradesSlice.actions.RIGetSaveNonXseedSubGrades(
          response.data
        )
      );
    };



export const resetSavenonXseedMsg = (): AppThunk => async (dispatch) => {
  dispatch(AssignPrePrimaryGradesSlice.actions.ResetSaveNonXseedSubGradesMsg());
};


export const CDAGetSubmitUnsubmitExamMarksStatus =
  (data: IGetSubmitUnsubmitExamMarksStatusBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAssignPrePrimaryGrades.GetSubmitUnsubmitExamMarksStatus(
        data
      );
      console.log(response, 'response----------');
      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetSubmitUnsubmitExamMarksStatusMsg(response.data)
      );
    };


export const resetSubmitUnSubmitGradeMsg = (): AppThunk => async (dispatch) => {
  dispatch(AssignPrePrimaryGradesSlice.actions.ResetGetSubmitUnsubmitExamMarksStatusMsg());
};





export default AssignPrePrimaryGradesSlice.reducer;