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
  asStandardDivisionId: number;
  asAssessmentId: number;
  asIsPublished: string;
  asAcademic_Year_Id: number;
  asSchoolId: number;
  asInsertedById: number;
  asInsertDate: string;
}
export interface IGetUnPublishResltBody {
  asXseedResultPublishStatusId: number;
  asSchoolId: number;
  asAcademic_Year_Id: number;
  asAssessmentId: number;
  asStandardDivisionId: number;
  asUnPublishReason: string;
  asIsPublished: string;
  asUpdatedById: number;
  asUpdateDate: string;
}
