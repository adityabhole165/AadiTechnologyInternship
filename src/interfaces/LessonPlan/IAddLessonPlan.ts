export interface IClassListBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aTeacherId: number;
}

export interface IClassListResult {
  Standard_Division_Id: string;
  StandardDivision: string;
}

export interface IAddOrEditLessonPlanDetailsBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStandardDivId: number,
  asUserId: number,
  asReportingUserId: number,
  asStartDate: string,
  asEndDate: string,
  IsNewMode: boolean
}
export interface IAddOrEditLessonPlanDetailsResult {
  LessonPlanParametersList: [{
    Id: string,
    Title: string,
    SortOrder: string,
    LessonPlanCategoryId: string,
    SubjectCategoryId: string,
    ParentParameterId: string,
    ParentParameter: string
  }],
  GetTeacherSubjectList: [{
    StdDivId: string,
    SubjectId: string,
    Subject_Name: string,
    ClassName: string,
    LessonPlanCategoryId: string,
    Standard_Id: string,
    SubjectCategoryId: string
  }],
  GetTeacherName: [{
    TeacherName: string,
    ClassName: string,
    SubjectName: string
  }],
  GetLessonPlanReportingConfigList: [{
    Id: string,
    UserId: string,
    UserName: string,
    ReportingUserId: string,
    ReportingUserName: string,
    IsFinalApprover: string,
    ApprovalSortOrder: string
  }],
  GetLessonPlanCommentList: [{
    Id: string,
    StdDivId: string,
    SubjectId: string,
    ReportingUserId: string,
    ParameterId: string,
    Comment: string,
    SubjectStartDate: string,
    SubjectEndDate: string
  }],
  GetLessonPlanStatusList: [],
  GetEnableButtonList: [{
    EnableSaveButton: string,
    EnableSubmitButton: string,
    EnableRejectButton: string
  }],
  GetStandardDivisionIds: [{
    StandardDivisionIds: string
  }],
  GetLessonPlanPhrasesList: []
}
export interface ISaveLessonPlanBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUserId: number;
  asReportingUserId: number;
  aasStartDate: string;
  aasEndDate: string;
  asLessonPlanXml: string;
  asUpdatedById: number;
  asOldStartDate: string;
  asOldEndDate: string;
}
export interface ISubmitLessonPlanBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asUserId: number,
  asReportingUserId: number,
  aasStartDate: string,
  aasEndDate: string,
  asUpdatedById: number
}
export interface ISaveApproverCommentBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asUserId: number,
  asReportingUserId: number,
  aasStartDate: string,
  aasEndDate: string,
  asApproverComment: string,
  asUpdatedById: number,
  asOldStartDate: string,
  asOldEndDate: string
}
