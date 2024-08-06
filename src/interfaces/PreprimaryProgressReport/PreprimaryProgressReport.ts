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

  ],

  FillStudentsLearningOutcomeObservations: [

  ],



  FillNonXseedSubjectGrades: [

  ],



  FillSchoolDetails: [
    {
      OrganizationName: string
      School_Name: string

    }
  ],




  FillStudentDetails: [

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

