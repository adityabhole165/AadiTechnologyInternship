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
  