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
}
export interface IGetAllUsersReportingToGivenUserResult {
    UserId: string
    UserName: string
    IsSupervisor: string
}