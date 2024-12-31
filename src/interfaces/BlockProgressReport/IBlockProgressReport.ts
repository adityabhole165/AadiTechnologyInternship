export interface IBlockUnBlockStudentsBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asShowblocked: number,
    asStudentId: number,
    asSearch: string,
    asSortExp: string,
    asStartIndex: number,
    asEndIndex: number

}

export interface IBlockUnBlockStudentsResult {
    listStudentsName: [
        {
            RegNo: string,
            YearwiseStudentId: string,
            RollNo: string,
            StudentName: string,
            Reason: string,
            RowNo: string
        }
    ];
    listStudentsCount: [
        {
            Count: string

        }
    ]
}

export interface IAllClassTeachersBody {
    asSchoolId: number,
    asAcademicYearId: number

}
export interface IAllClassTeachersResult {
    TeacherName: string,
    Teacher_Id: string,
    Designation_Id: string,
    Teacher_First_Name: string,
    Standard_Name: string,
    Division_Name: string,
    Original_Standard_Id: string,
    Original_Division_Id: string,
    SchoolWise_Standard_Division_Id: string

}