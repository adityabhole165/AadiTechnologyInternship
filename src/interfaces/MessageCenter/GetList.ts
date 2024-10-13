export interface IgetList {
  asUserId: string;
  asAcademicYearId: string;
  asUserRoleId: string;
  asSchoolId: string;
  asFilter: string;
  asPageIndex: number;
  asMonthId: string;
  abIsSMSCenter: string;
  asOperator: string;
  asDate: string;
  asSortExp: string;
  asSortDirection: string;
}

export interface GetMessagesResult {
  GetMessagesResult: [
    {
      Attachments: {};
      DetailsId: string;
      ReceiverDetailsId: string;
      DisplayText: string;
      Subject: string;
      IsAttachment: string;
      Attachment: string;
      Body: string;
      UserName: string;
      Date: String;
      FullDate: String;
      Time: string;
      RecieverName: string;
      IsDeletedFromUser: string;
      SenderUserId: string;
      SenderUserRoleId: string;
      IsDeleted: boolean;
      AcademicYearId: string;
      InsertedById: string;
      IsRead: string;
      IsAttachmentExist: boolean;
      IsNew: string;
      ReceiverUserRoleId: string;
      ReceiverUserId: string;
      SchoolId: string;
      SenderName: string;
      LoggedInUserNameForMessage: string;
      AttachmentDisplayName: string;
      MESSAGECOUNT: number;
      IsBdayApplicable: string;
      DateOfBirth: string;
      IsLockedUser: Boolean;
      Id: number;
      PageLabel: string;
      RequestReadReceipt: string;
    }
  ];
  UnreadMessageTotalCount: number;
}
export interface GetScheduledSMSResult {
  GetScheduledSMSResult: [
    {
      RequestReadReceipt: string;
      HasReadReceipt: string;
      Attachments: {};
      DetailsId: string;
      ReceiverDetailsId: string;
      DisplayText: string;
      Subject: string;
      IsAttachment: string;
      Attachment: string;
      Body: string;
      UserName: string;
      Date: String;
      Time: string;
      RecieverName: string;
      IsDeletedFromUser: string;
      SenderUserId: string;
      SenderUserRoleId: string;
      IsDeleted: boolean;
      AcademicYearId: string;
      InsertedById: string;
      IsRead: string;
      IsNew: string;
      ReceiverUserRoleId: string;
      ReceiverUserId: string;
      SchoolId: string;
      SenderName: string;
      LoggedInUserNameForMessage: string;
      AttachmentDisplayName: string;
      MESSAGECOUNT: number;
      IsBdayApplicable: string;
      DateOfBirth: string;
      IsLockedUser: Boolean;
      Id: number;
      PageLabel: string;
    }
  ];
}
export interface IUpdateReadReceiptStatusBody {
  asSchoolId: string;
  asAcademicYearId: string;
  asReceiverId: string;
  asRequestReadReceipt: string;
}

export interface IUpdateReadReceiptStatusResult {
  Message: string;
}
