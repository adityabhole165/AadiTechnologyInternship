import { string } from "prop-types"

export interface IGetClassDropdownBody {
    asSchoolId: number,
    asAcademicYearId: number
}
export interface IGetClassDropdownResult {
    SchoolWise_Standard_Division_Id: string,
    Standard_Name: string,
    Division_Name: string,
    StandardDivision: string,
    Original_Standard_Id: string,
    Original_Division_Id: string
}
export interface IGetexamDropdownBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivisionId: number
}
export interface IGetExamDropdownResult {
    SchoolWise_Test_Id: string,
    SchoolWise_Test_Name: string,
    Original_SchoolWise_Test_Id: string,
    Sort_Order: string
}
export interface IGetClassSubjectDropdownBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asExamId: number
}
export interface IGetClassSubjectDropdownResult {
    Subject_Id: string,
    Subject_Name: string

}
export interface IGetClassToppersListBOdy {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asExamId: number,
    asSubjectId: number
}
export interface IGetClassToppersListResult {

    GetTopperList: [{
        TopperRank: string,
        Rank_Image: string,
        Student_Id: string,
        Roll_No: string,
        Student_Name: string,
        Marks_Scored: string,
        Total_Marks: string,
        Marks: string,
        Standard: string
    }];
    GetSelectedSubjectTopperList: [
        {
            TopperRank: string,
            Rank_Image: string,
            Student_Id: string,
            Subject_Id: string,
            Subject_Name: string,
            Roll_No: string,
            Student_Name: string,
            Total_Marks_Scored: string,
            Subject_Total_Marks: string,
            Marks: string,
            Standard: string
        }
    ]

}
