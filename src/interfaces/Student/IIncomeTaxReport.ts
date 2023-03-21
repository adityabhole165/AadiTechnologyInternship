export interface IGetITRFileNameBody {
    aiSchoolId: number,
    aiAcademicYearId: number,
    aiStudentId: number,
    aiFinancialYearId: number,
    aiSelectAcademicYearId: number,
    aiCategoryId: number
}
export interface IGetITRFileNameResult{
    Message: 'string'
}