export interface ISaveDraftMessageBody {
  aiDraftId: string;
  aoMessage: {
    SenderUserId: string;
    SchoolId: string;
    AcademicYearId: string;
    ReceiverUserId: string;
    DisplayText: string;
    Subject: string;
    Body: string;
    ReceiverUserIdCc: string;
    DisplayTextCc: string;
  };
}

export interface ISaveDraftMessageResult {
  Message: string;
}

export interface IGetAllDraftMessageBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
  aiUserId: string;
  asFilter: string;
  aiMonthId: string;
  asOperator: string;
  asDate: string;
  asSortExp: string;
  asSortDirection: string;
}

export interface IGetAllDraftMessageResult {
  Id: string;
  Subject: string;
  DraftDate: string;
  DisplayText: string;
  MessageBody: string;
  ReceipantList: string;
  Cc_DisplayText: string;
  Cc_ReciepientList: string;
}

export interface IGetAllDraftResult {
  GetAllDraftMessageDetails: [IGetAllDraftMessageResult];
  TotalCountLabel: string;
}

export interface IGetDraftMessageBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
  aiUserId: string;
  aiDraftId: string;
}

export interface IGetDraftMessageResult {
  GetDraftMessageDetails: [
    {
      Attachments: {};
      DetailsId: null;
      ReceiverDetailsId: null;
      DisplayText: string;
      Subject: string;
      IsAttachment: null;
      Attachment: null;
      Body: string;
      UserName: null;
      Date: string;
      Time: null;
      RecieverName: null;
      IsDeletedFromUser: null;
      SenderUserId: null;
      SenderUserRoleId: null;
      IsDeleted: null;
      AcademicYearId: null;
      InsertedById: null;
      IsRead: null;
      IsNew: null;
      ReceiverUserRoleId: null;
      ReceiverUserId: null;
      SchoolId: null;
      SenderName: string;
      LoggedInUserNameForMessage: null;
      AttachmentDisplayName: null;
      MESSAGECOUNT: number;
      IsBdayApplicable: boolean;
      DateOfBirth: null;
      IsLockedUser: boolean;
      Id: number;
      PageLabel: null;
      ScheduleDateTime: string;
      DisplayTextCc: string;
      ReceiverNameCc: null;
      ReceiverUserIdCc: null;
      RequestReadReceipt: null;
      IsAttachmentExist: boolean;
      HasReadReceipt: boolean;
      InsertDateInFormat: string;
      FullDate: string
    }
  ];
}

export interface IDeleteDraftMessageBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
  aiUserId: string;
  aiDraftId: string;
}

export interface IDeleteDraftMessageResult {
  Message: string;
}
