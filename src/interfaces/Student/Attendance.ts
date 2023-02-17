
// export interface IAttendance{
//     asStandardId: string,
//     asDivisionId: string,
//     asStudentId: string,
//     asMonth: string,
//     asYear: string,
//     asAcademicYearId: string,
//     asSchoolId: string
// }

export interface IAttendance {
    asStandardId: string,
    asDivisionId: string,
    asStudentId: string,
    asMonth: number,
    asYear: number,
    asAcademicYearId: string,
    asSchoolId: string
}

export interface GetStudentAttendaceForMonthResult {
    Attendance_Date: string;
    Day: string;
    Status: string;
    PresentDays: string;
    TotalAttendanceDays: string;
    TotalWorkingDays: string;
    DailyAttendanceList: any;
}

//////Attendance topper
export interface IGetAttendanceToppersBody {

    aiSchoolId: string,
    aiAcademicYearId: string,
    StandardDivisionId: string,
    TopRanker: string,
    aiStudentId: string

}

export interface IGetAttendanceToppersResult{


            RankImagePath: string,
            RollNo: number,
            StudentName: string,
            PresentDays: string,
            TotalDays: string,
            Percentage: string,
            MonthwiseDays: [
                {
                    MonthIndex: number,
                    MonthName: string,
                    Days: string
                }]
            }

            ///// Old Attendance
            export interface IGetAcademicYearsForOldAttendanceBody{

                aiSchoolId: string,
                aiStudentId: string,
                    abIncludeCurrentYear: string
            }
            export interface IGetAcademicYearsForOldAttendanceResult{

                AcademicYearId: string,
            AcademicYearName: string
            }
            export interface  IAcademicYearData{
                AcademicYearDetails:IGetAcademicYearsForOldAttendanceResult[]
            }
