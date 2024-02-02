export interface IGetLessonPlanListBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUserId: number;
  asReportingUserId: number;
  asStartIndex: number;
  asEndIndex: number;
  asIsRecordCount: number;
  asStartDate: string;
  asEndDate: string;
  asRecordCount: number;
}

export interface IGetLessonPlanListResult {
  StartDate: string;
  EndDate: string;
  IsSubmitted: string;
  UserId: string;
  Remarks: string;
  IsSuggisionAdded: string;
  IsSuggisitionRead: string;
  SubmitedByReportingUser: string;
}

export interface IDeleteLessonPlanBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUpdatedById: number;
  asUserId: number;
  aasStartDate: string;
  aasEndDate: string;
}

export interface IGetLessonPlanDetailsForReportBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asStartDate: string;
  asEndDate: string;
  asUserId: Number;
  asStandardDivisionId: Number;
  asSubjectId: Number;
}
export interface IGetLessonPlanDetailsForReportResult {
  SrNo: string;
  SubSrNo: string;
  StartDate: string;
  EndDate: string;
  UserId: string;
  UserName: string;
  StandardSubject: string;
  ParameterId: string;
  Parameter: string;
  Comment: string;
  LessonPlanConfigId: string;
  SubmitDate: string;
  ParentParameterId: string;
  SubjectStartDate: string;
  SubjectEndDate: string;
  SubStartDate: string;
  SubEndDate: string;
}
