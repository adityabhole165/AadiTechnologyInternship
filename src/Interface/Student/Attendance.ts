
// export interface IAttendance{
//     asStandardId: string,
//     asDivisionId: string,
//     asStudentId: string,
//     asMonth: string,
//     asYear: string,
//     asAcademicYearId: string,
//     asSchoolId: string
// }

export interface IAttendance{
    asStandardId:string,
    asDivisionId:string,
    asStudentId:string,
    asMonth:number,
    asYear:number,
    asAcademicYearId:string,
    asSchoolId:string
}

export interface GetStudentAttendaceForMonthResult{
    Attendance_Date: string;
    Day: string;
    Status: string;
    PresentDays: string;
    TotalAttendanceDays: string;
    TotalWorkingDays: string;
    DailyAttendanceList : any;
}