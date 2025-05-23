export interface IGetUserAadharCardDetailsBody {
  aiUserId: number;
  aiSchoolId: number;
  aiAcademicYrId: number;
}

export interface IGetUserAadharCardDetailsResult {
  User: any;
  RoleId: number;
  RoleName: string;
  AadharCardNo: string;
  AadharCardFileName: string;
  AllowAadharCardSubmit: boolean;
  NameOnAadharCard: string;
  asMotherTongue: string;
  asEmailId: string;
}

export interface ISaveUserAadharCardDetailsBody {
  aiUserId: number;
  asSchoolId: number;
  asAadharCardNo: string;
  asAadharCardFileName: string;
  asUserRoleId: string;
  asAadharCardBase64String: string;
  asNameOnAadharCard: string;
}

export interface ISaveUserAadharCardDetailsResult {
  Message: string;
}
