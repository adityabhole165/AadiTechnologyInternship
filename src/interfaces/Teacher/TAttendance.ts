//standard division
export default  interface StandardAttendance {
    asSchoolId:string,
    asAcademicyearId:string,
    asTeacherId:number|string
}

export  interface GetStandardDivisionsResult {
    Class: string,
    Id: string
}


export interface ISaveStudentAttendanceDetails {
    asStandardDivisionId:string,
    asDate:string,
    asAbsentRollNos:string,
    asAllPresentOrAllAbsent:string,
    asUserId:string,
    asSchoolId:string,
    asAcademicYearId:string
}

export interface GetSaveStudentAttendanceDetails {
        RollNo: string,
        AllStudentStatusMsg: string
}

export interface IStudentsDetails{
    asDate:string,
    asAcademicYearId:string,
    asSchoolId:string
}
