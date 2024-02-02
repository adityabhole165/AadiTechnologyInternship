export default interface AScheduledSMSListBody {
  asUserId: string;
  asAcademicYearId: string;
  asUserRoleId: string;
  asSchoolId: string;
}
export interface GetScheduledSMSResult {
  Attachments: object;
  DetailsId: string;
  ReceiverDetailsId: null;
  DisplayText: string;
  Subject: string;
  IsAttachment: null;
  Attachment: null;
  Body: null;
  UserName: string;
  Date: string;
  Time: string;
  RecieverName: null;
  IsDeletedFromUser: null;
  SenderUserId: string;
  SenderUserRoleId: null;
  IsDeleted: null;
  AcademicYearId: null;
  InsertedById: null;
  IsRead: string;
  IsNew: null;
  ReceiverUserRoleId: null;
  ReceiverUserId: null;
  SchoolId: null;
  SenderName: null;
  LoggedInUserNameForMessage: null;
  AttachmentDisplayName: null;
  MESSAGECOUNT: number;
  IsBdayApplicable: boolean;
  DateOfBirth: null;
  IsLockedUser: boolean;
  Id: number;
  PageLabel: null;
}

// For View
export interface GetScheduledSMSDetails {
  asSchoolId: string;
  asSMSId: string;
  asUserRoleId: string;
  asUserId: string;
  asAcademicYearId: string;
}

export interface GetSMSDetailsResult {
  ID: string;
  Subject: string;
  UserName: string;
  UserId: null;
  ReadMessageFlag: null;
  RecieverDetailsId: null;
  RecieverMobileNumber: null;
  DisplayText: string;
  SenderName: null;
  Date: string;
}
