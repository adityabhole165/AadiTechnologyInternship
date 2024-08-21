export interface IGetAbsentStudentDetailsBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asSelectedDate: string,
    asMaxDaysLimit: number,
}

export interface IGetAbsentStudentDetailsResult {

    listAbsentStudentDetails: [
        {
            StudentName: string,
            Mobile_Number: string,
            Mobile_Number2: string,
            User_Id: string,
            FromAbsentDate: string
        }
    ],
    listHalfdayStudentDetails: [
        {
            StudentName: string,
            Mobile_Number: string,
            Mobile_Number2: string,
            User_Id: string,
            FromAbsentDate: string
        }
    ]
}
