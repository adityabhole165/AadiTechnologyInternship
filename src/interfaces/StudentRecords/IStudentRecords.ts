export interface IGetTeacherListBody {
  AsSchoolId: number;
  AsAcademicYearId: number;
  AsUserId: number;
  AsHasFullAccess: boolean;
}
export interface IGetTeacherListResult {
  listGetClass_Teachers: [
    {
      StdDivId: string;
      TeacherName: string;
    }
  ],
  listGetAssociatedTeacher: [{
    AssociatedClassId: string;
    IsPrincipal: string;
    IsCounsellor: string;
    IsSubjectTeacher: string
  }]
}

export interface IGetAllStudentStatusBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStdDivId: number;
  asFilter: string;
  sortExpression: string;
  sortDirection: string;
  StartIndex: number;
  EndIndex: number;
  ShowSaved: boolean;
  IncludeRiseAndShine: boolean;
  HasEditAccess: string;
  UserId: number;
}
export interface IGetAllStudentStatusResult {
  Name: string;
  SchoolWiseStudentId: number;
  RegNo: string;
  RollNo: number;
  Class: string;
  IsRecordFound: boolean;
  ReadyToReadCount: number;
  ReadyToSubmitCount: number;
  TotalRows: number;
}
