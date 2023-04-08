export interface IGetTransportCommitteeDetailsBody{
    aiUserId: string,
    aiSchoolId: string,
    aiAcademicYearId: string,
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