export interface IGetClassTeachersBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asTeacherId: number;
}
export interface IGetClassTeachersResult {
  TeacherName: string;
  Teacher_Id: string;
  Designation_Id: string;
  Teacher_First_Name: string;
  // Standard_Id: string;
  Standard_Name: string;
  Division_Name: string;
  Original_Standard_Id: string;
  Original_Division_Id: string;
  SchoolWise_Standard_Division_Id: string;
}
// export interface IGetAllTestsForClassBody {
//   asAcademicYearId: string;
//   asSchoolId: string;
//   asStandardDivisionId: string;
// }
export interface IGetClasswiseExamDropdownBody {
  asSchoolId: Number,
  asAcademicYearId: Number,
  asStandardDivisionId: Number
}
export interface IGetClasswiseExamDropdownResult {
  School_Id: string,
  original_schoolwise_test_id: string,
  schoolwise_test_id: string,
  schoolwise_test_name: string,
  IsFinalExam: string

}
// export interface IGetAllTestsForClassResult {
//   SchoolId: number;
//   OriginalSchoolwiseTestId: number;
//   SchoolwiseTestId: number;
//   SchoolwiseTestName: string;
//   IsFinalExam: boolean;
// }
export interface IGetClassPassFailDetailsForTestBody {
  asAcademicYearId: number;
  asSchoolId: number;
  asStdDivId: string;
  aiTestId: string;
}
export interface IGetClassPassFailDetailsForTestResult {

  LstGetFileDetails: [
    {
      Subject_Id: number,
      Subject_Name: string,
      Standard_Division_Id: number,
      SchoolWise_Test_Id: number,
      Is_Submitted: string,
      Sort_Order: number,
      ExamStatus: null,
      Count: number,
      OriginalSubjectId: number,
      ExamStatusSortOrder: number
    },
  ]
  LstExamStatusForTest: [
    {
      ExamStatus: string,
      StandardDivisionId: number,
      SchoolWiseTestId: number,
      ExamStatusSortOrder: number
    },
  ]
  LstClassPassFailDetailsForTest: [
    {
      Subject_Id: number,
      Subject_Name: string,
      Standard_Division_Id: number,
      SchoolWise_Test_Id: number,
      Is_Submitted: string,
      Sort_Order: number,
      ExamStatus: string,
      Count: number,
      OriginalSubjectId: number,
      ExamStatusSortOrder: number
    },
  ]
  ToppersGenerated: boolean,
  IsPublish: boolean
}
export interface IPublishUnpublishExamResultBody {
  asSchoolId: number,
  asStdDivId: number,
  asAcadmicYearId: number,
  asTest_Id: number,
  asUnpublishReason: string,
  asPublishById: number
}
export interface PublishUnpublishExamResult {
  string,
}

export interface IGetPrePrimaryProgressSheetStatusBody {
  asSchoolId: number,
  asStdDivId: number,
  asAcadmicYearId: number,
  asTest_Id: number
}
export interface IGetPrePrimaryProgressSheetStatusResult {
  string
}
export interface IsPrePrimaryExamConfigurationBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStdDivId: number,
  asUserRole: string
}
export interface IsPrePrimaryExamConfigurationResult {
  boolean
}


export interface IsMonthConfigurationForExamResultBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStdDivId: number
}
export interface IsMonthConfigurationForExamResult {
  boolean
}

export interface IGetAllStudentsByGivenStdDivsBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStdDivIds: number,
  IsLeftStudents: boolean
}


export interface IGetAllStudentsByGivenStdDivsResult {
  ID: string,
  FullName: string,
  Mobile_Number: string,
  Mobile_Number2: string,
  StudentCount: number,
  Name: string,
  Roll_No: number
}

export interface IGetSMSTemplateBody {
  asSchoolId: Number,
  asSmsTemplateId: Number
}
export interface IGetSMSTemplateResult {
  SmsTemplateId: number,
  SmsTemplateName: string,
  SmsTemplateText: string,
  SmsType: string,
  TemplateRegistrationId: string
}

export interface IGenerateTestTotalMarksBody {
  asSchoolId: Number,
  asAcademicYearId: Number,
  asStandardDivId: Number,
  asTestId: Number,
  asInsertedById: Number
}
export interface IGenerateTestTotalMarksResult {
  string
}
export interface IGetTeacherDetailsForControlPanelBody {
  asSchoolId: Number,
  asAcademicYearId: Number,
  asTeacherID: Number
}
export interface IGetTeacherDetailsForControlPanelResult {
  listTeacherDetailss: [
    {
      TeacherName: string,
      TeacherStdDiv: string,
      Teacher_Designation_Name: string,
      qualification: string,
      Standard_Id: string,
      Standard_Name: string,
      Is_PrePrimary: string,
      Teacher_Designation_Id: string
    }
  ],
  listBirthdayDetailss: [
    {
      YearWise_Student_Id: string,
      DOB: string,
      StudentName: string,
      className: string,
      Photo_file_Path: string,
      DateOfBirth: string
    },
  ],
  listCountofnewmessagesDetails: [
    {
      GetCountOfNewMessage: string
    }
  ],
  listMessageDetails: [
    {
      Message_Id: string,
      Message: string,
      Start_Date: string,
      End_Date: string,
      Is_Default_Msg: string
    }
  ],
  listBdayCountDetails: [
    {
      TotalBirthdayCount: string
    }
  ]
}


export interface getIsFinalResultPublishedBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardDivisionId: number
}

export interface getIsTermExamPublishedBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardDivisionId: number
}