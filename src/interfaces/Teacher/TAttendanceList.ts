//aatendance list
export default interface IGetClassAttendance{
    asStdDivId:string,
    asDate:string,
    asAcademicYearId:string,
    asSchoolId:string
}

export interface GetStudentDetailsResult {
    IsPresent: string
    JoinDate: string,
    RollNumber: string,
    Status: string,
    StudentId: number,
    StudentName: string
}
export interface IGetClassAttendanceResult {
    IsPresent: string
    JoinDate: string,
    RollNumber: string,
    Status: string,
    StudentId: number,
    StudentName: string
}
export interface IGetAttendanceStatusResult {
        StatusMessage:string,
        AbsentRollNos:string,
        AcademicYearMsg:string,
        AcYrStatusCode:string,
        IsAllPresentOrAbsentMessage:string
    }
    

export interface IGetStudentDetails{
    asStdDivId:string,
    asDate:string,
    asAcademicYearId:string,
    asSchoolId:string
}

export interface ISaveAttendance{
    asStandardDivisionId :string,
    asDate:string,
    asAbsentRollNos:string,
    asAllPresentOrAllAbsent:string,
    asUserId:string,
    asSchoolId:string,
    asAcademicYearId:string
}

export interface IGetAttendanceStatus{
    asAttendanceDate:string,
    asStanardDivisionId:string,
    asAcademicYearId:string,
    asSchoolId:string
}
