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
    listGetUserName: [
        {
            UserId: string,
            UserName: string,
            IsInGroup: string,
            IsDeactivated: string
        }
    ];
    listGetUserNameCount: [
        {
            TotalUserCount: string

        }
    ]
}
export interface IGetContactGroupsBody {
    asSchoolId: string,
    asAcademicYearId: string,
    asGroupId: string,
    asUserRoleId: string,
    asUserId: string
}
export interface IGetContactGroupsResult {
    ContactGroups: [
        {
            GroupId: number,
            GroupName: string,
            Users: string,
            IsDefault: boolean,
            IsAllDeactivated: boolean
        }
    ];
    ContactGroupUserRoles: string;
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
export interface IDeleteMailGroupBody {
    asSchoolId: number,
    asGroupId: number,
    asInsertedById: number
}
export interface IDeleteMailGroupResult {
    string
}
export interface IDeleteMailingGroupUserBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asGroupId: number,
    asUserId: number,
    asInsertedById: number
}
export interface IGetUsersBody {
    asSchool_Id: number,
    asAcademicYearId: number,
    asGroupId: number
}
export interface IGetUsersResult {
    UserId: string,
    UserName: string,
    IsDeactivated: string,
}
export interface ICountUsersAndStoreCountsBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asGroupId: number,
    asRoleId: number,
    asStandardDivisionId: number,
    asFilter: string
}
export interface ICountUsersAndStoreCountsResult {
    TotalCount: string,
}