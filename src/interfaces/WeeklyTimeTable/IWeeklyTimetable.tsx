
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
    listSubjectName: [
        {
            Standard_Division_Id: string,
            Lecture_Number: string,
            WeekDay_Name: string,
            Subject_Name: string,
            ClassName: string,
            Weekday_Id: string
        }
    ],
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

// FOR TEACHER TIMETABLE RETRIEVAL AND DISPLAY
export interface IGetTimeTableForTeacherBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asTeacherID: Number
}

export interface IGetTimeTableForTeacherResult {
    Lecture_No_WeekDay: [
        {
            Lecture_No: string,
            Monday: string,
            Tuesday: string,
            Wednesday: string,
            Thursday: string,
            Friday: string
        }],
    WeekDayIds: [
        {
            Weekday_id: string
        }
    ],
    Applicable: [
        {
            MPT_Applicable: string,
            Assembly_Applicable: string,
            Stayback_Applicable: string,
            WeeklyTestApplicable: any
        }
    ],
    Lecture_No_WeekDayStayback: any,
    Lecture_No_WeekDayAssembly: any,
    Lecture_No_WeekDayMPT: any,
    TotalStayback: [
        {
            TotalStaybacks: string
        }
    ],
    TotalAssemblys: [
        {
            TotalAssembly: string
        }
    ],
    TotalMPTs: [
        {
            TotalMPT: string
        }
    ],
    TimeTableDetails: [
        {
            TeacherId: string,
            LectureNumber: string,
            WeekDayName: string,
            SubjectName: string,
            ClassName: string,
            SchoolTimeTableDetailId: string,
            SubjectId: string,
            WeekdayId: string,
            TeacherSubjectId: string,
            TeacherName: String,
            ID: string
        }
    ],
    Lecture_No_WeekDayWeeklyTest: any,
    TotalWeeklyTests: [
        {
            TotalWeeklyTest: string
        }
    ]
}

// FOR CLASS TIMETABLE RETRIEVAL AND DISPLAY
export interface IGetClassTimeTableBody {
    asSchool_Id: Number,
    asAcademicYear_ID: Number,
    asStandardDivisionId: Number
}

export interface IGetClassTimeTableResult {
    Lecture_No_WeekDayForClass: [
        {
            Lecture_No: string,
            Monday: string,
            Tuesday: string,
            Wednesday: string,
            Thursday: string,
            Friday: string
        }
    ],
    WeekDayIdsForClass: [
        {
            Weekday_id: string
        }
    ],
    WeekDayDeatilsForClass: any,
    AddtionalLecturesForClass: any,
    LectureNumberForClass: any,
    Lecture_No_WeekDayAssemblyForClass: [
        {
            WeekDay_Name: string,
            WeekDays_Id: string,
            StandardDivision_Id: string,
            Lecture_Number: string
        }
    ],
    Lecture_No_WeekDayMPTForClass: [
        {
            WeekDay_Name: string,
            WeekDays_Id: string,
            StandardDivision_Id: string,
            Lecture_Number: string
        }
    ],
    Lecture_No_WeekDayWeeklyTestForClass: any
}

export interface IGetSaveTeacherTimeTableBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asInsertedById: Number,
    asTeacherID: Number,
    asMasterXml: string,
    asDetailXml: string
    asTeacherXML: string,
    IsAdditionalClass: Number,
    asIncCnt: Number
}

// Additional Lecture For Teacher | API Interface
export interface IGetManageClassTimeTableBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asInserted_By_id: Number,
    asStandardDivId: Number,
    asDayTimeTableMasterXml: string,
    asDayTimeTableDetailsXml: string,
    asIsAdditionalClass: boolean,
    asIsCountInceased: Number
}

// Delete Additional Lecture API Interface
export interface IGetDeleteAdditionalLectureBody {
    asSchoolId: Number,
    asAcadmicYearId: Number,
    asTeacherId: Number,
    asStayBack: boolean,
    asMPTweekday: string,
    asMPTLectNo: Number,
    asAssemblyDay: string,
    asAssemblyLecNo: Number
}

export interface IGetDeleteAdditionalLecturesBody {
    asSchoolId: Number,
    asDetailID: Number
}