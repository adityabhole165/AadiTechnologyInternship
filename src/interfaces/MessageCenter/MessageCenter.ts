export interface ITrashList  {
    asUserId : string,
    asAcademicYearId : string,
    asUserRoleId: string,
    asSchoolId: string,
    asFilter : string,
    asPageIndex : string,
    asMonthId : string,
    abIsSMSCenter: string
}

export interface GetTrashMessagesResult {
    DetailsId:    string;
    Subject:       string;
    Time:  string;
    UserName: string;
    Date : string,
}

export interface IUserGroupList {
    asAcademicYearId:string,
    asSchoolId:string,
    asStdDivId:string,
    asUserId:string,
    asSelectedUserGroup:string,
    abIsSMSCenter:boolean
}

export interface IGetUsersInGroupResult {
    Name:string,
    Id:string
}

export interface IAdminStaffList {
    Name:string
    Id:string
}

export interface  ISendMessage {
    asSchoolId: string,
    aoMessage: {
        Body: string,
        Subject: string,
        SenderName: string,
        DisplayText: string,
        SenderUserId: string,
        SenderUserRoleId:string,
        AcademicYearId: string,
        SchoolId: string,
        InsertedById: string,
        Attachment: string,
      
    }
    asSelectedUserIds: string,
    asSelectedStDivId: string,
    asIsSoftwareCordinator: number,
    asMessageId: number,
    asSchoolName: string,
    asIsForward:string,
    sIsReply:string,
    attachmentFile:AttachmentFile[],
    asFileName:string
}

export interface AttachmentFile {
    FileName : string,
    Base64URL: string
}


