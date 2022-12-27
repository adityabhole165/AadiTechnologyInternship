export interface IHomework {
    asSchoolId: string,
    asAcademicYearId: string,
    asStdDivId: string,
    asDate: string,
    asLoginUserId: string
}

export interface IHomeworkResponse {
    AssignedDate: string,
    CompleteByDate: string,
    SubjectName: string,
    Title: string,
    Id: string
}

export interface IHomeworkSubject {
    asSchoolId: string,
    asAcademicYearId: string,
    asStdDivId: string,
    asDate: string,
    asLoginUserId: string
}

export interface IViewHomework {
    asSchoolId: string,
    asId: string,
    asLoginUserId: string
}

export interface IViewHomeworkResponse {
    AssignedDate: string,
    CompleteByDate: string,
    SubjectName: string,
    Title: string,
    Details: string,
    AttachmentPath: string,
    MoreAttachments:string[]
}

export interface Homework {
    Id: number,
    Title: string,
    AttachmentPath: string,
    AssignedDate: string,
    CompleteByDate: string,
    IsPublished: boolean,
    SubjectName: string,
    SubjectId: number,
    StandardDivisionId: string,
    className: string,
    Details: string,
}
export interface IHomeworkDetailsResult {
    GetHomeworkDetailsResult: {
        HomeworkSubjects: [
            {
                SubjectId: number,
                SubjectName: string
            }
        ],
        Homeworks: Homework[]
    }
}

export interface IHomeworkSubjectResult {
    GetHomeworkSubjectsResult: {
        HomeworkSubjects: HomeworkSubject[],
        Homeworks: Homework[]
    }
}
export interface HomeworkSubject {
    SubjectId: number,
    SubjectName: string
}