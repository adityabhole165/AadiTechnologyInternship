export default interface ACompose_SendSMS {
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
  };
  asSelectedUserIds: string;
  asSelectedStDivId: string;
  asIsSoftwareCordinator: number;
  asMessageId: number;
  sIsReply: string;
  asIsForward: string;
  asSchoolName: string;
  asTemplateRegistrationId: string;
}

export interface MessageTemplateSMSCenter {
  asSchoolId: number;
  asShowSystemDefined: string;
  asSortDirection: string;
}

export interface GetSMSTemplates {
  TemplateId: string;
  RegNo: string;
  Name: string;
  Template: string;
  IsSystemDefined:string;
}
