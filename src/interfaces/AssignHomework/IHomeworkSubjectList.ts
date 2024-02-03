export interface IGetSubjectListForTeacherBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardDivisionId: number;
  asHomeWorkStatus: string;
  asHomeworkTitle: string;
  asAssignedDate: string;
}

export interface IGetSubjectListForTeacherResult {
  Id: string;
  Title: string;
  AttachmentPath: string;
  AssignedDate: string;
  CompleteByDate: string;
  IsPublished: string;
  Subject: string;
  SubjectId: string;
  StandardDivisionId: string;
  className: string;
  Details: string;
  flag: string;
}
export interface IPublishUnPublishHomeworkBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asHomeworkId: number;
  asReason: string;
  asUpdatedById: string;
  asIsPublish: boolean;
  asIsSMSSent: boolean;
}
export interface IGetAllHomeworkDocumentsBody {
  asSchoolId: number;
  asHomeworkId: number;
  asAcademicyearId: number;
}
export interface IGetAllHomeworkDocumentsResult {
  Id: number;
  AttachmentName: string;
  HomeworkId: string;
  SchoolId: string;
  AcademicYearId: string;
  IsDeleted: false;
  InsertedById: string;
  InsertDate: string;
  UpdatedById: number;
  UpdateDate: string;
}

export interface IDeleteHomeworkBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asHomeworkId: number;
  asUpdatedById: number;
}

export interface IGetHomeworkDetailBody {
  asSchoolId: number;
  asAcademicyearId: number;
  asHomeworkId: number;
}
export interface IGetHomeworkDetailResult {
  Id: number;
  Title: string;
  AttachmentPath: string;
  AssignedDate: string;
  CompleteByDate: string;
  IsPublished: boolean;
  Subject: string;
  StandardDivisionId: null;
  Details: string;
  SubjectId: number;
  flag: string;
}
