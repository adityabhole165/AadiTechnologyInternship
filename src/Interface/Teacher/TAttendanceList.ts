//aatendance list
export default interface AttendanceData{
    asStdDivId:string,
    asDate:string,
    asAcademicYearId:string,
    asSchoolId:string
}

export interface GetClassAttendanceResult {
    IsPresent: string
    JoinDate: string,
    RollNumber: string,
    Status: string,
    StudentId: number,
    StudentName: string
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

