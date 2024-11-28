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



export interface IGenerateTransportFeeEntriesBody {

    asSchoolId: number,
    asAcademicYearId: number,
    asStudentId: number,
    asUpdatedById: number
}

export interface IGetFormNumberBody {
    asSchoolId: number,
    asStudentId: number
}

export interface IGetFormNumberResult {
    FormNumberList: [
        {
            FormNumber: string
        }
    ]
}

export interface IGetStudentsSiblingDetailBody {

    asSchoolId: number,
}

export interface IGetStudentsSiblingDetailResult {

    CommonFieldId: string,
    CommonFieldName: string

}

export interface IGetAcademicDatesForStandardBody {
    asSchoolId: number
    asAcademicYearID: number
    asStandardId: number
}
export interface IGetAcademicDatesForStandardResult {
    StandardwiseAcademicYearId: string
    Academic_Year_Id: string
    StandardId: string
    StartDate: string
    EndDate: string
    SchoolReopeningDate: string
    School_Id: string
    Is_Deleted: string
    InsertedById: string
    InsertDate: string
    UpdatedById: string
    UpdateDate: string
}
export interface IGetStudentMandatoryFieldsBody {
    asSchoolId: number
}
export interface IGetStudentMandatoryFieldsResult {
    FileListResult: []
}

export interface IUpdateStudentTrackingDetailsBody {
    asSchoolId: number
    asStudentId: number
    asInsertedById: number
    asID: number
    asAcademicYearId: number
}
//Add Note Popup

export interface IGetStudentNameForAchievementControlBody {
    asSchoolId: number
    asStudentId: number
}

export interface IGetStudentNameForAchievementControlResult {
    StudentName: string
    RegistrationNo: string
}

export interface IGetStudentsAllAchievementDetailsBody {
    asSchoolId: number
    asStudentId: number
}

export interface IGetStudentsAllAchievementDetailsResult {
    AchievementId: string
    ClassName: string
    Description: string
    Attachment: string
    AchievementDate: string
}
export interface IGetStudentAchievementDetailsBody {
    asAchievementId: number
    asSchoolId: number
    asStudentId: number
}

export interface IGetStudentAchievementDetailsResult {
    AchievementId: string
    AchievementDate: string
    Description: string
    Attachment: string
}
export interface ISaveStudentAchievementDetailsBody {
    asAchievementId: number
    asStudentId: number
    asAchievementDate: string
    asDescription: string
    asAttachment: string
    asSchoolId: number
    asAcademicYearId: number
    asUpdatedById: number
    asSaveFeature: string
    asFolderName: string
    asBase64String: string
}
export interface IDeleteStudentAchievementDetailsBody {
    asSchoolId: number
    asStudentId: number
    asAchievementId: number
    asUpdatedById: number
}







