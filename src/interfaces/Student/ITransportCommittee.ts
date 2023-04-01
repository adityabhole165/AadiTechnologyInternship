export interface IGetTransportCommitteeDetailsBody{
    asUserId: string,
    asSchoolId: string,
    asAcademicYearId: string,
};

export interface IGetTransportCommitteeDetailsResult{
  
TeachersCommittee: [TeachersCommittee],
ParentCommittee : [ParentCommittee]

}
export interface TeachersCommittee{
    TeacherName: string,
    TeacherDesignation: string,
    TeacherRealatedSection: string,
}

export interface ParentCommittee{
    Class: string,
    ContactTime: string,
    MobileNumber1: string,
    MobileNumber2: string,
    ParentDesignation: string,
    ParentName: string

}