export interface ISaveStudentDetailsForSupportBody {
  asSchoolId: number;
  asAcademicYrId: number;
  asFileName: string;
  asDescription: string;
  asEmailAddress: string;
  asUserId: number;
  asSaveFeature: string;
  asSubject: string;
  asMobileNo: string;
  asBase64String: string;
  asFolderName: string
}

export interface ISaveStudentDetailsForSupportResult {
  string;
}

export interface IGetUserDetailsBody {
  asUserId: number;
  asSchoolId: number;
  asRoleId: number;
}
export interface IGetUserDetailsResult {
  StudentDetails: null;
  TeacherDetails: {
    TeacherId: number;
    IsClassTeacher: string;
    DesignationName: string;
    ClassName: string;
    IsPreprimary: string;
    StandardDivisionId: string;
    MobileNumber: string;
    Address: string;
    DOB: string;
    MPT_Applicable: string;
    Assembly_Applicable: string;
    Stayback_Applicable: string;
    IsAcademicYrApplicable: string;
    FinancialYearId: string;
    Email_Address: string;
    SchoolConfiguration: string;
    SchoolId: number;
    AcademicYearId: number;
    StartDate: string;
    EndDate: string;
  }
  AdminStaffDetails: string;
}
