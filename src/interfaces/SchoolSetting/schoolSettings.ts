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
export interface IGetAllAcademicYearForSchoolBody {

  asSchoolId: number,
  asUserId: number,
  asUserRoleId: number

}
export interface IGetAllAcademicYearForSchoolResult {
  Academic_Year_ID: string,
  School_Id: string,
  YearValue: string,
  Start_date: string,
  End_Date: string,
  School_ReOpen_Date: string,
  Is_Current_Year: string,
  Is_Close_Year: string,
  Is_NewlyCreated: string,
  Is_FinalYear_Generated: string,
  Is_Deleted: string,
  School_Name: string
}
export interface IGetUserDetailsBody {
  asSchoolId: string,
  asUserId: string,
  asRoleId: string
}
export interface IGetUserDetailsResult {
  StudentDetails: null,
  TeacherDetails: {
    TeacherId: number,
    IsClassTeacher: string,
    DesignationName: string,
    ClassName: string,
    IsPreprimary: string,
    StandardDivisionId: number,
    MobileNumber: null,
    Address: null,
    DOB: string,
    MPT_Applicable: string,
    Assembly_Applicable: string,
    Stayback_Applicable: string,
    IsAcademicYrApplicable: string,
    SchoolConfiguration: null,
    SchoolId: number,
    AcademicYearId: number,
    StartDate: string,
    EndDate: string
  },
  AdminStaffDetails: null

}