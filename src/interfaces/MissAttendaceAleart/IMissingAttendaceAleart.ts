export interface IMissingattendancealeartNameBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserId: number,
    asStandardDivisionId: null,
    asDate: null,
}

export interface IMissingattendancealeartNameResult {

    MissingAttendanceDetailsList: [
        {
            StandardDivisionId: string,
            ClassTeacherName: string,
            ClassName: string,
            MissingDays: string,
            TotalWorkDaysCount: string
        },
    ],
}

export interface IMissingattendancealeartDateBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserId: number,
    asStandardDivisionId: number,
    asDate: null,
}

export interface IMissingattendancealeartDateResult {
    MissingAttendanceDatesList: [
        {
            MissingAttendanceDates: string,
        },
    ]


}