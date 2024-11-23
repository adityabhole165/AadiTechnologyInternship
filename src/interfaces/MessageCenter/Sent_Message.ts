export interface ISentList {
  asUserId: string;
  asAcademicYearId: string;
  asUserRoleId: string;
  asSchoolId: string;
  abIsSMSCenter: string;
  asFilter: string;
  asPageIndex: string;
  asMonthId: string;
}
export interface GetSentListResult {
  AcademicYearId: string;
  Attachment: string;
  AttachmentDisplayName: string;
  Attachments: string;
  Body: string;
  Date: string;
  DateOfBirth: string;
  DetailsId: string;
  DisplayText: string;
  Id: string;
  InsertedById: string;
  InsertDateInFormat: string;
  IsAttachment: string;
  IsBdayApplicable: string;
  IsDeleted: string;
  IsDeletedFromUser: string;
  IsLockedUser: string;
  IsNew: string;
  IsRead: string;
  LoggedInUserNameForMessage: string;
  MESSAGECOUNT: string;
  PageLabel: string;
  ReceiverDetailsId: string;
  ReceiverUserId: string;
  ReceiverUserRoleId: string;
  RecieverName: string;
  SchoolId: string;
  SenderName: string;
  SenderUserId: string;
  SenderUserRoleId: string;
  Subject: string;
  Time: string;
  UserName: string;
  DisplayTextCc: string;
  ReceiverUserIdCc: string;
  ScheduleDateTime: string;
  ReceiverNameCc: string;
  RequestReadReceipt: string;
  HasReadReceipt: string;
  FullDate: string
}

// view sent
export interface IViewSent {
  asSchoolId: string;
  asMessageDetailsId: string;
  asReceiverId: string;
  asAcademicYearId: string;
}

export interface GetViewMessageResult {
  AcademicYearId: string;
  Attachment: string;
  AttachmentDisplayName: string;
  Attachments: string[];
  Body: string;
  Date: string;
  DateOfBirth: string;
  DetailsId: string;
  DisplayText: string;
  Id: string;
  InsertedById: string;
  IsAttachment: string;
  IsBdayApplicable: string;
  IsDeleted: string;
  IsDeletedFromUser: string;
  IsLockedUser: string;
  IsNew: string;
  IsRead: string;
  LoggedInUserNameForMessage: string;
  MESSAGECOUNT: string;
  PageLabel: string;
  ReceiverDetailsId: string;
  ReceiverUserId: string;
  ReceiverUserRoleId: string;
  RecieverName: string;
  SchoolId: string;
  SenderName: string;
  SenderUserId: string;
  SenderUserRoleId: string;
  Subject: string;
  Time: string;
  UserName: string;
}
