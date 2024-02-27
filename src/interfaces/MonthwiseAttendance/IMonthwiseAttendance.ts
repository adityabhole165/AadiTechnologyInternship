export interface IGetMonthwiseAttendanceBody {
  asSchoolId: number;
  asAcademicyearId: number;
  asStanardDivisionId: number;
  // TopRanker: number;
  // Student_Id: number;
  // SortExp: String;
  // prm_StartIndex: number;
  // PageSize: number;
}

export interface IGetMonthwiseAttendanceResult {
  StudentAttendanceDetailsList: [{
    RankImagePath: string;
    Roll_No: number;
    Student_Id: null;
    StudentName: string;
    PresentDays: string;
    TotalDays: string;
    Percentage: string;
    MonthwiseDays: [{
      MonthIndex: number;
      MonthName: string;
      Days: string;
    }]
  }]
}
