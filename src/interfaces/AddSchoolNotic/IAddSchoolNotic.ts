export interface IGetAllNoticeListBody {
  asSchoolId: number,
  asDisplayLocation: string,
  asShowAllNotices: boolean,
  asText: boolean,
  asSortExpression: string,
  StartRowIndex: number,
  MaximumRows: number,
}
export interface IGetAllNoticeListResult {
  NoticeId: number,
  NoticeName: string,
  DisplayLocation: string,
  StartDate: string,
  EndDate: string,
  dbSortOrder: number,
  outSortOrder: number,
  FileName: string,
  IsSelected: boolean,
  StartTime: string,
  EndTime: null,
  NoticeDescription: string,
  NoticeImage: string,
  RowNo1: string,
}

export interface IUpdateSelectSchoolNoticeBody {
  asSchoolId: number,
  asNoticeXml: string,
}

export interface IDeleteSchooNoticeBody {
  asSchoolId: number,
  asNoticeId: number,
  asUpdatedById: number,
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