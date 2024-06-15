export interface IGetClassDivandStandardDropdownBody {
    asSchoolId: number;
    asAcademicYearId: number;
    IsStandardList: boolean;

}
export interface IGetClassDivandStandardDropdownResult {
    SchoolWise_Standard_Division_Id: string;
    StandardDivision: string;
    Standard_Id: string;
    Standard_Name: string;
}

export interface IGetLatestExamIdandDropdownBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asStandardDivId: number;
    asStandardId: number;
}
export interface IGetLatestExamIdResult {
    number;
}
export interface IGetExamDropdownResult {
    SchoolWise_Test_Id: string;
    SchoolWise_Test_Name: string;
    Original_SchoolWise_Test_Id: string;
    Sort_Order: string;
}

export interface IGetSubjectDropdownBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asStandardDivId: number;
    asStandardId: number;
    asTestId: number;
}
export interface IGetSubjectDropdownResult {
    Subject_Id: string;
    Subject_Name: string;
}

export interface IGetClassandStandardToppersListBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asStandardDivId: number;
    asStandardId: number;
    asTestId: number;
    asSubjectId: number;
}
export interface IGetClassandStandardToppersListResult {
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