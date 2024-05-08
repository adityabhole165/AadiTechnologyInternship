export interface IGetAllStudentsTestProgressSheetBody {


    asSchoolId: number,
    asAcademicYrId: number,
    asStdDivId: number,
    asStartIndex: number,
    PageCount: number,
    asTestId: number

}

export interface IGetAllStudentsTestProgressSheetResult {

    listMarksDetiles: [
        {
            Student_id: string,
            Header: string,
            Tests: string,
            Result: string,
            SubjectgroupTotal: string,
            SubjectTestType: string,
            TestTypes: string
        },
    ]
    listStatusDetiles: [
        {
            DisplayName: string,
            DisplayValue: string,
            ShortName: string,
            ForeColor: string,
            BackColor: string
        },
    ]

}