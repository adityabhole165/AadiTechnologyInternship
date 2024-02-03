export interface ISaveStudentDetailsForSupportBody {
  asUserId: string;
  asSchoolId: string;
  asAcademicYearId: string;
  asFileName: string;
  asDescription: string;
  asEmailAddress: string;
  asSubject: string;
  asMobileNo: string;
  asBase64URLString: string;
}

export interface ISaveStudentDetailsForSupportResult {
  Message: string;
}
