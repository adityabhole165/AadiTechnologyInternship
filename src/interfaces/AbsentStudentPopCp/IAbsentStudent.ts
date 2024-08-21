export interface IGetAbsentStudentBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asUserId: number;
}

export interface IGetAbsentStudentResult {

    listGetAbsentStudentDetails: [
        {
            YearWise_Student_Id: string;
            EnrolmentNumber: string;
            RollNo: string;
            className: string;
            StudentName: string;
        }
    ],

    listLinkVisible: [
        {
            IsLinkVisibel: string;
        }
    ]
}

export interface ISchoolIdBody {
    asSchoolId: number;
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
    AllowProgressReportDownloadAtStudentLogin: string;
    IsTotalConsiderForProgressReport:string;
    SiteName: string;
    StaybackName: string;
    WeeklyTestLectNo: string;
    WeeklyTestName: string;
    WeeklyTestWeekDay: string;
    EnableHomeworkMySubjectListView:string;
    EnableAssignExamMarksToAllSubjectOfClass:string;
    StudentAbsentCount: string;
  }