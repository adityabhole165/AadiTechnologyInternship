export interface IGetPrePrimaryResultBody {
  asSchoolId: number;
  asAcadmicYearId: number;
  asTeacher_id: number;
}

export interface IGetPrePrimaryResultResult {
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
