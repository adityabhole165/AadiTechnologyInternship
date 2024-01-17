import { string } from "prop-types"

export interface IGetClassDropdownBodyCT {
    asSchoolId: number,
    asAcademicYearId: number,
    asTeacherId:number
}
export interface IGetClassDropdownResultCT {
    SchoolWise_Standard_Division_Id: string,
    StandardDivision: string
}
export interface IGetexamDropdownBodyCT {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivisionId: number
}
export interface IGetExamDropdownResultCT {
    SchoolWise_Test_Id: string,
    SchoolWise_Test_Name: string,
    Original_SchoolWise_Test_Id: string,
    Sort_Order: string
}
export interface IGetClassSubjectDropdownBodyCT {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asExamId: number
}
export interface IGetClassSubjectDropdownResultCT {
    Subject_Id: string,
    Subject_Name: string

}
export interface IGetClassToppersListBOdyCT {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asExamId: number,
    asSubjectId: number
}
export interface IGetClassToppersListResultCT {

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
