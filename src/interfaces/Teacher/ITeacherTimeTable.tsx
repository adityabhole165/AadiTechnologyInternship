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
