export interface ISaveDailyLogBody {
  aHomeWorkLogId: number;
  asStdDivId: number;
  asDate: string;
  asAttachmentName: string;
  asSchoolId: number;
  asAcademicYearId: number;
  asInsertedById: number;
  asSaveFeature: string;
  asFolderName: string;
  asBase64String: string;
}

export interface ISaveDailyLogResult {}

export interface IGetAllHomeworkDailyLogsBody {
  asSchoolId: number;
  asFilter: string;
  asStdDivId: number;
  asSortExpression: string;
  asStartIndex: number;
  asEndIndex: number;
  asUserId: number;
}

export interface IGetAllHomeworkDailyLogsResult {
  Id: string;
  Date: string;
  AttchmentName: string;
  IsPublished: string;
  TotalRows:string
}

export interface IGetHomeworkDailyLogBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aId: number;
}

export interface IGetHomeworkDailyLogResult {
  Date: string;
  AttchmentName: string;
}

export interface IDeleteHomeworkDailyLogBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asId: number;
  asUpdatedById: number;
}

export interface IDeleteHomeworkDailyLogResult {}


export interface IPublishUnpublishHomeworkDailylogBody {
  asSchoolId: number
  asAcademicYearId: number
  asLogId: number
  asUpdatedById: number
  asIsPublished: boolean
}
export interface IPublishUnpublishHomeworkDailylogResult {}

