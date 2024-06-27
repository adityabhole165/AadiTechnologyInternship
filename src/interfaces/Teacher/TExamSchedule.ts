export default interface IGetAllStandards {
  asSchoolId: string;
  asAcademicYearId: string;
}

export interface GetStandardListResult {
  GetAllStandardsResult: [
    {
      Id: string;
      Name: string;
    }
  ];
}


export interface IGetExamsList {
  asAcademicYearId: string;
  asSchoolId: string;
  asStandardId: any;
}

export interface GetExamsListResult {
  GetExamDropDownForExamScheduleDetailsList: [
    {
        SchoolWise_Test_Name: string,
        SchoolWise_Test_Id: string,
        Exam_Start_Date: string,
        Exam_End_Date: string,
        IsCollapsed: string,
        Instructions: string,
        StandardId: string
    }
  ],
  ExamScheduleList: [
    {
      SchoolWise_Test_Id:string;
      SubjectName: string;
      ExamStartDate: string;
      ExamEndDate: string;
      Total_Exam_Days:string;
      Instructions: string;
      Standard: null;
      Standard_Id:string;
      Standard_Name: string;
      TestName: null;
      TestType: string;
      SchoolWise_Test_Name:string;
      Description: string;
      StartTime: string;
      EndTime: string;
      StartDate: string;
      EndDate: string;
      StartDayDate: string;
      EndDayDate: string;
     Subject: string,
       Exam: string,
      StartDateAndTime: string,
      EndDateAndTime: string
    }
  ];
}
