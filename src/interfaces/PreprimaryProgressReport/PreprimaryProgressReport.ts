export interface IGetAllPrimaryClassTeacherssBody {
  asSchoolId: number
  asAcadmicYearId: number
  asTeacher_id: number
}
export interface IGetAllPrimaryClassTeacherssResult {
  TeacherName: string
  Teacher_Id: string
  Designation_Id: string
  Teacher_First_Name: string
  Standard_Name: string
  Division_Name: string
  Original_Standard_Id: string
  Original_Division_Id: string
  SchoolWise_Standard_Division_Id: string
  Is_PrePrimary: string
}



export interface GetStudentDetailsDropdownBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardDivId: number
}

export interface GetStudentDetailsDropdownResult {
  listStudentNameDetails: [
    {
      YearwiseStudentId: string
      StudentName: string

    }
  ],
  listAssessmentDetailss: [
    {
      AssessmentId: string;
      Name: string;

    }
  ],



}



export interface GetProgressReportDetailsBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardDivisionId: number
  asYearwiseStudentId: number
  asAssessmentId: number
}




export interface GetProgressReportDetailsResult {
  FillStandardwiseSubjects: [
    {
      StandardDivisionId: string
      StandardSubjectId: string
      SubjectId: string
      SubjectName: string
      SortOrder: string

    }
  ],
  FillSubjectSections: [
    {
      SubjectSectionConfigurationId: string
      StandardwiseSubjectId: string
      SubjectSectionName: string
      SortOrder: string
      ShowSubjectRemarks: string
      SubjectId: string
    }
  ],
  FillStudentsLearningOutcomes: [
    {
      YearwiseStudentId: string
      LearningOutcomeConfigId: string
      SubjectSectionConfigId: string
      LearningOutcomeGradeId: string
      LearningOutcome: string
      GradeId: string
      ShortName: string
      SubjectSectionSortOrder: string
      LearningOutcomeSortOrder: string
    }
    

  ],

  FillNonXseedSubjectGrades: [
    {
      YearwiseStudentId: string
      AssessmentId: string
      SubjectId: string
      SubjectName: string
      GradeId: string
      ShortName: string
      Observation: string
      Is_CoCurricularActivity: string
    }

  ],



  FillSchoolDetails: [
    {
      OrganizationName: string
      School_Name: string

    }
  ],




  FillStudentDetails: [
    {
      YearWiseStudentId: string
      RollNo: string
      StudentName: string
      Class: string
      AcademicYear: string
      Assessment: string
    }

  ],




  FillGradeDetails: [
    {
      GradeId: string
      GradeName: string
      Description: string
      SortOrder: string
      ConsideredAsAbsent: string
      ConsideredAsExempted: string
    }
  ],
  FillStudentAttendance: [
    {
      YearwiseStudentId: string,
      IsPresent: boolean,
  }

  ],
  FillStudentsLearningOutcomeObservations: [
    {
      YearwiseStudentId: string,
      LearningOutcomesObservationId: string,
      SubjectSectionConfigurationId: string,
      Observation: string
  }

  ],


  GetAssessmentPublishStatus: [

    {
      AssessmentPublishStatus: string
      StudentWiseAssessmentPublishStatus: string
    }

  ],
  FillXseedRemarks: [

    {
      YearwiseStudentId: string
      Remark: string
    }

  ],
  FillSubjectRemarks: [



  ],
}


export interface IGetStandardwiseAssessmentDetailsBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardId: number
  
}

export interface IGetStandardwiseAssessmentDetailsResult {
  SetAssessmentDetails: [
    {
      StandardwiseAssessmentId: string
      AssessmentId: string
      AssessmentName: string
      StartDate: string
      EndDate: string
      IsFinalAssessment: string
      IsDeleted: string
      SortOrder: string

    }
  ],
  setAcademicYearDates: [
    {
      StdStartDate: string
      StdEndDate: string
    }
  ],



}


export interface ManageStudentWiseAssessmentGradesBody {
  asSchoolId: number
  asAcademicYearId: number
  asYearwiseStudentId: number
  asStandardDivisionId: number
  asAssessmentId: number
  asInsertedById: number
  asLearningOutcomeXML: string
  asXseedGradesXML: string
  asMode: string
  asRemark: string
}