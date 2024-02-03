export interface ISchoolSettings {
  asSchoolId: string;
}

export interface IGetSchoolSettingsResult {
  AssemblyLectNo: number;
  AssemblyName: string;
  AssemblyWeekday: string;
  BlockProgressReportIfFeesArePending: string;
  FromMailAddress: string;
  IsAssemblyApplicable: string;
  IsMPTApplicable: string;
  IsStaybackApplicable: string;
  IsWeeklyTestApplicable: string;
  MPTLectNo: number;
  MPTName: string;
  MPTWeekday: string;
  ProgressSheetNote: string;
  SMSProvider: string;
  SMSSenderUPwd: string;
  SMSSenderUserName: string;
  SendMail: string;
  SendSMS: string;
  ShowProgressSheetNote: string;
  SiteName: string;
  StaybackName: string;
  WeeklyTestLectNo: string;
  WeeklyTestName: string;
  WeeklyTestWeekDay: string;
}
