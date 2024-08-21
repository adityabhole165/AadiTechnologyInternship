export interface IGetPrePrimaryResultBody {
  asSchoolId: number;
  asAcademicYearId: number;
}

export interface IGetPrePrimaryResultResult {
  SchoolWise_Standard_Division_Id: string;
  TeacherName: string;
  Teacher_Id: string;
}

export interface IGetAssessmentBody {
  asAcademicYearId: number;
  asSchoolId: number;
}
export interface IGetAssessmentResult {
  AssessmentId: string;
  Name: string;
}

export interface IGetClassTeacherXseedSubjectsBody {
  asSchoolId: number;
  asAcadmeicYearId: number;
  asStdDivId: number;
  asAssessmentId: number;
}
export interface IGetClassTeacherXseedSubjectsResult {
  listStandrdDetails: [
    {
      StandardDivisionID: string;
      SubjectId: string;
      Subject_Name: string;
      Original_Subject_Id: string;
      EditStatus: string;
      IsXseedSubject: string;
      IsPublished: string;
    }
  ];
  listpublishstatusDetails: [
    {
      StandardDivisionId: string;
      PublishStatus: string;
      IsPublished: string;
    }
  ];
}
export interface IGetPublishResltBody {
  asSchoolId: number
  asAcademic_Year_Id: number
  asStandardDivisionId: number
  asAssessmentId: number
  asUnPublishReason: string
  asInsertedById: number
  asUpdatedById: number
  IsPublish: boolean
}
export interface IGetUnPublishResltBody {
  asSchoolId: number
  asAcademic_Year_Id: number
  asStandardDivisionId: number
  asAssessmentId: number
  asUnPublishReason: string
  asInsertedById: number
  asUpdatedById: number
  IsPublish: boolean
}
