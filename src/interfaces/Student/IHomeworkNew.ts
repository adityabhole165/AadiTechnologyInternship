export interface IGetDatewiseHomeworkDetailsBody {

    aiSchoolId: string,
    aiAcademicYearId: string,
    aiStandardDivisionId: string,
    asStartdate: string,
    asEnddate: string

}

export interface IGetDatewiseHomeworkDetailsResult {

    Id: number,
    Title: string,
    AttachmentPath: string,
    AssignedDate: string,
    CompleteByDate: string,
    IsPublished: boolean,
    SubjectName: string,
    SubjectId: number,
    StandardDivisionId: null,
    className: null,
    Details: string,
    MoreAttachments: null,
    MinDate: string,
    MaxDate: string

    HomeworkDates:[HomeworkDates]
}
export interface HomeworkDates{
    HomeworkDates: any
} 
// export interface Homework{
//     HomeworkDetails:IGetDatewiseHomeworkDetailsResult[]
// }
export interface HomeWork {
    HomeworkDates:IGetDatewiseHomeworkDetailsResult
}

