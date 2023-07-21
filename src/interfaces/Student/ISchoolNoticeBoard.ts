
export interface IGetNoticeBoardDetailsBody{
  
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiUserRoleId:string
}

export interface IGetNoticeBoardDetailsResult{
    Message: string,
    StartDate: string,
    EndDate: string

}