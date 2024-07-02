
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
    IsApprovedByApprover: string,
    ApproverRemark: string
}

export interface IGetDeleteLeaveBody {
    asSchoolId: number;
    asUserId: number;
    asUpdatedById: number;
}

export interface IGetLeaveDetailsListBody {
    asSchoolId: number,
    asUserId: number,
    asCategoryId: number,
    // asSortExpression:"StartDate Desc, EndDate asc, DesignationId asc ,FirstName  asc, MiddleName asc, LastName asc",
    asSortExpression: string,
    asStartIndex: number,
    asEndIndex: number,
    asShowOnlyNonUpdated: boolean
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
