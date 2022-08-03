export interface Iyears {
    asSchoolId:string

}
export interface IgetYears{
    AcademicYearId:string,
    AcademicYearName:string
}

export interface IGetAllMonths  {
    asAcademicYearId:string,
    asSchoolId:string,
}
export interface IGetAllMonthlist{
    Abbreviation:string,
    MonthId:number,
    Name:string
}