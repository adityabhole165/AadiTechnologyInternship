export default interface IGetAllStandards {
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface IGetExamsList {
  asAcademicYearId: string;
  asSchoolId: string;
  asStandardId: any;
}

export interface GetStandardListResult {
  GetAllStandardsResult: [
    {
      Id: string;
      Name: string;
    }
  ];
}
export interface GetExamsForStandardResult {
  GetExamsForStandardResult: [
    {
      Id: string;
      Name: string;
    }
  ];
}

export interface GetExamListResult {
  Id: string;
  Name: string;
}

export interface IExamList {
  asSchoolId: string;
  asAcademicYearId: string;
  asStandardId: string;
  asExamId: string;
}

export interface GetExamsListResult {
  GetExamSchedulesResult: [
    {
      SubjectName: string;
      ExamStartDate: string;
      ExamEndDate: string;
      TestName: null;
      Standard: null;
      Standard_Name: string;
      StartTime: string;
      EndTime: string;
      StartDate: string;
      EndDate: string;
      StartDayDate: string;
      EndDayDate: string;
      TestType: string;
      Instructions: string;
      Description: string;
    }
  ];
}
