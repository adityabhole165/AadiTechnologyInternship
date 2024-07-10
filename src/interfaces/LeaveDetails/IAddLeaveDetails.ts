
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