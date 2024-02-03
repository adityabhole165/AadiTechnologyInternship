export interface IGetDatewiseHomeworkDetailsBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
  aiStandardDivisionId: string;
  asStartdate: string;
  asEnddate: string;
}

export interface IGetDatewiseHomeworkDetailsResult {
  HomeworkDetails: [HomeworkDetails];
  HomeworkDates: string[];
  HomeworkDateStatus: HomeworkDateStatus;
}

export interface HomeworkDateStatus {
  AllowPrevious: boolean;
  AllowNext: boolean;
  MinDate: string;
  MaxDate: string;
}

export interface HomeworkDailyLogsBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
  aiStandardDivisionId: string;
  aiMonthId: string;
  asYear: string;
}

export interface HomeworkDailyLogsResult {
  Date: string;
  AttachmentPath: string;
}

export interface HomeworkDailyResult {
  GetStudentDailyLogDetails: [HomeworkDailyLogsResult];
}

export interface HomeworkDetails {
  Id: number;
  Title: string;
  AttachmentPath: string;
  AssignedDate: string;
  CompleteByDate: string;
  IsPublished: boolean;
  SubjectName: string;
  SubjectId: number;
  StandardDivisionId: null;
  className: null;
  Details: string;
  MoreAttachments: null;
  MinDate: string;
  MaxDate: string;
}
export interface HomeWork {
  HomeworkDates: IGetDatewiseHomeworkDetailsResult;
}
