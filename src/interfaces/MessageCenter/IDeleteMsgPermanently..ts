export interface IDeleteMessagePermanentlyBody {

    asSchoolId: string,
    asAcademicYearId: string,
    asUserId: string,
    asMessaageIds: string,
}

export interface IDeleteMessagePermanentlyResult {

    DeletionMessage: string
}