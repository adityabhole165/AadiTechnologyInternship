//standard division
export default  interface StandardAttendance {
    asSchoolId:string,
    asAcademicyearId:string,
    asTeacherId:number|string
}

export  interface GetStandardDivisionsResult {
    map(arg0: (item: any, index: any) => { Value: string; Name: string;}): unknown
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
    asStdDivId:string,
    asDate:string,
    asAcademicYearId:string,
    asSchoolId:string
}
