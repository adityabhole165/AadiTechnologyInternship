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
    RealatedSection: string,
}

export interface ParentCommittee{
    MobileNumber1: string,
    MobileNumber2: string,
    ContactTime: string,
    ParentName: string,
    ParentDesignation: string,
    Class: string

}