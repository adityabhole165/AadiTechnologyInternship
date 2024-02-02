export interface ISchoolId {
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
  MPTLectNo: string;
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

export interface IgetModulesPermission {
  asSchoolId: string;
  asAcademicYearId: string;
  asUserId: string;
  abIsPreprimary: boolean;
  abXseedApplicable: boolean;
}

export interface GetModulesPermissionsResult {
  IsEnabled: boolean;
  ModuleName: string;
}

//GetScreensAccessPermissions
export interface IGetScreensAccessPermissions {
  asSchoolId: string;
  asAcademicYearId: string;
  asUserId: string;
  asUserRoleId: string;
  abIsPreprimaryTeacher: boolean;
}

export interface GetScreensAccessPermissions {
  ScreenId: number;
  ScreenName: string;
  IsFullAccess: string;
  IsViewAvailable: string;
  IsEnabled: boolean;
}
export interface IGetSettingValueResult {
  GetSettingValueResult: string;
}
export interface IGetSettingValueBody {
  asSchoolId: number;
  aiAcademicYearId: number;
  asKey: string;
}
export interface IGetSettingValueByNameResult {
  Value: string;
}
export interface IGetSettingValueByNameBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asKey: string;
}
