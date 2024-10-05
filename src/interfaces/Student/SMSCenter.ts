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
  asSchoolId: number;
  asSMSId: number;
}
export interface GetSMSDetailsResult {
  SMS_Id: number;
  Sender_Name: string;
  SMS_Text: string;
  SMS_Count: string;
  Display_Text: string;
  Is_DeletedFromUser: string;
  Sender_User_Role_Id: number;
  Sender_User_Id: number;
  School_Id: number;
  academic_Year_Id: number;
  Is_Deleted: string;
  Insert_Date: string;
  Inserted_By_Id: string;
  Updated_Date: string;
  Updated_By_Id: string;
}

export interface ISmsCountBody {
  asUserId: string;
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface ISmsCountResult {
  IsAllSentSMSAllowed: boolean;
  SentSMSCount: string;
  AllowedSMSCount: string;
  ExceededSMSCount: string;
}

export interface IGetSentSMSBody {
  asSchoolId: string;
  aoMessage: {
    Body: string;
    Subject: string;
    SenderName: string;
    DisplayText: string;
    SenderUserId: string;
    SenderUserRoleId: string;
    AcademicYearId: string;
    SchoolId: string;
    InsertedById: string;
    Attachment: string;
  }
  asSelectedUserIds: string;
  asSelectedStDivId: string;
  asIsSoftwareCordinator: number;
  asMessageId: number;
  sIsReply: string;
  asIsForward: string;
  asSchoolName: string;
  asTemplateRegistrationId: string;
}


export interface IGetSentSMSResult {
  boolean;
}