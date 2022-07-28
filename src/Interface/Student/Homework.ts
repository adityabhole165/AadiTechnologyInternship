export interface IHomework {
    asSchoolId:string,
    asAcademicYearId:string,
    asStdDivId:string,
    asDate:string,
    asLoginUserId:string
}

export interface IHomeworkResponse {
    AssignedDate:string,
    CompleteByDate:string,
    SubjectName:string,
    Title:string,
    Id:string
}

export interface IHomeworkSubject {
    asSchoolId:string,
    asAcademicYearId:string,
    asStdDivId:string,
    asDate:string,
    asLoginUserId:string
}

export interface IViewHomework {
    asSchoolId: string,
    asId: string,
    asLoginUserId:string
}

export interface IViewHomeworkResponse {
    AssignedDate:string,
    CompleteByDate:string,
    SubjectName:string,
    Title:string,
    Details:string,
    AttachmentPath:string
}