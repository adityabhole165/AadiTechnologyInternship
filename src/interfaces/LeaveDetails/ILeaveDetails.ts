
export interface IGetCategoryDropdownBody {
    asSchoolId: number;
    asId: number;
}
export interface IGetCategoryDropdownResult {
    Id: string;
    Category: string;
}

export interface IGetViewLeaveBody {
    asSchoolId: number;
    asUserId: number;
    asId: number;
}

export interface IGetViewLeaveResult {
    Id: string,
    UserId: string,
    LeaveId: string,
    Status: string,
    StartDate: string,
    ChargeHandoverTo: string,
    EndDate: string,
    TotalDays: string,
    Description: string,
    StatusId: string,
    UserName: string,
    IsFinalApprover: string,
    ApproverRemark: string
}

export interface IGetDeleteLeaveBody {
    asSchoolId: number;
    asId: number;
    asUpdatedById: number;
}

export interface IGetLeaveDetailsListBody {
    asSchoolId: number,
    asUserId: number,
    asCategoryId: number,
    asStatusId: number,
    // asSortExpression:"StartDate Desc, EndDate asc, DesignationId asc ,FirstName  asc, MiddleName asc, LastName asc",
    asSortExpression: string,
    asStartIndex: number,
    asEndIndex: number,
    asShowOnlyNonUpdated: boolean,
    asAcademicYearId: number
}
export interface IGetLeaveDetailsListResult {
    RowNo: string,
    Id: string,
    UserId: string,
    LeaveId: string,
    Status: string,
    StartDate: string,
    EndDate: string,
    TotalDays: string,
    Description: string,
    StatusId: string,
    UserName: string,
    IsApprovedByApprover: string,
    LeaveName: string,
    LeaveBalance: string,
    IsLeaveUpdatedInPayroll: string,
    TotalRows: string,
    ApproverRemark: string
}


export interface IGetAcademicYearBody {
    asSchoolId: number;
}
export interface IGetAcademicYearResult {
    Academic_Year_ID: string;
    YearValue: string;
    School_Id: string;
    Is_Current_Year: string;
}

export interface IGetStatusDropdownBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserId: number,
    asCategoryId: number,
    asShowOnlyNonUpdated: boolean
}
export interface IGetStatusDropdownResult {
    StatusId: string;
    Status: string;
}

export interface IGetAllReportingUsersBody {
    asSchoolId: number,
    asAcademicYearId: number
}
export interface IGetAllReportingUsersResult {
    UserName: string,
    UserId: string,
    RoleId: string,
    ReportingParameterName: string,
    ReportingPrameterId: string,
    ReportingId: string
}