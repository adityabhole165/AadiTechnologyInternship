export interface IAllPrimaryClassTeachersBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asUserId: Number;
}

export interface IAllPrimaryClassTeachersResult {
  TeacherName: string
  Teacher_Id: string
  Designation_Id: string
  Teacher_First_Name: string
  Standard_Name: string
  Division_Name: string
  Original_Standard_Id: string
  Original_Division_Id: string
  SchoolWise_Standard_Division_Id: string
  Is_PrePrimary: string
  IsReportingUser: string
  Standard_Id: string
}


export interface IGetTestwiseTermBody {
  asSchoolId: Number;
}

export interface IGetTestwiseTermResult {
  Term_Id: string;
  Term_Name: string;
}

export interface IStudentListDropDowntBody {
  asStandard_Division_Id: Number;
  asAcademicYearId: Number;
  asSchoolId: Number;
  asTerm_Id: Number;
}

export interface IStudentListDropDownResult {
  Standard_Id: string;
  Division_Id: string;
  Student_Id: string;
  Student_Name: string;
  Academic_Year_Id: string;
  Roll_No: string;
  SchoolWise_Standard_Division_Id: string;
  SchoolLeft_Date: string;
  Joining_Date: string;
  Teacher_Id: string;
}

export interface IGetAllStudentswiseRemarkDetailsNewBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardDivId: number
  asStudentId: number
  TeacherId: number
  asTermId: number
  asStartIndex: number
  asEndIndex: number
}


// export interface IGetAllStudentswiseRemarkDetailsNewResult {
//   GetAllStudentswiseRemarkDetailsList: [
//     {
//       YearwiseStudentId: number
//       StudentwiseRemarkId: number
//       StudentName: string
//       TermId: number
//       Remark: string
//       RemarkConfigId: number
//       RollNo: number
//       StandardDivisionId: number
//       RemarkMaster: {
//         RemarkName: string
//         RemarkConfigId: number
//       },
//       SalutationId: number
//       FName: string
//       MName: string
//       LName: string
//       IsPassedAndPromoted: boolean
//       IsLeftStudent: number
//       OldRemark: string

//     }

// ];
//   RemarkMasterList: [
//     {
//       RemarkName: string,
//       RemarkConfigId: number
//     }
//   ]
// }

export interface IGetAllStudentswiseRemarkDetailsNewResult {
  GetAllStudentswiseRemarkDetailsList: {
    YearwiseStudentId: number;
    StudentwiseRemarkId: number;
    StudentName: string;
    TermId: number;
    Remark: string;
    RemarkConfigId: number;
    RollNo: number;
    StandardDivisionId: number;
    RemarkMaster: {
      RemarkName: string;
      RemarkConfigId: number;
    };
    SalutationId: number;
    FName: string;
    MName: string;
    LName: string;
    IsPassedAndPromoted: boolean;
    IsLeftStudent: number;
    OldRemark: string;
  }[];
  RemarkMasterList: {
    RemarkName: string;
    RemarkConfigId: number;
  }[];
}

export interface IUpdateAllStudentsRemarkDetailsBody {
  StudentwiseRemarkXML: string;
  asSchoolId: Number;
  asAcademicYearId: Number;
  asInsertedById: Number;
  asStandardDivId: Number;
  asTermId: Number;
}

export interface IStudentswiseRemarkDetailsToExportBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asStandardDivId: Number;
  asStudentId: Number;
  asTermId: Number;
}

export interface IStudentswiseRemarkDetailsToExportResult {
  listStudentDetails: [
    {
      YearwiseStudentId: string;
      RollNo: string;
      ClassName: string;
      StudentName: string;
    }
  ];

  listTermDetails: [
    {
      YearwiseStudentId: string;
      Remark: string;
      RemarkName: string;
    }
  ];

  listRemarkDetails: [
    {
      RemarkConfigId: string;
      RemarkName: string;
    }
  ];
}
export interface IGetAllGradesForStandardBody {
  asSchool_Id: Number,
  asAcademic_Year_Id: Number,
  asStandard_Id: Number,
  asSubjectId: Number,
  asTest_Id: Number
}
export interface IGetAllGradesForStandardResult {
  Marks_Grades_Configuration_Detail_ID: string,
  Grade_Name: string
}
export interface IGetRemarksCategoryBody {
  asSchoolId: Number,
  asAcadmicYearId: Number
}
export interface IGetRemarksCategoryResult {
  Id: string,
  Name: string,
  SortOrder: string

}
export interface IGetRemarkTemplateDetailsBody {
  asSchoolId: Number,
  asRemarkId: Number,
  asSortExpression: string,
  asSortDirection: string,
  asFilter: string,
  asAcadmicYearId: Number,
  asMarksGradesConfigurationDetailsId: Number,
  asStandardId: Number
}
export interface IGetRemarkTemplateDetailsResult {
  Template: string
  TemplateId: string,
  CategoryId: string
}

export interface IGetAllStudentsForProgressRemarkBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandard_Division_Id: number
  asStudentId: number
  asTerm_Id: number
  asStartIndex: number
  asEndIndex: number
  asSortExp: string
}


export interface IGetAllStudentsForProgressRemarkResult {
  Standard_Id: string
  Division_Id: string
  Student_Id: string
  Student_Name: string
  Academic_Year_Id: string
  Roll_No: string
  SchoolWise_Standard_Division_Id: string
  SchoolLeft_Date: string
  Joining_Date: string
  Teacher_Id: string
  TotalRows:string
}


export interface IGetFinalPublishedExamStatusBody {
  asStandardDivId: number
  asTerm_Id: number
  asSchoolId: number
  asAcademicYearId: number
}

export interface IGetFinalPublishedExamStatusResult {
  SchoolwiseTestId: string
  IsPublishedStatus: string
  ShowFlag: string
}


export interface IGetConfiguredMaxRemarkLengthBody {
  asSchoolId: number
  asAcademicYearId: number
  asStandardId: number
  asTermId: number
}


export interface IGetConfiguredMaxRemarkLengthResult {
  asSchoolId: number
  asAcademicYearId: number
  asStandardId: number
  asTermId: number
}

