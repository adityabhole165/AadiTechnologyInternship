export interface IGetClassTeachersBody {
    asAcademicYearId: string,
    asSchoolId: string
}
export interface IGetClassTeachersResult {
    TeacherName: string,
    Teacher_Id: string,
    Designation_Id: string,
    Teacher_First_Name: string,
    Standard_Name: string,
    Division_Name: string,
    Original_Standard_Id: string,
    Original_Division_Id: string,
    SchoolWise_Standard_Division_Id: string
}
export interface IGetAllTestsForClassBody {
    asAcademicYearId: string,
    asSchoolId: string,
    asStandardDivisionId: string
}
export interface IGetAllTestsForClassResult {
    SchoolId: number,
    OriginalSchoolwiseTestId: number,
    SchoolwiseTestId: number,
    SchoolwiseTestName: string,
    IsFinalExam: boolean
}
export interface IGetClassPassFailDetailsForTestBody {
    asAcademicYearId: number,
    asSchoolId: number,
    asStdDivId: string,
    aiTestId: string
}
export interface IGetClassPassFailDetailsForTestResult {
    LstClassPassFailDetailsForTest: [{
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
    }],
    LstExamStatusForTest: [{
        ExamStatus: string,
        StandardDivisionId: number,
        SchoolWiseTestId: number,
        ExamStatusSortOrder: 2
    }],
    LstGetFileDetails:[{
        Subject_Id:number,
        Subject_Name:string,
        Standard_Division_Id:number,
        SchoolWise_Test_Id:number,
        Is_Submitted:string,
        Sort_Order:number,
        ExamStatus:string,
        Count:number,
        OriginalSubjectId:number,
        ExamStatusSortOrder:number
    }]

}