
export  interface IUsergroup{
    asAcademicYearId:string,
    asSchoolId:string,
    asStdDivId:string,
    asUserId:string,
    asSelectedUserGroup:string,
    abIsSMSCenter:boolean
}

export  interface GetUsersInGroupResult{
    Id:string,
    RoleId:number,
    RoleName:string,
    UserLogin:string,
    IsLocked:string,
    IsDeleted:string,
    IsValid:string,
    IsDummyAdmission:string,
    IsLogoutRequired:string,
    CurrentAcademicYearID:string,
    Message:string,
    LastPasswordChangeDate:string,
    TermsAccepted:string,
    Name:string,
    PhotoFilePath:string,
    RolewiseUserId:string,
    ShowChangePasswordScreen:boolean,
    IsAaryanSchool:string

}

export  interface IGetStudentsUser{
    asStdDivId:string,
    asAcadmeicYearId:string,
    asSchoolId:string
} 

export  interface GetStudentsUserResult{
    CurrentAcademicYearID:string,
    Id:string,
    IsAaryanSchool:string,
    IsDeleted:string,
    IsDummyAdmission:string,
    IsLocked:string,
    IsLogoutRequired:string,
    IsValid:string,
    LastPasswordChangeDate:string,
    Message:string,
    Name:string,
    PhotoFilePath:string,
    RoleId:number,
    RoleName:string,
    RolewiseUserId:string,
    ShowChangePasswordScreen:boolean,
    TermsAccepted:string,
    UserLogin:string


}

// Onload Api Call
export interface GetAdminAndprincipalUsers{
    asAcademicYearId: string,
    asSchoolId: string
}

export interface GetAdminAndprincipalUsersResult{
    Id: number,
    RoleId:number,
    RoleName: null,
    UserLogin: null,
    IsLocked:string,
    IsDeleted:string,
    IsValid:string,
    IsDummyAdmission:string,
    IsLogoutRequired:string,
    CurrentAcademicYearID: number,
    Message: null,
    LastPasswordChangeDate: null,
    TermsAccepted: null,
    Name: string,
    PhotoFilePath: null,
    RolewiseUserId: null,
    ShowChangePasswordScreen: number,
    IsAaryanSchool: number
}