export interface IGetRemarksCategory {
    asSchoolId: number,
    asAcadmicYearId: number
}

export interface IGetRemarksCategoryResult {
    Id: string,
    Name: string,
    SortOrder: string
}

export interface IGetAllGradesForStandardBody {
    asSchool_Id: number,
    asAcademic_Year_Id: number,
    asStandard_Id: number,
    asSubjectId: number,
    asTest_Id: number
}

export interface IGetAllGradesForStandardResult {
    Marks_Grades_Configuration_Detail_ID: string,
    Grade_Name: string
}

export interface IGetRemarkTemplateDetailsBody {

    asSchoolId: number,
    asRemarkId: number,
    asSortExpression: string,
    asSortDirection: string,
    asFilter: number,
    asAcadmicYearId: number,
    asMarksGradesConfigurationDetailsId: number,
    asStandardId: number

}

export interface IGetRemarkTemplateDetailsResult {
    Template: string,
    TemplateId: string,
    CategoryId: string
}
