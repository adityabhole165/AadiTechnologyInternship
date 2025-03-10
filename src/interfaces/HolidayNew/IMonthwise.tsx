export interface MonthwiseAttendanceIBody {
    asSchoolId: number;
    asAcademicyearId: number;
    asStanardDivisionId: number;
}
export interface MonthwiseAttendanceIResult {
    StudentAttendanceDetailsList: [{
        RankImagePath: string;
        Roll_No: number;
        Student_Id: null;
        StudentName: string;
        PresentDays: string;
        TotalDays: string;
        Percentage: string;
        MonthwiseDays: [{
            MonthIndex: number;
            MonthName: string;
            Days: string;
        }]
    }]
}