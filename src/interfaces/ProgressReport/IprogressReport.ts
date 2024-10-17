export interface IGetClassTeachersBody {
    asSchoolId: number
    asAcademicYearId: number
    asTeacherId: number
};

export interface IGetClassTeachersResult {
    TeacherName: string
    Teacher_Id: string
    Designation_Id: string
    Teacher_First_Name: string
    Standard_Name: string
    Division_Name: string
    Original_Standard_Id: string
    Original_Division_Id: string
    SchoolWise_Standard_Division_Id: string,
    Standard_Id:string
};

export interface IGetStudentNameDropdownBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardDivisionId: number
};

export interface IGetStudentNameDropdownResult {
    RollNo: string
    StudentName: string
    Student_Id: string
};

export interface IStudentProgressReportBody {
    asSchoolId: number
    asAcadmeicYearId: number
    asStudentId: number
    asUserId: number,
    IsTotalConsiderForProgressReport:string
}



export interface IStudentProgressReportResult {
    listStudentsDetails: [
        {
            YearWise_Student_Id: string
            Student_Name: string
            Standard_Name: string
            Division_Name: string
            Academic_Year: string
            Standard_Division_Id: string
            Roll_No: string
            Enrolment_Number: string
            Standard_Id: string
            School_Name: string
            School_Orgn_Name: string
            ShowOnlyGrades: string
            IsFailCriteriaNotApplicable: string
            IsPreprimaryStandard: string
        }
    ],
    listSubjectsDetails: [
        {
            ID_Num: string
            Subject_Name: string
            Subject_Id: string
            Parent_Subject_Id: string
            Total_Consideration: string
            Is_CoCurricularActivity: string
            Sort_Order: string
        }
    ],
    listTestDetails: [
        {

            Test_Name: string,
            Test_Id: string,
            Original_SchoolWise_Test_Id: string,

        }
    ],
    listSubjectIdDetails: [{
        Subject_Id: string
        Marks: string
        SchoolWise_Test_Id: string
        Original_SchoolWise_Test_Id: string
        SchoolWise_Test_Name: string
        Subject_Name: string
        Total_Marks_Scored: string
        Subject_Total_Marks: string
        Passing_Total_Marks: string
        Subject_Total: string
        Grade_Or_Marks: string
        TestType_Id: string
        Marks_Scored: string
        TestType_Name: string
        ShortenTestType_Name: string
        Grade: string
        TotalGrade: string
        TestType_Total_Marks: string
        TestType_Passing_Marks: string
        Is_Absent: string
        SchoolWise_Student_Test_Marks_Id: string
        TestWise_Subject_Marks_Id: string
        ConsiderExamStatus: string
        ConsiderInResult: string
        ShowOnlyGrades: string
        AllowDecimal: string
        Is_CoCurricularActivity: string
    }
    ],
    listParcentageDetails: [
        {
            ID_Num: string,
            Range: string,
            Grade: string,
            Remarks: string,
            Marks_Grades_Configuration_Detail_ID: string,
        }
    ],

    Listtestid2Details: [{
      Grade: string
      Parent_Subject_Id: string
      TestTypeSort_Order: string
      TestType_Id:string
      TestType_Total_Marks: string
      TestType_Total_Marks_Scored: string
      Test_Id: string
    }



    ],


    ListSubjectidDetails: [
        {
            Subject_Id: string
            TestType_Id: string
            ShortenTestType_Name: string
            Total_Marks_Scored: string
            TestTypeSort_Order: string
        }
    ],
    ListTestTypeIdDetails: [
        {
            TestType_Id: string
            TestType_Name: string
            ShortenTestType_Name: string
            TestTypeSort_Order: string
        }
    ],
    ListMarkssDetails: [
        {
            Marks_Grades_Configuration_Detail_ID: string
            Grade_Name: string
            Remarks: string
            IsForCoCurricularSubjects: string
        }
    ],

    ListDisplayNameDetails: [
        {
            DisplayName: string
            DisplayValue: string
            ShortName: string
            ForeColor: string
            BackColor: string
        }


    ]
    ListSchoolWiseTestNameDetail: [
        {
            SchoolWise_Test_Id: string,
            Total_Marks_Scored: string,
            Subjects_Total_Marks: string,
            Percentage: string,
            Grade_Name: string,
            Grade_id: string,
            FailCount: string,
            Result: string ,
            rank: string
        }


    ]
    listTestidDetails: [
        {
            Test_Id: string
            Parent_Subject_Id: string
            Parent_Subject_Name: string
            Total_Marks_Scored: string
            ChildSubject_Marks_Total: string
            Grade: string
            AverageMarks: string
            OutOfMarks: string
        }


    ]
   
    
}

export interface IGetPassedAcademicYearsBody {
    asSchoolId: number
    asStudent_Id: number
    asIncludeCurrentYear: boolean
  }

  export interface IGetPassedAcademicYearsResult{
    Display_Member: string
    
  }

  

  export interface IGetAllMarksGradeConfigurationBody {
    asSchoolId: number;
    asAcademicYrId: number;
    asStandardId: number;
    asIsCoCurricular: boolean;
  }
  
 


  export interface IGetAllMarksGradeConfigurationResult {
    listConfigurationIdDetails: [
        {
            Marks_Grades_Configuration_Id: string
        }
    ],
    listGradeDetailss: [
        {
            Starting_Marks_Range: string;
            Ending_Marks_Range: string;
            Actual_Ending_Marks_Range: string;
            Grade_Name: string;
            Remarks: string;
            Marks_Grades_Configuration_Detail_ID: string;
            Original_Config_Id: string;
            Standard_Id: string;
            Academic_Year_Id: string;
        }
    ],
        

    
}

export interface IsGradingStandarBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardId: number
  }
  export interface IsTestPublishedForStdDivBody {
    asSchoolId: number
    asAcadmicYearId: number
    asStdDivId: number
  }
  export interface IsTestPublishedForStudentBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardDivId: number
    asStudentId: number
  }



  export interface GetSchoolSettingsBody{
    asSchoolId: number
    
  }

  export interface GetSchoolSettingsResult {
    IsMPTApplicable: string
    MPTLectNo: number
    MPTName: string
    MPTWeekday: string
    BlockProgressReportIfFeesArePending: string
    ProgressSheetNote: string
    IsAssemblyApplicable: string
    AssemblyLectNo: number
    AssemblyName: string
    AssemblyWeekday: string
    IsStaybackApplicable: string
    StaybackName: string
    ShowProgressSheetNote: string
    AllowProgressReportDownloadAtStudentLogin: string
    SiteName: any
    SendMail: any
    SendSMS: any
    SMSSenderUPwd: any
    SMSSenderUserName: string
    FromMailAddress: any
    SMSProvider: any
    IsWeeklyTestApplicable: any
    WeeklyTestName: any
    WeeklyTestLectNo: any
    WeeklyTestWeekDay: any
    IsTotalConsiderForProgressReport: string
    EnableHomeworkMySubjectListView: string
    EnableAssignExamMarksToAllSubjectOfClass: string
    StudentAbsentCount: string
    AllowHomewirkDailyLog: string
    AllowUnsubmitExamMarks: string
    AllowExamStatusForCoCurricullarSubjects: string
    IsMiniSite: string
    DisplayWeeklyTimtableLink: string
    EnableOnlineExamModule: string
    EnableStudentRecordModule: string
    ExternalLibrarySite: string
    ShowTopppers: string
    BlockExamPublish: string
  }


//   export interface GetSchoolSettingsResult {
//     GetSchoolSettingsResult: {
//         IsMPTApplicable: string
//         MPTLectNo: number
//         MPTName: string
//         MPTWeekday: string
//         BlockProgressReportIfFeesArePending: string
//         ProgressSheetNote: string
//         IsAssemblyApplicable: string
//         AssemblyLectNo: number
//         AssemblyName: string
//         AssemblyWeekday: string
//         IsStaybackApplicable: string
//         StaybackName: string
//         ShowProgressSheetNote: string
//         SiteName: any
//         SendMail: any
//         SendSMS: any
//         SMSSenderUPwd: any
//         SMSSenderUserName: string
//         FromMailAddress: any
//         SMSProvider: any
//         IsWeeklyTestApplicable: any
//         WeeklyTestName: any
//         WeeklyTestLectNo: any
//         WeeklyTestWeekDay: any
//         IsTotalConsiderForProgressReport: string

//     }

// }
