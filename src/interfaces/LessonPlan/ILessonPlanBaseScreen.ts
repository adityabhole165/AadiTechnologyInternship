export interface IGetLessonPlanListBody {
  asSchoolId: number
  asAcadmicYearId: number
  asUserId: number
  asReportingUserId: number
  asStartIndex: number
  asEndIndex: number
  asRecordCount: boolean
  asStartDate: any
  asEndDate: any
}
export interface IGetLessonPlanListResult {
  listResult1st: [{
    StartDate: string
    EndDate: string
    IsSubmitted: string
    UserId: string
    Remarks: string
    IsSuggisionAdded: string
    IsSuggisitionRead: string
    RecordCount: string,
    SubmitedByReportingUser: string
  }];
  listResult2nd: [{
    ReportingUserId: string
    ApprovalSortOrder: string
    ReportingUserName: string
    StartDate: string
    EndDate: string
    IsSubmitted: string
    MinDate: string
    MaxDate: string
  }
  ]
}



export interface IDeleteLessonPlanBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUpdatedById: number;
  asUserId: number;
  asStartDate: string;
  asEndDate: string;
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

export interface IAddOrEditLessonPlanDetailsBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardDivId: number
  asUserId: number
  asReportingUserId: number
  asStartDate: string
  asEndDate: string
  IsNewMode: boolean
}

export interface IAddOrEditLessonPlanDetailsResult {
  LessonPlanParametersList: [{
    Id: string
    Title: string
    SortOrder: string
    LessonPlanCategoryId: string
    SubjectCategoryId: string
    ParentParameterId: string
    ParentParameter: string
  }]

  GetTeacherSubjectList: [{
    StdDivId: string
    SubjectId: string
    Subject_Name: string
    ClassName: string
    LessonPlanCategoryId: string
    Standard_Id: string
    SubjectCategoryId: string
  }]
  GetTeacherName: [{
    TeacherName: string
    ClassName: string
    SubjectName: string
  }]
  GetLessonPlanReportingConfigList: [{
    Id: string
    UserId: string
    UserName: string
    ReportingUserId: string
    ReportingUserName: string
    IsFinalApprover: string
    ApprovalSortOrder: string
  }]
  GetLessonPlanCommentList: any[]
  GetLessonPlanStatusList: any[]
  GetEnableButtonList: [{
    EnableSaveButton: string
    EnableSubmitButton: string
    EnableRejectButton: string
  }
  ]
  GetStandardDivisionIds: [{
    StandardDivisionIds: string
  }
  ]
  GetLessonPlanPhrasesList: any[]
}


export interface IGetAllTeachersOfLessonPlanBody {
  asSchoolId: number
  asAcademicYearId: number
  asReportingUserId: number
  asIsFullAccess: string
}



export interface IGetAllTeachersOfLessonPlanResult {
  UserId: string
  UserName: string
}


export interface IGetAllLessonPlanReportingConfigsBody {
  asSchoolId: number
  asAcademicYrId: number
  asUserId: number
}

export interface IGetAllLessonPlanReportingConfigsResult {
  ReportingUserId: string
  ApprovalSortOrder: string
  ReportingUserName: string
  StartDate: string
  EndDate: string
  IsSubmitted: string
  MinDate: string
  MaxDate: string
}

export interface IUpdateReadSuggestionBody {
  asSchoolId: number
  asAcadmicYearId: number
  asUpdatedById: number
  asUserId: number
  asStartDate: string
  asEndDate: string
}

export interface IGetLessonPlanRecordCountBody {
  asSchoolId: number
  asAcadmicYearId: number
  asUserId: number
  asReportingUserId: number
  asStartIndex: number
  asEndIndex: number
  asStartDate: any
  asEndDate: any
}

export interface IGetLessonPlanRecordCountResult {
  RecordCount: string
}