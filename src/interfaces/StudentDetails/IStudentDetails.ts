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


export interface IsAnyExamPublishedBody{
    asSchoolId:number,
    asAcademicYearId:number,
    asStandardId:number,
    asDivisionId:number,
    asIsExamPublished:boolean
}
// export interface IsAnyExamPublishedResult{

//     ExamPublishedListResult:
        
    
// }