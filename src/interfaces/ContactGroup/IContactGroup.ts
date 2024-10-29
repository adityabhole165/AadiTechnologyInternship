export interface IGetUserNameBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asGroupId: number,
    asRoleId: number,
    asStartIndex: number,
    asEndIndex: number,
    asSortDirection: string,
    asStandardDivisionId: number,
    asFilter: string
}
export interface IGetUserNameResult {
    UserId: string,
    UserName: string,
    IsInGroup: string,
    IsDeactivated: string
}
export interface IGetMailingGroupsBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asGroupId: number,
    asRoleId: number,
    asUserId: number
}
export interface IGetMailingGroupsResult {
    GroupId: string,
    GroupName: string,
    Users: string,
    IsDefault: string,
    IsAllDeactivated: string
}
export interface IGetUserRoleBody {
    asSchoolId: number
}
export interface IGetUserRoleResult {
    User_Role_Id: string,
    User_Role_Name: string
}
export interface IGetStandardClassBody {
    asSchoolId: number,
    asAcademicYearId: number
}
export interface IGetStandardClassResult {
    SchoolWise_Standard_Division_id: string,
    StandardDivision: string,
    division_name: string,
    Standard_Id: string,
    Division_Id: string,
    Original_Standard_Id: string,
    Original_Division_Id: string,
    Standard_Name: string
}
export interface IAddUpdateGroupBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asMailingGroupXML: string
}
export interface IAddUpdateGroupResult {
    string
}