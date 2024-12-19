export interface IUsergroup {
  asAcademicYearId: string;
  asSchoolId: string;
  asStdDivId: string;
  asUserId: string;
  asName: string;
  asSelectedUserGroup: string;
  abIsSMSCenter: boolean;
  IsForLeftStudents: boolean;
}

export interface GetUsersInGroupResult {
  GetUsersInGroupResult: [
    {
      Id: string;
      RoleId: number;
      RoleName: string;
      UserLogin: string;
      IsLocked: string;
      IsDeleted: string;
      IsValid: string;
      IsDummyAdmission: string;
      IsLogoutRequired: string;
      CurrentAcademicYearID: string;
      Message: string;
      LastPasswordChangeDate: string;
      TermsAccepted: string;
      Name: string;
      PhotoFilePath: string;
      RolewiseUserId: string;
      ShowChangePasswordScreen: boolean;
      IsAaryanSchool: string;
    }
  ];
}

export interface IGetStudentsUser {
  asStdDivId: string;
  asAcadmeicYearId: string;
  asSchoolId: string;
}

export interface GetStudentsUserResult {
  GetStudentsUserResult: [
    {
      CurrentAcademicYearID: string;
      Id: string;
      IsAaryanSchool: string;
      IsDeleted: string;
      IsDummyAdmission: string;
      IsLocked: string;
      IsLogoutRequired: string;
      IsValid: string;
      LastPasswordChangeDate: string;
      Message: string;
      Name: string;
      PhotoFilePath: string;
      RoleId: number;
      RoleName: string;
      RolewiseUserId: string;
      ShowChangePasswordScreen: boolean;
      TermsAccepted: string;
      UserLogin: string;
    }
  ];
}

// Onload Api Call
export interface GetAdminAndprincipalUsers {
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface GetAdminAndprincipalUsersResult {
  GetAdminAndprincipalUsersResult: [
    {
      Id: number;
      RoleId: number;
      RoleName: number;
      UserLogin: string;
      IsLocked: string;
      IsDeleted: string;
      IsValid: string;
      IsDummyAdmission: string;
      IsLogoutRequired: string;
      CurrentAcademicYearID: number;
      Message: string;
      LastPasswordChangeDate: string;
      TermsAccepted: string;
      Name: string;
      PhotoFilePath: string;
      RolewiseUserId: number;
      ShowChangePasswordScreen: number;
      IsAaryanSchool: number;
    }
  ];
}
