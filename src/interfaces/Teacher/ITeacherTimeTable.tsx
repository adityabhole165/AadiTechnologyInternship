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

