export interface IGetSchoolAttendanceOverviewBody
     {
    
        asSchoolId: number,
        asAcademicYearId: number,
        asSelectedDate:string
     }

export interface IGetSchoolAttendanceOverviewResult 
{
  SchoolWiseStandardDivisionId: number,
            StandardId: number,
            StandardName: string,
            DivisionId: number,
            DivisionName: number,
            AttendanceTaken: number,
            PresentStudentWithTotal: number
}

export interface IGetSchoolAttendanceOverviewList{
   ClasswiseAttendanceStatusList:IGetSchoolAttendanceOverviewResult[]
}

