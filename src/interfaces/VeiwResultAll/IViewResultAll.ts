
export interface IClassTeacherBody {
  asSchoolId: number;
  asAcademicYearId: number;

}

export interface IClassTeacherResult {
  Teacher_Id: string;
  StdDivId: string;
  TeacherName: string;
  Original_Standard_Id: string;
  Original_Division_Id: string;
}

export interface IGetStudentNameListBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStandardDivisionId: number,
}
export interface IGetStudentNameListResult {
  RollNo: string;
  StudentName: string;
  Student_Id: string;
}

export interface IGetsingleStudentBody {

  // asSchoolId: number,
  // asAcademicYearId: number,
  // asStudentId: number,
  // asInsertedById: number,
  // asWithGrace: number,



  asSchoolId: number,
  asAcademicYearId: number,
  asStudentId: number,
  asInsertedById: number,
  asWithGrace: number


}

export interface IGetsingleStudentresult {
  listStudentDetail: [
    {
      YearWise_Student_Id: string,
      Student_Name: string,
      Standard_Name: string,
      Division_Name: string,
      Academic_Year: string,
      Standard_Division_Id: string,
      Roll_No: string,
      Standard_Id: string,
      School_Name: string,
      School_Orgn_Name: string,
      ShowOnlyGrades: string,
      IsFailCriteriaNotApplicable: string,
      IsPreprimaryStandard: string
    }
  ],
  listSubjectDetails: [
    {
      ID_Num: string,
      Subject_Id: string,
      Subject_Name: string,
      Original_Subject_Id: string,
      Parent_Subject_Id: string,
      Marks_Scored: string,
      Grace_Marks: string,
      Subject_MaxGrace: string,
      Standard_MaxGrace: string,
      Grade_Or_Marks: string,
      Subject_Total_Marks: string,
      Passing_Total_Marks: string,
      Percentage: string,
      Grade: string,
      Total_Consideration: string,
      IsAbsent: string,
      IsThirdLanguage: string
    }
  ],
  listMarksDetails: [
    {

      Student_Id: string,
      Total_Marks_Scored: string,
      Subjects_Total_Marks: string,
      Grade_id: string,
      Grade_Name: string,
      Percentage: string,
      Result: string,
      rank: string
    }
  ],
  listParentsubjectDetails: [],
  listParcentageDetails: [
    {
      ID_Num: string,
      Range: string,
      Grade: string,
      Remarks: string,
      Marks_Grades_Configuration_Detail_ID: string,
    }
  ],
  listGreaceDetails: [
    {
      GraceMarkMessage: string
    }
  ]
}

export interface IGetAllStudentTestprogressBody {
  asSchoolId: number;
  asAcademicYrId: number;
  asStdDivId: number;
  asStartIndex: number;
  PageCount: number;
  asTestId: number;
}

export interface IGetAllStudentTestprogressResult {
}

// export interface ISingleClassTeacherBody {
//   asSchoolId: number;
//   asAcademicYearId: number;
//   //asTeacherId: number;
// }

// export interface ISingleClassTeacherResult {
//   TeacherName: string;
//   Teacher_Id: string;
//   Designation_Id: string;
//   Teacher_First_Name: string;
//   Standard_Name: string;
//   Division_Name: string;
//   Original_Standard_Id: string;
//   Original_Division_Id: string;
//   SchoolWise_Standard_Division_Id: string;

// }

export interface IconfiguredExamBody {
  asSchoolId: number,
  asAcademicYrId: number,
  asStdDivId: number
}


export interface IconfiguredExamResult 
{
  IsConfiged: number,

}

export interface IUnpublishedTestexamBody {
  asSchoolId: number,
  asAcademicYrId: number,
  asStdDivId: number,
}


export interface IUnpublishedTestexamResult {

  SchoolWise_Test_Name: string;

}


export interface IGetPagedStudentBody {
  asSchoolId: string;
  asAcademicyearId: string;
  asStandardDivisionId: string;
  SortExp: string;
  prm_StartIndex: number;
  PageSize: number;
}
export interface IGetPagedStudentResult {
  Name: string;
  StudentName: string;
  Roll_No: string;
  SchoolWise_Standard_Division_Id: number;
  School_Id: number;
  Academic_Year_ID: number;
  Standard_Id: number;
  Division_id: number;
  Student_Id: number;
  User_Id: number;
  SchoolWise_Student_Id: number;
  Is_ResultGenrated: boolean;
  
}

