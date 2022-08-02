export default interface ITimetable {
    asSchoolId:string,
    asAcademicYearId:string
    asStandardDivId:string,
    asTeacherId:string,
    asIsTeacher:string,
}

export  interface IWeekdays {
    asSchoolId:string,
    asAcademicYearId:string
}
export interface GetWeekDaysResult {
WeekDay:string
}

export interface GetTimetableResult {
LectureNumber: string,
Subject: string,
WeekDay: string,
WeekDayId:string
}