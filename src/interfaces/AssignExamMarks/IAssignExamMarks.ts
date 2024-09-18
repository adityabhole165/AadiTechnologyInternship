export interface IAssignClassBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aTeacherId: number;
}

export interface IAssignClassResult {
  Standard_Division_Id: string;
  StandardDivision: string;
  IsClassTeacher: string
}

//ClasswiseExamDropdown
export interface IClasswiseExamDropdownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardDivisionId: number;
}

export interface IClasswiseExamDropdownResult {
  School_Id: string;
  original_schoolwise_test_id: string;
  schoolwise_test_id: string;
  schoolwise_test_name: string;
  IsFinalExam: string;
}

//SubjectList
export interface ISubjectsExamMarksStatusForClassBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aTeacherId: number;
  asExamId: number;
  IsClassTeacher: boolean;
  asStandardDivisionId: number;
}

export interface ISubjectsExamMarksStatusForClassBodyResult {
  ExamMarksStatusForClass: [{
    StandardDivision: string;
    Standard_Division_Id: string;
    Standard_Id: string;
    Division_Id: string;
    Subject_Id: string;
    Subject_Name: string;
    Is_Submitted: string;
    STATUS: string;
    IncompleteRollNos: string;
    Is_MonthConfig: string;
    AllowPartialSubmit: string;
    IsXseedSubject: string;
    StatusDescription: string;
  }],
  ExamMarksStatusForClassTeacher: [{

    StandardDivision: string;
    Standard_Division_Id: string;
    Standard_Id: string;
    Division_Id: string;
    Subject_Id: string;
    Subject_Name: string;
    Is_Submitted: string;
    STATUS: string;
    IncompleteRollNos: string;
    Is_MonthConfig: string;
    AllowPartialSubmit: string;
    IsXseedSubject: string;
    StatusDescription: string;
  }]
}





export interface ISubmitTestMarksToClassTeacherBody {
  asStandardDivisionId: string;
  asSubjectId: string;
  asTestId: string;
  asSchoolId: string;
  asAcademicYearId: string;
  asIsSubmitted: string;
  asReportingUserId: string
}



export interface ISubjectTeachersForAssignExamMarksBody {
  asSchoolId: number
  asAcademicYrId: number
}

export interface ISubjectTeachersForAssignExamMarksResult {
  Name: string
  TeacherId: string
  StandardDivisionId: any
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