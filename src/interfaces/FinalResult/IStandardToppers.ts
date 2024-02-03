export interface IGetStandardDropdownBodyST {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asTeacherId: Number;
}
export interface IGetStandardDropdownResultST {
  Standard_Name: String;
  Original_Standard_Id: String;
  Standard_Id: String;
}

export interface IGetStandardExamDropdownBodyST {
  asSchoolId: Number;
  asAcademicYearId: Number;
  asStandardId: Number;
}
export interface IGetStandardExamDropdownResultST {
  SchoolWise_Test_Id: String;
  SchoolWise_Test_Name: String;
  Original_SchoolWise_Test_Id: String;
  Sort_Order: String;
}
export interface IGetSubjectDropdownBodyST {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardId: number;
  asExamId: number;
}
export interface IGetSubjectDropdownResultST {
  Subject_Id: string;
  Subject_Name: string;
}
export interface IGetStandardToppersListBOdyST {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardId: number;
  asExamId: number;
  asSubjectId: number;
}
export interface IGetStandardToppersListResultST {
  GetTopperList: [
    {
      TopperRank: string;
      Rank_Image: string;
      Student_Id: string;
      Roll_No: string;
      Student_Name: string;
      Marks_Scored: string;
      Total_Marks: string;
      Marks: string;
      Standard: string;
    }
  ];
  GetSelectedSubjectTopperList: [
    {
      TopperRank: string;
      Rank_Image: string;
      Student_Id: string;
      Subject_Id: string;
      Subject_Name: string;
      Roll_No: string;
      Student_Name: string;
      Total_Marks_Scored: string;
      Subject_Total_Marks: string;
      Marks: string;
      Standard: string;
    }
  ];
}
