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
  asSchoolId: string;
  sortDirection: string;
  asShowSystemDefined: string;
}

export interface GetSMSTemplates {
  Template_Id: number;
  registration_Number: number;
  Template_Name: string;
  Template: string;
  IsSystemDefined: number;
}
