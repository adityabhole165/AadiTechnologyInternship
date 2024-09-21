export interface IClassTeacherDropdownBody {
  asSchoolId: number,
  asAcademicYearId: number,

}

export interface IClassTeacherDropdownResult {
  TeacherName: string,
  Teacher_Id: string,
  Designation_Id: string,
  Teacher_First_Name: string,
  Standard_Name: string,
  Division_Name: string,
  Original_Standard_Id: string,
  Original_Division_Id: string,
  SchoolWise_Standard_Division_Id: string,
  Is_PrePrimary: string,
  IsReportingUser: string,
  Standard_Id: string
}

export interface ITermDropdownBody {
  asSchoolId: number;
}

export interface ITermDropdownResult {
  Term_Id: string;
  Term_Name: string;
}

export interface IStudentsListBody {
  asStdDivId: number;
  asAcademic_Year_Id: number;
  asSchoolId: number;
  asTerm_Id: number;
}

export interface IStudentsListResult {
  Standard_Id: string;
  Division_Id: string;
  YearWiseStudentId: string;
  StudentName: string;
  Academic_Year_Id: string;
  RollNo: string;
  SchoolWise_Standard_Division_Id: string;
  IsLeftStudent: string;
  Joining_Date: string;
  Teacher_Id: string;
  Height: string;
  Weight: string;
}

export interface IUpdateStudentDetailsBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asTermId: number;
  asStandardDivisionId: number;
  aiUserId: number;
  StudentHeightWeightDetailsXML: string;
}
export interface IGetFinalPublishedExamStatusBody {
  asStandardDivId: number;
  asTerm_Id: number;
  asSchoolId: number;
  asAcademicYearId: number
}
export interface IGetFinalPublishedExamStatusResult {
  SchoolwiseTestId: string
  IsPublishedStatus: string
  ShowFlag: string
}

