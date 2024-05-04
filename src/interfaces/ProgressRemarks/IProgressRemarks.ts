export interface IAllPrimaryClassTeachersBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asUserId: Number;
}

export interface IAllPrimaryClassTeachersResult {
  TeacherName: string;
  Teacher_Id: string;
  Designation_Id: string;
  Teacher_First_Name: string;
  Standard_Name: string;
  Division_Name: string;
  Original_Standard_Id: string;
  Original_Division_Id: string;
  StandardDivisionId: string;
  SchoolWise_Standard_Division_Id: string;
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

export interface IGetAllStudentswiseRemarkDetailsBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asStandardDivId: Number;
  asStudentId: Number;
  asTermId: Number;
}

export interface IGetAllStudentswiseRemarkDetailsResult {
  RollNo: string;
  YearwiseStudentId: string;
  StudentName: string;
  Remark: string;
  StudentwiseRemarkId: string;
  StandardDivisionId: string;
  RemarkName: string;
  RemarkConfigId: string;
  TermId: string;
  SalutationId: string;
  FName: string;
  MName: string;
  LName: string;
  IsPassedAndPromoted: Number;
  IsLeftStudent: string;
  OldRemark: string;
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