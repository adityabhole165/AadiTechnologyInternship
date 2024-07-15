
export interface IGetSaveCommentBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asSchoolwiseStudentId: number;
    asCommentId: number;
    asDate: string;
    asComment: string;
    asLectureName: string;
    asUpdatedById: number;
    asIsDeleteAction: boolean;
    asAllowSubmit: boolean;
    asStdDivId: number;
}
export interface IGetSaveandSubmitCommentBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asSchoolwiseStudentId: number;
    asCommentId: number;
    asDate: string;
    asComment: string;
    asLectureName: string;
    asUpdatedById: number;
    asIsDeleteAction: number;
    asAllowSubmit: number;
    asStdDivId: number;
}
export interface IGetDeleteCommentBody {
    asSchoolId: number;
    asAcademicYearId: number;
    asUpdatedById: number;
    asUserId: number;
    aasStartDate: string;
    aasEndDate: string;
}