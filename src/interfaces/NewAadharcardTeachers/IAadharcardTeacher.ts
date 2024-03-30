
export interface IUpdateTeacherAadharDetailsBody {
  asUserId: number
  asSchoolId: number
  asAadharCardNo: string
  asAadharCardPhotoCopyPath: string
  asUpdatedById: string
  asSaveFeature: string
  asFolderName: string
  asBase64String: string
}

export interface IDeleteAadharCardPhotoCopyBody {
  asUserId: number
  asSchoolId: number
  asUpdatedById: number
}

export interface IGetUserDetailsForAadharCardNoBody {
  asSchoolId: number
  asUserId: number
}

export interface IGetUserDetailsForAadharCardNoResult {
  School_Id: string
  SchoolWise_Student_Id: string
  User_Id: string
  AadharCardNo: string
  AadharCard_Photo_Copy_Path: string
  TeacherFullName: string
}