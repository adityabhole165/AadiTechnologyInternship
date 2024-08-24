export interface IGetSchoolNoticePopupBody {
    asDisplayLocation: string,
    asShowAllNotices: number,
    asSchoolId: number;
    asSortExpression: string;
    asStartIndex: number;
    asEndIndex: number;
    asLoginUserRoleId: number;
}

export interface IGetSchoolNoticePopupResult {
    SchoolNoticePopUP: [
        {
            NoticeId: string;
            NoticeName: string;
            DisplayLocation: string;
            StartDate: string;
            EndDate: string;
            dbSortOrder: string;
            outSortOrder: string;
            FileName: string;
            NoticeContent: string;
            RowNo1: string;
            ClassesIds: string;
        }
    ],
    FillUpcomingEvents: [
        {
            Event_Id: string;
            Event_Description: string;
            Event_Start_Date: string;
            Standard_Name: string;
            Standard_Id: string;
        }
    ]
}
