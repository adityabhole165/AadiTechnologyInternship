export default interface IPta {
  asUserId: string;
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface GetPTADetailsResult {
  TeacherCommitteeList: string;
  ParentCommitteeList: string;
  Class: string;
  ContactTime: string;
  MobileNumber1: string;
  MobileNumber2: string;
  ParentDesignation: string;
  ParentName: string;

  RealatedSection: string;
  TeacherDesignation: string;
  TeacherName: string;
}
