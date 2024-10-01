import { createSlice } from '@reduxjs/toolkit';
import ApiAssignPrePrimaryGrades from 'src/api/AssignPrePrimaryGrades/ApiAssignPrePrimaryGrades';
import {
  IGetGetStudentsForNonXseedSubjects,
  IGetInsertStudentGradesBody,
  IGetLearningOutcomesForSubjectSectionBody,
  IGetStudentsForStdDevMasters,
  IGetSubmitUnsubmitExamMarksStatusBody,
  IGetTeacherDropdownBody,
  IGetTeacherXseedSubjectsBody,
  IGetTestwiseTermBody,
  IGetXseedStudentsInfoBody,
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
    ISXseedStudentsList: [],
    ISXseedSubjectSectionList: [],
    ISXseedGradesList: [],
    ISListLearningOutcomeDetails: [],
    ISInsertStudentGradesMsg: '',
    ISListObsDetails: [],
    Loading: true
  },
  reducers: {
    RISListObsDetails(state, action) {
      state.ISListObsDetails = action.payload;
      state.Loading = false;
    },
    RInsertStudentGradesMsg(state, action) {
      state.ISInsertStudentGradesMsg = action.payload;
      state.Loading = false;
    },
    RClearInsertStudentGradesMsg(state) {
      state.ISInsertStudentGradesMsg = '';
      state.Loading = false;
    },
    RLearningOutcomesForSubjectSection(state, action) {
      state.ISListLearningOutcomeDetails = action.payload;
      state.Loading = false;
    },
    RXseedGradesList(state, action) {
      state.ISXseedGradesList = action.payload;
      state.Loading = false;
    },
    RGetTestwiseTerm(state, action) {
      state.ISGetTestwiseTerm = action.payload;
      state.Loading = false;
    },
    RXseedStudentsList(state, action) {
      state.ISXseedStudentsList = action.payload;
      state.Loading = false;
    },
    RXseedSubjectSectionList(state, action) {
      state.ISXseedSubjectSectionList = action.payload;
      state.Loading = false;
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
      state.Loading = false;
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
    getLoading(state, action) {
      state.Loading = true;
    },
  }
});



export const CDAGetNonXseedStudentsObs =
  (data: IGetGetStudentsForNonXseedSubjects): AppThunk =>
    async (dispatch) => {
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
      const response = await ApiAssignPrePrimaryGrades.GetStudentsForNonXseedSubjectWithObs(
        data
      );

      let NonXseedStudentsObs = response.data.map((item, i) => {
        return {
          Text1: item.Roll_No,
          Text2: item.StudentName,
          Text3: item.GradeId.toString(),
          Text4: item.Observation,
          Text5: item.YearwiseStudentId
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
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
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

      let GradesList = [{ Id: 0, Name: 'Select', Value: "0-0-0", isAbsent: '0', isExempted: '0' }];
      response.data.listGradesDetails.map((item, i) => {
        GradesList.push({
          Id: item.GradeId,
          Name: item.GradeName,
          Value: `${item.GradeId.toString()}-${item.ConsideredAsAbsent.toString()}-${item.ConsideredAsExempted.toString()}`,
          isAbsent: item.ConsideredAsAbsent.toString(),
          isExempted: item.ConsideredAsExempted.toString()
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

export const CDALearningOutcomesForSubjectSection =
  (data: IGetLearningOutcomesForSubjectSectionBody): AppThunk =>
    async (dispatch) => {
      dispatch((AssignPrePrimaryGradesSlice.actions.getLoading(true)));
      const response = await ApiAssignPrePrimaryGrades.GetLearningOutcomesForSubjectSectionApi(data);
      let learningOutcomeforSubsection = response.data.listLearningOutcomeDetails.map((item, i) => {
        return (
          {
            Text1: item.LearningOutcomeConfigId,
            Text2: item.LearningOutcome,
            Text3: item.IsSubmitted,
            Text4: item.GradeId,
            Text5: item.LearningOutcomeGradeId
          }
        )
      });
      let listObservationDetails = response.data.listObservationDetails.map((item, i) => {
        return (
          {
            obs: item.Observation,
            LearningOutcomeObsId: item.LearningOutcomesObservationId,
            subRemark: item.SubjectRemark,
            showSubRemark: item.ShowSubjectRemark
          }
        )
      })
      dispatch(AssignPrePrimaryGradesSlice.actions.RLearningOutcomesForSubjectSection(learningOutcomeforSubsection));
      dispatch(AssignPrePrimaryGradesSlice.actions.RISListObsDetails(listObservationDetails));
    }

export const CDAGetTeacherDropdown =
  (data: IGetTeacherDropdownBody): AppThunk =>
    async (dispatch) => {
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
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
          IsXseed: item.IsXseedSubject,
          Text1: item.StandardDivision,
          Text2: item.Subject_Name,
          Text3: item.EditStatus,
          Text4: item.SubmitStatus,
          Text5: item.IncompleteRollNoString,
          Text6: item.IsPublished
        };
      });

      dispatch(
        AssignPrePrimaryGradesSlice.actions.RGetTeacherXseedSubjects(
          TeacherXseedSubjects
        )
      );
    };

export const CDAXseedStudentsdata =
  (data: IGetXseedStudentsInfoBody): AppThunk =>
    async (dispatch) => {
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
      const response = await ApiAssignPrePrimaryGrades.GetXseedStudentsDataApi(data);
      const XseedGradeDropdownList = response.data.listGradesDetails.map((item, i) => {
        return (
          {
            Id: item.GradeId.toString(),
            Name: item.GradeName,
            Value: item.GradeId.toString()
          }
        )
      })
      XseedGradeDropdownList.unshift({ Id: '0', Name: 'Select', Value: '0' })
      const XseedStudentsList = response.data.listYearwiseStudentDetails.map((item, i) => {
        return (
          {
            Id: item.YearWise_Student_Id.toString(),
            Name: item.StudentName,
            Value: item.YearWise_Student_Id.toString()
          }
        )
      });
      XseedStudentsList.unshift({ Id: '0', Name: 'Select', Value: '0' })
      const XseedSubjectSectionList = response.data.SubjectSectionDetails.map((item, i) => {
        return (
          {
            Id: item.SubjectSectionConfigurationId.toString(),
            Name: item.SubjectSectionName,
            Value: item.SubjectSectionConfigurationId.toString()
          }
        )
      });
      XseedSubjectSectionList.unshift({ Id: '0', Name: 'Select', Value: '0' })
      dispatch(AssignPrePrimaryGradesSlice.actions.RXseedGradesList(XseedGradeDropdownList))
      dispatch(AssignPrePrimaryGradesSlice.actions.RXseedStudentsList(XseedStudentsList))
      dispatch(AssignPrePrimaryGradesSlice.actions.RXseedSubjectSectionList(XseedSubjectSectionList))
    }

export const CDAGetStudentsForNonXseedSubjects =
  (data: IGetGetStudentsForNonXseedSubjects): AppThunk =>
    async (dispatch) => {
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
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
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
      const response = await ApiAssignPrePrimaryGrades.SubmitExamMarksStatus(
        data
      );
      console.log(response, 'response----------');

      dispatch(
        AssignPrePrimaryGradesSlice.actions.RSubmitExamMarksStatus(response.data)
      );
    };

export const CDAInsertStudentGrades =
  (data: IGetInsertStudentGradesBody): AppThunk =>
    async (dispatch) => {
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
      const response = await ApiAssignPrePrimaryGrades.GetInsertStudentGradesApi(data);
      dispatch(AssignPrePrimaryGradesSlice.actions.RInsertStudentGradesMsg(response.data));
    };

export const CDAClearInsertStudentGrades =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(AssignPrePrimaryGradesSlice.actions.getLoading(true));
      dispatch(AssignPrePrimaryGradesSlice.actions.RClearInsertStudentGradesMsg());
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