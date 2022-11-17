export interface IAuthenticateUser {
      asUserName: string,
      asPassword: string,
      asSchoolId: string,
      asIsSiblingLogin: boolean
}


export interface IAuthenticateUserResult {
      Name: string
      PhotoFilePath: string
      CurrentAcademicYearID: string,
      Id: string,
      IsAaryanSchool: string,
      IsDeleted: string,
      IsDummyAdmission: string,
      IsLocked: string,
      IsLogoutRequired: string,
      RoleId: string,
      RoleName: string,
      RolewiseUserId: string,
      ShowChangePasswordScreen: string,
      TermsAccepted: string,
      UserLogin: string,
      DOB: string,
}

export interface IStudentDetails{
        asSchoolId  :  string  ,
        asUserId  :  string  ,
        asRoleId  :  string  
}

export interface IStudentDetailsResult {
         AcademicYearId : string,
         EndDate : string,
         SchoolId : string,
         StartDate :  string ,
         Class :  string ,
         DivisionId : string,
         IsPreprimary :  string ,
         IsValid : string,
         RollNo :  string ,
         SchoolwiseStudentId : string,
         StandardDivisionId : string,
         StandardId : string,
         StudentId : string,
         XssedApplicable :  string ,
         StudentSiblingList : [
            {
                 FullName :  string ,
                 Id : string,
                 Password :  string ,
                 UserName :  string 
            }
        ],
    
}


export interface IGetDetails{
      "asSchoolId":string,
      "asUserId":string,
      "asRoleId":string
}

export interface IGetTeacherDetails {

      "AcademicYearId": number,
      "EndDate": string,
      "SchoolId": number,
      "StartDate": string,
      "ClassName":string,
      "DesignationName":string,
      "IsClassTeacher": string,
      "IsPreprimary": string,
      "StandardDivisionId": number,
      "TeacherId": number,
      "DOB": string,

}