export interface IChangePassword {
  asUserName: string;
  asUserId: string;
  asSchoolId: string;
  asNewPassword: string;
  asOldPassword: string;
}

export interface IChangePasswordResult {
  ChangePasswordResult: string;
}

export interface IAcceptTermsBody {
  asSchoolId: string;
  asUserId: string;
}
export interface IAcceptTermsResult {
  AcceptTermsResult: boolean;
}
