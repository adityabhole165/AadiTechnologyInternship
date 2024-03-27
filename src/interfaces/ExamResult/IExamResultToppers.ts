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
export interface IGetClassExamDropDownBodyCT {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivisionId: number
}
export interface IGetClassExamDropDownResultCT {
    SchoolWise_Test_Id: string,
    SchoolWise_Test_Name: string,
    Original_SchoolWise_Test_Id: string,
    Sort_Order: string
}
export interface IGetClassNameDropDownBodyCT {
    asSchoolId: number,
    asAcademicYearId: number
}
export interface IGetClassNameDropDownResultCT {
    SchoolWise_Standard_Division_Id: string,
    StandardDivision: string
}