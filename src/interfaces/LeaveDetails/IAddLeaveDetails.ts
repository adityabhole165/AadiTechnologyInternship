
export interface IGetLeaveBalanceBody {
    asSchoolId: number;
    asUserId: number;
}

export interface IGetLeaveBalanceResult {
    Id: string;
    LeaveId: string;
    ShortName: string;
    LeaveBalance: string;
    IsUnpaidLeave: string;
}

export interface IGetLeaveTypeDropdownBody {
    asSchoolId: number;
}

export interface  IGetLeaveTypeDropdownResult {
    SchoolId: string,
    OriginalLeaveId: string,
    LeaveId: string,
    LeaveName: string,
    ShortName: string,
    CanAccumulate: string,
    AccumulateLeaves: string,
    IsUnPaidLeave: string,
    IsODApplicable: string,
    CurrentYearAccumulated: string,
    MinimumBalance: string,
    ColorCode: string,
    ExcludeFromDeduction: string,
    AllowZeroBalance: string
}
