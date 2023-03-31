
export interface ISaveStudentPhotoBody {
    aiSchoolId: string,
    aiStudentId: string,
    aiInsertedById: string,
    asPhotoBase64String: string

}
export interface ISaveStudentPhotoResult{
    Message: string

}


export interface ISubmitStudentPhotoBody {

    aiStudentId: string,
    aiUpdatedById: string,
    aiSchoolId: string,
    aiAcademicYearId: string
}

export interface ISubmitStudentPhotoResult {
    Message: string

}