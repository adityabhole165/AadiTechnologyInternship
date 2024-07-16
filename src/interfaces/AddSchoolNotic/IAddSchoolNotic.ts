export interface IGetAllNoticeListBody {
  asSchoolId: number
  asDisplayLocation: string
  asShowAllNotices: boolean
  asText: boolean
  asSortExpression: string
  StartRowIndex: number
  MaximumRows: number
}


export interface IGetAllNoticeListResult {
  NoticeId: number
  NoticeName: string
  DisplayLocation: string
  StartDate: string
  EndDate: string
  dbSortOrder: number
  outSortOrder: number
  FileName: string
  IsSelected: boolean
  StartTime: string
  EndTime: any
  NoticeDescription: string
  NoticeImage: string
  RowNo1: string
}

export interface IUpdateSelectSchoolNoticeBody {
  asSchoolId: number | string;
  asNoticeXml: string;
}

export interface IDeleteSchooNoticeBody {
  asSchoolId: number | any;
  asNoticeId: number;
  asUpdatedById: number | any;
}

export interface IAddNoticeBody {
  asUserRoleIds: string;
  asClassIds: string;
  asSaveFeature: string;
  asFolderName: string;
  asBase64String: string;
  asBase64String2: string;
  NoticeId: number;
  NoticeName: string;
  DisplayLocation: string;
  StartDate: string;
  EndDate: string;
  SortOrder: number;
  FileName: string;
  IsSelected: boolean;
  IsText: boolean;
  NoticeContent?: any;
  UserId: number;
  SchoolId: number;
  InertedById: number;
  NoticeDescription: string;
  NoticeImage: string;
}

export interface IGetAllClassesAndDivisionsBody {
  asSchoolId: number;
  asAcademicYearId: number;
}
export interface IAllClassesAndDivisionsResult {
  SchoolWise_Standard_Division_Id: string;
  Standard_Id: string;
  Standard_Name: string;
  Division_Id: string;
  Division_Name: string;
}

export interface IGetUserRolesForSelectedNoticeIdBody {
  asSchoolId: number;
  asNoticeId: number;
}
export interface RoIGetUserRolesForSelectedNoticeIdResult {
  UserRoleId: string;
}
export interface IGetStandardDivisionsForSelectedNoticeIdBody {
  asSchoolId: number;
  asNoticeId: number;
}

export interface IGetStandardDivisionsForSelectedNoticeIdResult {
  StandardDivisionId: string;
}
export interface IGetStandardDivisionsForSelectedNoticeIdBody {
  asSchoolId: number;
  asNoticeId: number;
}
export interface IGetStandardDivisionsForSelectedNoticeIdResult {
  StandardDivisionId: string;
}
export interface ISaveUpdateSchoolNoticeBody {
  asUserRoleIds: string;
  asClassIds: string;
  asSaveFeature: string;
  asFolderName: string;
  asBase64String: string;
  asBase64String2: string;
  NoticeId: number;
  NoticeName: string;
  DisplayLocation: string;
  StartDate: string;
  EndDate: string;
  SortOrder: number;
  FileName: string;
  IsSelected: boolean;
  IsText: boolean;
  NoticeContent?: any;
  UserId: number;
  SchoolId: number;
  InertedById: number;
  NoticeDescription: string;
  NoticeImage: string;
}

export interface IEditSchoolNoticeDetailsBody {
  asSchoolId: number;
  asNoticeId: number;
}
export interface IEditSchoolNoticeDetailsResult {
  NoticeId: string;
  NoticeName: string;
  DisplayLocation: string;
  StartDate: string;
  EndDate: string;
  dbSortOrder: string;
  outSortOrder: string;
  FileName: string;
  NoticeContent: string;
  IsText: boolean;
  NoticeDescription: string;
  NoticeImage: string;
}