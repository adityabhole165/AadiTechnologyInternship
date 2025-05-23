export default interface ISentMsg {
  asUserId: string;
  asAcademicYearId: string;
  asUserRoleId: string;
  asSchoolId: string;
  abIsSMSCenter: string;
  asFilter: string;
  asPageIndex: string;
  asMonthId: string;
}

export interface GetAllSentSMSResult {
  AcademicYearId: null;
  Attachment: null;
  AttachmentDisplayName: null;
  Attachments: object;
  Body: null;
  Date: string;
  DateOfBirth: null;
  DetailsId: string;
  DisplayText: string;
  Id: number;
  InsertedById: null;
  IsAttachment: null;
  IsBdayApplicable: boolean;
  IsDeleted: null;
  IsDeletedFromUser: null;
  IsLockedUser: boolean;
  IsNew: null;
  IsRead: string;
  LoggedInUserNameForMessage: null;
  MESSAGECOUNT: number;
  PageLabel: null;
  ReceiverDetailsId: null;
  ReceiverUserId: null;
  ReceiverUserRoleId: null;
  RecieverName: null;
  SchoolId: null;
  SenderName: null;
  SenderUserId: string;
  SenderUserRoleId: null;
  Subject: string;
  Time: string;
  UserName: string;
}
