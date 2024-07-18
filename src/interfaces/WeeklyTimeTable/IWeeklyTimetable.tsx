export interface IGetTeacherAndStandardForTimeTableBody {
    asSchoolId: Number,
    asAcadmicYearId: Number,
    asTeacher_id: Number
}

export interface IGetTeacherAndStandardForTimeTableResult {
    listStandardIdDetiles: [{
        Standard_Id: string,
        Standard_Name: string,
        maxStdLecturesInWeek: string,
        Teacher_Id: string,
        Standard_Division_Id: string
    }],

    listTeacherNameDetiles: [{
        Teacher_Id: string,
        TeacherName: string,
        Designation_Id: string,
        Teacher_first_name: string,
        DesignationSortOrder: string,
        Teacher_Middle_Name: string,
        Teacher_Last_Name: string
    }]
}