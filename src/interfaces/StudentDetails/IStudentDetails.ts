export interface IGetStandardwiseMinMaxDOBBody {
    asSchoolId: string,
    asStandardId: string
}
export interface IGetStandardwiseMinMaxDOBResult {
    Start_Date: string,
    End_Date: string,
    Standard_Name: string
}

export interface IGetStudentUIPreConditionMsgBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardId: number
}

export interface IGetStudentUIPreConditionMsgResult {
    StudentsUiListResult: [
        {
            NavigateURL: string,
            ConfigureName: string
        }
    ]
}

export interface IsClassTeacherBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserId: number
}


export interface IsClassTeacherResult {
    CteacherListResult: [
        {
            Result: string
        }
    ]
}

export interface IGetBinaryImagesBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserId: number,
    asPhotoTypeId: number
}

export interface IGetBinaryImagesResult {
    CteacherListResult: [
        {
            UserId: string,
            TotalBytes: string
        }
    ]
}

export interface IGenerateTransportFeeEntriesBody {

    asSchoolId: number,
    asAcademicYearId: number,
    asStudentId: number,
    asUpdatedById: number
}


export interface IsAnyExamPublishedBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardId: number,
    asDivisionId: number,
    asIsExamPublished: boolean
}
export interface IsAnyExamPublishedResult {
    examListResult: [
        {
            IsExamPublishedStatus: boolean
        }
    ]
}

export interface IGetStudentMandatoryFieldsBody {
    asSchoolId: number
}

export interface IGetStudentMandatoryFieldsResult {
    FileListResult: [
        {
            FieldName: string
        }
    ]

}

export interface IStandrdwiseStudentsDocumentBody {
    asSchoolId: number,
    asStandardId: number,
    asStudentId: number,
    asAcademicYearId: number
}
export interface IStandrdwiseStudentsDocumentResult {

    StudentDocumentId: string,
    StandardwiseDocumentId: string,
    DocumentName: string,
    SchoolwiseStudentId: string,
    IsSubmitted: string,
    IsApplicable: string,
    DocumentCount: string,
    IsSubmissionMandatory: string

}

export interface IGetStudentsFormBody {
    AsiSchoolId: number,
    AsiAcademicYear: number,
    AsiStandardId: number,
    AsiDivisionId: number
}

export interface IStaffNameBody {
    asSchoolId: number,
    asUserRoleId: number,
    asAcademicYearId: number
}

export interface IStaffNameResult {

    UserId: string,
    UserName: string

}

export interface IRemoveStudentPhotoBody {
    asSchoolId: number,
    asStudentId: number
}