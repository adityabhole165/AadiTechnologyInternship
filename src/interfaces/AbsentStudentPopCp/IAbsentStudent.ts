export interface IGetAbsentStudentBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asUserId: number;
}

export interface IGetAbsentStudentResult {

    listGetAbsentStudentDetails: [
        {
            YearWise_Student_Id: string;
            EnrolmentNumber: string;
            RollNo: string;
            className: string;
            StudentName: string;
        }
    ],

    listLinkVisible: [
        {
            IsLinkVisibel: string;
        }
    ]
}
