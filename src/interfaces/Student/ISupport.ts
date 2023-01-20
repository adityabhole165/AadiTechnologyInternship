
export interface ISaveStudentDetailsForSupportBody{
    asUserId: string,
    asSchoolId: string,
    asAcademicYearId: string,
    asFileName: null,
    asServerFilePath: string,
    asDescription: string,
    asEmailAddress: string,
    asSubject: string,
    asMobileNo:string,
    asadminmailaddress:string
}

export interface ISaveStudentDetailsForSupportResult{
    Message: string,

}