export interface ITeacherDropdownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asShowHomeworkToClassTeacher: number;
  aTeacherId: number;
}
export interface ITeacherDropdownResult {
  Teacher_Id: string;
  TeacherName: string;
  Designation_Id: string;
  Teacher_First_Name: string;
}

export interface IClassDropDownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aTeacherId: number;
}

export interface IClassDropDownResult {
  Standard_Division_Id: string;
  StandardDivision: string;
}
export interface IGetTeacherSubjectDetailsBody {
  asSchoolId: number;
  aTeacherId: number;
  asAcademicYearId: number;
  asStandardDivisionId: number;
}

export interface IGetTeacherSubjectDetailsResult {
  Standard_Id: string;
  Standard_Name: string;
  TeacherShortName: string;
  Is_ClassTeacher: string;
  Subject_Name: string;
  Standard_Division_Id: string;
  Teacher_Subject_Id: string;
  Subject_Id: string;
  Teacher_Id: string;
  StandardDivision: string;
  Teacher_Subject: string;
  maxSubjectLecturesInWeek: string;
  MySubject: string;
}
export interface IClassTeacherDropdownBody {
  asSchoolId: number;
  asAcademicYearID: number;
}

export interface IClassTeacherDropdownResult {
  TeacherName: string;
  Teacher_Id: string;
  Designation_Id: string;
  Teacher_First_Name: string;
  Standard_Name: string;
  Division_Name: string;
  Original_Standard_Id: string;
  Original_Division_Id: string;
  StandardDivisionId: string;
}
export interface ISchoolsettingBody {
  asSchoolId: number;
}

export interface IGetSchoolSettingsResult {

  GetSchoolSettingsResult: {
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
    AllowProgressReportDownloadAtStudentLogin: string;
    IsTotalConsiderForProgressReport: string;
    SiteName: string;
    StaybackName: string;
    WeeklyTestLectNo: string;
    WeeklyTestName: string;
    WeeklyTestWeekDay: string;
    EnableHomeworkMySubjectListView: string;
    EnableAssignExamMarksToAllSubjectOfClass: string;
    StudentAbsentCount: string;
    AllowHomewirkDailyLog: string;
  }
}