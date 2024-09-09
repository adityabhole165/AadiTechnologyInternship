
export interface IGetAllYearsBody {
    asSchoolId: number;
}

export interface IGetAllYearsResult {
    Year: string
    Academic_Year_Id: string
}
export interface IGetAllUsersReportingToGivenUserBody {
    asSchoolId: number
    asUserID: number
    asYear: number
    asShowPending: boolean
    asStartIndex: number
    asPageSize: number
}
export interface IGetAllUsersReportingToGivenUserResult {
    RowID: string
    TotalRows: string
    UserId: string
    UserName: string
    IsSupervisor: string

}

export interface IGetPerformanceEvaluationDetailsBody {
    asSchoolId: Number,
    asUserId: Number,
    asReportingUserId: Number,
    asYear: Number,
    asAcademicYearId: Number
}

export interface IGetPerformanceEvaluationDetailsResult {
    listSchoolOrgnNameDetiles: [
        {
            School_Orgn_Name: string,
            School_Name: string,
            Address: string
        }
    ],
    listUserNameDetiles: [
        {
            UserName: string,
            Designation: string,
            JobStatus: string,
            EmployeeNo: string,
            JoiningDate: string,
            ServiceLength: string,
            FormFor: string,
            Standards: string,
            Subjects: string,
            UserRoleId: string,
            AcademicYear: string,
            LastIncrementDate: string,
            EffectiveFromDate: string,
            Address: string,
            Year_Of_Passing: string
        }
    ],
    listDescriptionDetiles: [{
        Id: string,
        Name: string,
        ShortName: string,
        Description: string,
        SortOrder: string,
        OriginalGradeId: string,
        SchoolId: string,
        IsDeleted: string
    }
    ],
    listTecherTitleDetiles: [
        {
            Id: string,
            Title: string,
            SortOrder: string,
            SkillId: string,
            IsSubmitted: string,
            AppraisalFormTypeId: string,
            FormType: string
        }
    ],
    listOriginalSkillIdDetiles: [
        {
            Id: string,
            Name: string,
            SortOrder: string,
            OriginalSkillId: string,
            SchoolId: string,
            IsDeleted: string,
            InputTypeId: string,
            IsEditableToAll: string
        }
    ],
    listParameterIdDetiles: [
        {
            Id: string,
            ParameterId: string,
            GradeId: string,
            Observation: string,
            ReportingUserId: string
        }
    ],
    listIsPublishedDetiles: [
        {
            Id: string,
            IsPublished: string,
            ReportingUserId: string
        }
    ],
    listIsFinalApproverDetiles: [
        {
            UserName: string,
            Designation: string,
            ReportingUserId: string,
            IsFinalApprover: string,
            IsSupervisor: string,
            IsSubmitted: string,
            ApprovalSortOrder: string,
            AttachmentCount: string
        }
    ],
    listEnableRejectButtonDetiles: [
        {
            EnableRejectButton: string,
            EnableSaveButton: string,
            EnableSubmitButton: string,
            EnablePublishButton: string,
            IsPublished: string,
            CanUserAddComments: string
        }
    ]
}

export interface IGetUserInvestmentMethodDetailsBody {
    asSchoolId: Number,
    asFinancialYearId: Number,
    asUserId: Number,
    asDocumentId: any,
    asDocumentTypeId: Number
}

export interface IGetUserInvestmentMethodDetailsResult {
    DocumentName: string,
    UserName: string
}

export interface IGetAllDocumentsListBody {
    asSchoolId: Number,
    asUserId: Number,
    asFinancialYearId: Number,
    asDocumentTypeId: Number,
    asAcademicYearId: Number,
    asDocumentId: Number,
    asReportingUserId: Number,
    asLoginUserId: Number
}

export interface IGetAllDocumentsListResult {
    Id: string,
    FileName: string
}

export interface ISaveStaffPerformanceEvalDetailsBody {
    asSchoolId: Number,
    asUpdatedById: Number,
    asUserId: Number,
    asReportingUserId: Number,
    asYear: Number,
    asPerformanceXml: string,
    asClasses: string,
    asSubjects: string
}

export interface ISubmitStaffPerformanceDetailsBody {
    asSchoolId: Number,
    asUserId: Number,
    asReportingUserId: Number,
    asYear: Number,
    asIsSubmitAction: Number
}

export interface IPublishStaffPerformanceDetailsBody {
    asSchoolId: Number,
    asUserId: Number,
    asReportingUserId: Number,
    asYear: Number,
    asIsPublish: Boolean,
    asAcademicYearId: Number,
    asEffectiveDate: string,
    asLastIncrementDate: any
}

