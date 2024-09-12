//Sms center list
export interface ISmsList {
  asSchoolId: string;
  asAcademicYearId: string;
  asUserId: string;
  asReceiverUserRoleId: string;
  asPageIndex: number;
}
export interface GetSMSListResult {
  Date: string;
  ID: string;
  RecieverMobileNumber: string;
  Subject: string;
  UserName: string;
  UserId: string;
  SubReadMessageFlagject: string;
  RecieverDetailsId: string;
  DisplayText: string;
  SenderName: string;
  TotalRecords: string
}
//Sms center list
export interface INewSmsList {
  asSchoolId: string;
  asAcademicYearId: string;
  asUserId: string;
  asReceiverUserRoleId: string;
  asStartIndex: number;
  asPageSize: number;
}

export interface GetNewSMSListResult {
  Date: string;
  RowID: string;
  RecieverMobileNumber: string;
  SMS_Id: string;
  Subject: string;
  UserName: string;
  UserId: string;
  ReadMessageFlag: string;
  RecieverDetailsId: string;
  DisplayText: string;
  TotalRows: string
}

//Mobile number

export interface IMobileNumber {
  asSchoolId: string;
  asAcademicYearId: string;
  asUserId: string;
  asUserRoleId: string;
}
export interface GetUserMobileNumberResult {
  GetUserMobileNumberResult: string;
}

//View SMS details

export interface IViewSms {
  asSchoolId: string;
  asSMSId: string;
  asUserRoleId: string;
  asUserId: string;
  asAcademicYearId: string;
}
export interface GetSMSDetailsResult {
  UserName: string;
  Date: string;
  DisplayText: string;
  Subject: string;
}
