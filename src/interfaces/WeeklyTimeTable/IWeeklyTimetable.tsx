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
    }],
    listStandardNameDetiles: [
        {
            Standard_Id: string,
            Standard_Name: string,
            maxStdLecturesInWeek: string,
            Original_Standard_Id: string
        }]
}
export interface IGetDivisionForStdDropdownResult {
    listStandardDivision: [
        {
            Standard_Division_Id: string,
            Standard_Division_Name: string,
            Standard_Id: string,
            Original_Standard_Id: string,
            Original_Division_Id: string
        }
    ]
}

export interface IGetDivisionForStdDropdownBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asStandardId: Number
}

export interface IGetDivisionForStdDropdownResult {
    SchoolWise_Standard_Division_Id: string,
    division_id: string,
    division_name: string
}
export interface IGetDataForAdditionalClassesBody {
    asSchoolId: Number,
    asAcademicYearID: Number,
    asTeacher_Id: Number,
    asStandardDivision_Id: Number
}

export interface IGetDataForAdditionalClassesResult {
    listWeekDayName: [
        {
            WeekDay_Name: string,
            Weekday_Id: string,
        }
    ],
    listLectureNumber: [
        {
            Lecture_Number: string,
            Weekday_Id: string,
        }]
    ,

    listclasssSubjectName: [
        {
            Standard_Division_Id: string,
            Subject_Id: string,
            classSubjectName: string,
            SubjectTeacher: string,
            Original_Standard_Id: string,
            Original_Division_Id: string
        }],
    listClassName: [
        {
            Standard_Division_Id: string,
            Lecture_Number: string,
            Subject_Id: string,
            ClassSubject: string,
            Weekday_Id: string
        }
    ],
    listSubjectName: any,
    listLectureNO: any

}

export interface IGetResetTimetableBody {
    asSchoolId: Number,
    asAcadmicYearId: Number,
    asTeacher_id: Number,
    asStandardDivision_Id: Number
}

export interface IGetTeacherSubjectMaxLecDetailsBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asTeacherId: Number,
    asStandardDivId: Number,
    asWeekDayName: string
}

export interface IGetTeacherSubjectMaxLecDetailsResult {
    TeacherSubjectMaxLecDetails: [
        {
            classSubjectName: string,
            Standard_Id: string,
            Standard_Name: string,
            TeacherShortName: string,
            Is_ClassTeacher: string,
            Subject_Name: string,
            Standard_Division_Id: string,
            Teacher_Subject_Id: string,
            Subject_Id: string,
            Teacher_Id: string,
            Teacher_Subject: string,
            maxSubjectLecturesInWeek: string,
            maxDaylectures: string,
            WeekDay_Name: string,
            Original_Standard_Id: string,
            Original_Division_Id: string,
            Original_Subject_Id: string,
            WeekDay_Short_Name: string
        }
    ],
    LectureNoAndStdDivId: any
}
