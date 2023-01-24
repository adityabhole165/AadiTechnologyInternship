export interface IDeleteMessagePermanentlyBody {

    asSchoolId: string,
    asAcademicYearId: string,
    asUserId: string,
    asMessageIds: string,
}

export interface IDeleteMessagePermanentlyResult {

    DeletionMessage: string
}