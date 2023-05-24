export interface IUserLoginExpiresBody {

    asSchoolId: string,
    asUserId: string,
    asAcademicYearId: string,
    asUserRoleId: string,
    asLastPasswordChangeDate: string
}

export interface IUserLoginExpiresResult {

    CurrentAcademicYearID: number,
    IsDeleted: string,
    IsLocked: string,
    IsLogoutRequired: string,
    LastPasswordChangeDate: string,
    Message: string

}