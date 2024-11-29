export default interface IGetAllStandards {
  asSchoolId: string;
  asAcademicYearId: string;
}

export interface GetStandardListResult {
  GetAllStandardsResult: [
    {
      Id: string;
      Name: string;
    }
  ];
}


export interface IGetExamsList {
  asAcademicYearId: string;
  asSchoolId: string;
  asStandardId: any;
}

export interface GetExamsListResult {
  GetExamDropDownForExamScheduleDetailsList: [
    {
      SchoolWise_Test_Name: string,
      SchoolWise_Test_Id: string,
      Exam_Start_Date: string,
      Exam_End_Date: string,
      IsCollapsed: string,
      Instructions: string,
      StandardId: string,
      Schoolwise_Standard_Exam_Schedule_Id: string;
    }
  ],
  ExamScheduleList: [
    {
      SchoolWise_Test_Id: string;
      SubjectName: string;
      ExamStartDate: string;
      ExamEndDate: string;
      Total_Exam_Days: string;
      Instructions: string;
      Standard: null;
      Standard_Id: string;
      Standard_Name: string;
      TestName: null;
      TestType: string;
      SchoolWise_Test_Name: string;
      Description: string;
      StartTime: string;
      EndTime: string;
      StartDate: string;
      EndDate: string;
      StartDayDate: string;
      EndDayDate: string;
      Subject: string,
      Exam: string,
      StartDateAndTime: string,
      EndDateAndTime: string
    }
  ];
  GetSubjectsExamScheduleList: [
    {
      ID: string,
      Subject_Name: string,
      TestType: string,
      TestType_Name: string,
      Start_DateTime: string,
      End_DateTime: string,
      TotalTime: string,
      Description: string,
      Schoolwise_Standard_Exam_Schedule_Id: string
    }
  ],
}

export interface IGetExamScheduleBody {
  asSchoolId: number;
  asAcademicYearId: number;
}

export interface IGetExamScheduleResult {
  listSchoolWiseStandards: [
    {
      school_id: string,
      original_standard_id: string,
      standard_id: string,
      standard_name: string,
    }
  ],
  listSchoolWiseTestNamE: [
    {
      SchoolWise_TestId: string;
      SchoolWise_TestName: string;
    }
  ],
  listSchoolWiseConfigExam: [
    {
      Schoolwise_Standard_Exam_Schedule_Id: string,
      Standard_Id: string,
      SchoolWise_Test_Id: string,
      Exam_Start_Date: string,
      Exam_End_Date: string,
      Total_Exam_Days: string,
      Standard_Test_Id: string,
    }
  ],
  listSchoolwiseStandardTest: [
    {
      Schoolwise_Standard_Test_Id: string,
      standard_id: string,
      SchoolWise_Test_Id: string,
    }
  ]
}

export interface IGetSubjectExamScheduleBody {
  asStandardId: number;
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardwiseExamScheduleId: number;
}
export interface IGetSubjectExamScheduleResult {
  listStandardwiseSubject: [
    {
      SubjectWize_Standard_Exam_Schedule_Id: string,
      Subject_Id: string,
      Subject_Name: string,
      TestType: string,
      Start_DateTime: string,
      End_DateTime: string,
      TotalTime: string;
      Description: string;
      Marks: string;
    }
  ],
  Instructionss: [
    {
      Instructionss: string;
    }
  ],
  IsSubmitedd: [
    {
      IsSubmitedd: string;
    }
  ],
}

export interface IGetStandardsForExamCopyBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asSchoolwiseExamId: number;
}

export interface IGetStandardsForExamCopyResult {
  GetCopyExamStandardList: [
    {
      Standard_Id: string;
      Standard_Name: string;
    }
  ],
}

export interface IUpdateExamScheduleInstructionsBody {
  asSchoolId: number;
  asSchoolwiseStandardExamScheduleId: number;
  asInstructions: string;
  asUpdatedById: number;
}
export interface IUpdateExamScheduleInstructionsResult {
  string;
}

export interface IUpdateStandardWiseExamScheduleBody {
  asSchoolId: number;
  asStandardwiseExamScheduleId: number;
  asUpdatedById: number;
}

export interface IUpdateStandardWiseExamScheduleResult {
  string;
}

export interface ICopyStandardTestBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardId: number;
  asSourceStandardTestId: number;
  asDestinationStandardsxml: string;
}

export interface ICopyStandardTestResult {
  string;
}

export interface IInsertExamScheduleBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardId: number;
  asSchoolwiseTestId: number;
  asStandardTestId: number;
  asInsertedById: number;
  asScreenId: number;
  asSchoolwiseStandardExamScheduleId: number;
  asExamDetailsXML: string;
}
export interface IInsertExamScheduleResult {
  string;
}

export interface ISumbitExamScheduleBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUpdatedById: number;
  asStandardId: number;
  asIsUnSubmit: number;
  asSchoolwiseTestId: number;
}
export interface ISumbitExamScheduleResult {
  string;
}