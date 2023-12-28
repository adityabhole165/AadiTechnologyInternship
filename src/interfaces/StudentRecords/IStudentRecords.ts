export interface IGetTeacherListBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserId: number,
    HasFullAccess: string
}
export interface IGetTeacherListResult {
    lstAssociatedTeacher: [{
        StdDivId: number,
        TeacherName: string
    }]
}
export interface IGetAllStudentStatusBody {
    asSchoolId: string,
    asAcademicYearId: string,
    asStdDivId: string,
    asFilter: string,
    sortExpression: string,
    sortDirection: string,
    StartIndex: number,
    EndIndex: number,
    ShowSaved: boolean,
    IncludeRiseAndShine: boolean,
    HasEditAccess: string,
    UserId: number
}
export interface IGetAllStudentStatusResult {
    Name: string,
    SchoolWiseStudentId: number,
    RegNo: string,
    RollNo: number,
    Class: string,
    IsRecordFound: boolean,
    ReadyToReadCount: number,
    ReadyToSubmitCount: number,
    TotalRows: number

}