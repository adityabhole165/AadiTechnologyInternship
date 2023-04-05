export interface IHomeworkBody {

    aiSchoolId: string,
    aiAcademicYearId: string,
    aiStandardDivisionId: string,
    asStartdate: string,
    asEnddate: string

}

export interface IHomeworkResult {

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
    string
} 

