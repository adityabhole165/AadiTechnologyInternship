export interface IGetStudentRecordDataBody {
    asSchoolId: number
    asSchoolwiseStudentId: number
    asAcademicYearId: number
    asIsReadMode: string
    asUserId: number
}
export interface IGetStudentRecordDataResult {
    listGeneralDetails: [{
        StudentName: string
        DOB: string
        MotherName: string
        FatherName: string
        FatherOccupation: string
        MotherOccupation: string
    }];
    listSiblingsDetails: [{
        SiblingName: string
        Sex: string
        Age: string
        Standard: string
    }];
    listFamilyDetails: [{
        Id: string
        Name: string
        DisplayOnScreen: string
        SortOrder: string
    }];
    listBehaviorDetails: [{
        Id: string
        Name: string
        SectionId: string
        SortOrder: string
        ControlId: string
    }];
    listParameterDetails: [{
        Id: string
        ParameterId: string
        Answer: string
    }];
    listCommentDetails: [{
        Id: string
        Date: string
        Comment: string
        LectureName: string
        IsDefaultComment: string
        IsSubmitted: string
        IsCommentReadByConsellor: string
        IsCommentReadByPrincipal: string
        IsCommentReadByClassTeacher: string
        LoginUserDesignation: string
        InsertedById: string
        UserName: string
    }]
}
export interface ISubmitStudentRecordBody {
    asSchoolId: number
    asUpdatedById: number
    asSchoolwiseStudentId: number
    asCommentId: number
    asSubmitAllComments: string
    asAcademicYearId: number
}
export interface IMarkRecordAsReadBody {
    asSchoolId: number
    asAcademicYearId: number
    asUserId: number
    asSchoolwiseStudentId: number
}
export interface ISubmitStudentRecordCommentBody {
    asSchoolId: number
    asUpdatedById: number
    asSchoolwiseStudentId: number
    asCommentId: number
    asSubmitAllComments: number
    asAcademicYearId: number
}
export interface IGetStudentRecordCommentBody {
    asSchoolId: number
    asSchoolwiseStudentId: number
    asCommentId: number
}
export interface IGetStudentRecordCommentResult {
    Date: string
    Comment: string
    LectureName: string
}
export interface ISaveStudentRecordBody {
    asSchoolId: number
    asUpdatedById: number
    asStudentId: number
    asDataXML: string
    Date: string
}
