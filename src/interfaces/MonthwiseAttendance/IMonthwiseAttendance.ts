export interface IGetMonthwiseAttendanceBody {
  asSchoolId: number;
  asAcademicyearId: number;
  asStanardDivisionId: number;
  TopRanker: number;
  Student_Id: number;
  SortExp: String;
  prm_StartIndex: number;
  PageSize: number;
}
export interface IGetMonthwiseAttendanceResult {
  RankImagePath: null;
  Roll_No: number;
  RollNo: string;
  StudentName: string;
  PresentDays: string;
  TotalDays: string;
  Percentage: String;
  Mar: String;
  Apr: String;
  May: String;
  Jun: String;
  Jul: String;
  Aug: String;
  Sep: String;
  Oct: String;
  Nov: String;
  Dec: String;
  Jan: String;
  Feb: String;
  MonthwiseDays: null;
}
