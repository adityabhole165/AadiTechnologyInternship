export interface IGetITRFileNameBody {
    aiSchoolId: string,
    aiAcademicYearId: string,
    aiStudentId: string,
    aiFinancialYearId: string,
    SelectAcademicYearId: string,
    ITRCategoryId: string,
    aiLoginUserId: string
}
export interface IGetITRFileNameResult{
    Message: string
}

export interface GetAllAcademicYearsApiBody {
    aiSchoolId: string,
   aiYearwiseStudentId: string,
   };
   
   export interface GetAllAcademicYearsResult {
           GetAllAcademicYears:[{
           AcademicYear: string,
           Academic_Year_Id: string,
   
   }]
};