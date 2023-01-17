export interface IGetSupportDetailsBody{

    aiUserID:string,
    aiSchoolId: string,
    aiAcademicYrId: string,
}

export interface IGetSupportDetailsResult{

    EmailId: string,
    MobileNo: string
}