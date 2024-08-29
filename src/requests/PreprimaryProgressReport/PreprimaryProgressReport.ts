import { createSlice } from '@reduxjs/toolkit';
import ApiPreprimaryProgressReport from 'src/api/PreprimaryProgressReport/PreprimaryProgressReport';
import { IGetAllPrimaryClassTeacherssBody,GetStudentDetailsDropdownBody ,GetProgressReportDetailsBody, IGetStandardwiseAssessmentDetailsBody, ManageStudentWiseAssessmentGradesBody} from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';

import { AppThunk } from 'src/store';

const SlicePreprimaryProgressReport = createSlice({
  name: 'PrePrimaryResult',
  initialState: {
    ISAllPrimaryClassTeacherss: [],
    ISlistStudentNameDetails:[],
    ISlistAssessmentDetailss:[],
    ISAssessmentPublishStatus:[],
    ISFillStandardwiseSubjects:[],
    ISFillSubjectSections:[],
    ISFillSchoolDetails:[],
    ISFillGradeDetails:[],
    ISFillXseedRemarks:[],
    ISFillStudentDetails:[],
    ISFillStudentAttendance:[],
    ISFillStudentsLearningOutcomes:[],
    ISFillNonXseedSubjectGrades:[],
    ISGetStandardwiseAssessmentDetails:[],
    ISManageStudentWiseAssessmentGrades:""
    
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
      RAssessmentPublishStatus(state, action) {
        state.ISAssessmentPublishStatus = action.payload;
      },
      RFillStandardwiseSubjects(state, action) {
        state.ISFillStandardwiseSubjects = action.payload;
      },
      RFillSubjectSections(state, action) {
        state.ISFillSubjectSections = action.payload;
      },
      RFillSchoolDetails(state, action) {
        state.ISFillSchoolDetails = action.payload;
      },
      RFillGradeDetails(state, action) {
        state. ISFillGradeDetails = action.payload;
      },
      RFillXseedRemarks(state, action) {
        state. ISFillXseedRemarks = action.payload;
      },
      RFillStudentDetails(state, action) {
        state. ISFillStudentDetails = action.payload;
      },
      RFillStudentAttendance(state, action) {
        state. ISFillStudentAttendance = action.payload;
      },
      RFillStudentsLearningOutcomes(state, action) {
        state. ISFillStudentsLearningOutcomes = action.payload;
      },
      RFillNonXseedSubjectGrades(state, action) {
        state. ISFillNonXseedSubjectGrades = action.payload;
      },
      RGetStandardwiseAssessmentDetails(state, action) {
        state. ISGetStandardwiseAssessmentDetails = action.payload;
      },
      RManageStudentWiseAssessmentGrades(state, action) {
        state. ISManageStudentWiseAssessmentGrades = action.payload;
      },
      
      
  }
});

export const CDAAllPrimaryClassTeachers =
  (data: IGetAllPrimaryClassTeacherssBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPreprimaryProgressReport.AllPrimaryClassTeachers(data)

    let ClassTeachers = [{ Id: '-1', Name: 'Select', Value: '-1',Is_PrePrimary:'Y'}];
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



  export const CDAProgressReportDetails =
  (data: GetProgressReportDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPreprimaryProgressReport.ProgressReportDetails(data)
    const AssessmentPublishStatus = response.data.GetAssessmentPublishStatus.map((item, i) => ({
      AssessmentPublishStatus: item.AssessmentPublishStatus,
      StudentWiseAssessmentPublishStatus: item.StudentWiseAssessmentPublishStatus,
    }));
    const FillStandardwiseSubjects = response.data.FillStandardwiseSubjects.map((item, i) => ({
      SubjectName: item.SubjectName,
      SortOrder: item.SortOrder,
    }));
    const FillSubjectSections = response.data.FillSubjectSections.map((item, i) => ({
      SubjectSectionName: item.SubjectSectionName,
      SortOrder: item.SortOrder,
      StandardwiseSubjectId:item.StandardwiseSubjectId,
      SubjectSectionConfigurationId:item.SubjectSectionConfigurationId,
     
     
    }));
    const FillSchoolDetails = response.data.FillSchoolDetails.map((item, i) => ({
      OrganizationName: item.OrganizationName,
      School_Name: item.School_Name,
    }));
    let FillGradeDetails = [{ Id: '0', Name: 'Select', Value: '0',Description:'', SortOrder:'',ConsideredAsAbsent:'',ConsideredAsExempted:'',GradeId:'0'}];
    response.data.FillGradeDetails.map((item, i) => {
      FillGradeDetails.push({
      Id: item.GradeId,
      Name: item.GradeName,
      Value: item.GradeId,
      Description: item.Description,
      SortOrder: item.SortOrder,
      ConsideredAsAbsent: item.ConsideredAsAbsent,
      ConsideredAsExempted: item.ConsideredAsExempted,
      GradeId:item.GradeId
      
      });
    });
    const FillXseedRemarks = response.data.FillXseedRemarks.map((item, i) => ({
      YearwiseStudentId: item.YearwiseStudentId,
      Remark: item.Remark,

     

    }));
    const FillStudentDetails = response.data.FillStudentDetails.map((item, i) => ({
      YearWiseStudentId: item.YearWiseStudentId,
      RollNo: item.RollNo,
      StudentName: item.StudentName,
      Class: item.Class,
      AcademicYear: item.AcademicYear,
      Assessment: item.Assessment,
    }));
    const FillStudentAttendance = response.data.FillStudentAttendance.map((item, i) => ({
      YearwiseStudentId: item.YearwiseStudentId,
      IsPresent: item.IsPresent,
      
    }));
    
    
    const FillStudentsLearningOutcomes = response.data.FillStudentsLearningOutcomes.map((item, i) => ({
      YearwiseStudentId: item.YearwiseStudentId,
      LearningOutcomeConfigId: item.LearningOutcomeConfigId,
      SubjectSectionConfigId: item.SubjectSectionConfigId,
      LearningOutcomeGradeId: item.LearningOutcomeGradeId,
      LearningOutcome: item.LearningOutcome,
      GradeId: item.GradeId,
      ShortName: item.ShortName,
      SubjectSectionSortOrder: item.SubjectSectionSortOrder,
      LearningOutcomeSortOrder: item.LearningOutcomeSortOrder,
      
    }));

    const FillNonXseedSubjectGrades = response.data.FillNonXseedSubjectGrades.map((item, i) => ({
      YearwiseStudentId: item.YearwiseStudentId,
      AssessmentId: item.AssessmentId,
      SubjectId: item.SubjectId,
      SubjectName: item.SubjectName,
      GradeId: item.GradeId,
      ShortName: item.ShortName,
      Observation: item.Observation,
      Is_CoCurricularActivity: item.Is_CoCurricularActivity,
      
    }));


    
    dispatch(SlicePreprimaryProgressReport.actions.RAssessmentPublishStatus(AssessmentPublishStatus));
    dispatch(SlicePreprimaryProgressReport.actions.RFillStandardwiseSubjects(FillStandardwiseSubjects));
    dispatch(SlicePreprimaryProgressReport.actions.RFillSubjectSections(FillSubjectSections));
    dispatch(SlicePreprimaryProgressReport.actions.RFillSchoolDetails(FillSchoolDetails));
    dispatch(SlicePreprimaryProgressReport.actions.RFillGradeDetails(FillGradeDetails));
    dispatch(SlicePreprimaryProgressReport.actions.RFillXseedRemarks(FillXseedRemarks));
    dispatch(SlicePreprimaryProgressReport.actions.RFillStudentDetails(FillStudentDetails));
    dispatch(SlicePreprimaryProgressReport.actions.RFillStudentAttendance(FillStudentAttendance));
    dispatch(SlicePreprimaryProgressReport.actions.RFillStudentsLearningOutcomes(FillStudentsLearningOutcomes));
    dispatch(SlicePreprimaryProgressReport.actions.RFillNonXseedSubjectGrades(FillNonXseedSubjectGrades));

    
  };


  export const CDAGetStandardwiseAssessmentDetails =
  (data: IGetStandardwiseAssessmentDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPreprimaryProgressReport.GetStandardwiseAssessmentDetails(data)
    const SetAssessmentDetails = response.data.SetAssessmentDetails.map((item, i) => ({
      Id: item.AssessmentId,
      Name: item.AssessmentName,
      Value: item.AssessmentId,

    }));

    dispatch(SlicePreprimaryProgressReport.actions.RGetStandardwiseAssessmentDetails(SetAssessmentDetails));
  };
  export const CDAManageStudentWiseAssessmentGrades =
  (data: ManageStudentWiseAssessmentGradesBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPreprimaryProgressReport.ManageStudentWiseAssessmentGrades(data)
   

    dispatch(SlicePreprimaryProgressReport.actions.RManageStudentWiseAssessmentGrades(response.data));
  };




export default SlicePreprimaryProgressReport.reducer;
