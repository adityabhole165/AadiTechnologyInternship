export interface IGetTeacherTimeTableBody {
    asSchoolId: Number,
    asAcademicYearID: Number,
    asTeacher_Id: Number
}

export interface IGetTeacherTimeTableResult {
    listLectureName: [
        {
            Lecture_No: string,
            Lecture_Name: string,
            Monday: string,
            Tuesday: string,
            Wednesday: string,
            Thursday: string,
            Friday: string
        }
    ],
    listWeekdayid: [
        {
            Weekday_id: string,
            MaxLectures: string
        }
    ],
    listWeekDay_Name1: [
        {
            WeekDay_Name: string,
            Lecture_Number: string
        }
    ],
    listWeekDay_Name2: any,
    listWeekDay_Name3: any,
    listWeeksDayName: any,
    listMPT_Applicables: [
        {
            MPT_Applicable: string,
            Assembly_Applicable: string,
            Stayback_Applicable: string
        }
    ]
}

export interface IGetLectureCountsForTeachersBody {
    asSchoolId: Number,
    asTeacher_Id: Number,
    asConsiderAssembly?: string,
    asConsiderMPT?: string,
    asConsiderStayback?: string,
    asConsiderWeeklyTest?: string
}

export interface IGetLectureCountsForTeachersResult {
    Teacher_Subject_Id: Number,
    Class_Subject: Number,
    Count: Number,
    Standard_Division_Id: Number,
    Subject_Id: Number
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
            Weekday_Id: string
        }
    ],
    listLectureNumber: [
        {
            Lecture_Number: string,
            Weekday_Id: string
        }
    ],
    listclasssSubjectName: [
        {
            Standard_Division_Id: string,
            Subject_Id: string,
            classSubjectName: string,
            SubjectTeacher: string,
            Original_Standard_Id: string,
            Original_Division_Id: string
        }
    ],
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
