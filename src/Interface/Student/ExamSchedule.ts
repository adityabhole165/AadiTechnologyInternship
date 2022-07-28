export default interface ISelectExam{
    asAcademicYearId :string,
    asSchoolId :string,
    asStandardId :string,
}

export default interface IAllStd{
    asAcademicYearId :string,
    asSchoolId :string,
  
}

export interface GetSelectExamListResult{

    Id:     string;
    Name:   string;
}

export interface IExamList{

    asSchoolId  : string;
    asAcademicYearId:   string;
    asStandardId:   any;
    asExamId:   any;

}

export interface GetExamsListResult{
    SubjectName: string,
    ExamStartDate: string,
    ExamEndDate: string,
    TestName: null,
    Standard: null,
    StartTime:string,
    EndTime:string,
    StartDate: string,
    EndDate: string,
    TestType: string,
    Instructions: string,
    Description: string
}


