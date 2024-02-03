export interface IInboxList {
  asUserId: string;
  asAcademicYearId: string;
  asUserRoleId: string;
  asSchoolId: string;
  abIsSMSCenter: string;
  asFilter: string;
  asPageIndex: string;
  asMonthId: string;
}
export interface GetInboxMessageResult {
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
export default interface IViewInbox {
  asSchoolId: string;
  asMessageDetailsId: string;
  asReceiverId: string;
  asAcademicYearId: string;
}
