export interface IClassTeacherListBody {
  asSchoolId: number;
  asAcademicYearId: number,
  asTeacherId;
}
export interface IClassTeacherListRsult {

  TeacherName: string;
  Teacher_Id: string;
  Designation_Id: string,
  Teacher_First_Name: string,
  Standard_Name: string,
  Standard_Id: string,
  Division_Name: string,
  Original_Standard_Id: string,
  Original_Division_Id: string,
  SchoolWise_Standard_Division_Id: string
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
  RowID: number;
  TotalRows: number;
  Name: string;
  StudentName: string;
  Roll_No: number;
  SchoolWise_Standard_Division_Id: number;
  School_Id: number;
  Academic_Year_ID: number;
  Standard_Id: number;
  Division_id: number;
  Student_Id: number;
  Expr1: number;
  Enrolment_Number: number;
  Admission_Date: string;
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  Mother_Name: string;
  DOB: string;
  Sex: string;
  Parent_Name: string;
  Parent_Occupation: number;
  Address: string;
  City: string;
  Pincode: string;
  State: string;
  Residence_Phone_Number: string;
  Mobile_Number: string;
  Category_Id: number;
  CasteAndSubCaste: string;
  User_Id: number;
  SchoolWise_Student_Id: number;
  Is_Deleted: string;
  Result: string;
  Is_ResultGenrated: string;
  Total_Marks_Scored: number;
  Total_Marks: number;
  Marks: string;
  Percentage: string;
  Grade_Name: string;
  Status: string;
}

export interface IPublishBody {
  asSchoolId: number,
  asAcademicYrId: number,
  asStandardDivision_Id: number,
  asInsertedById: number
  // asPublishById: number
}

export interface IPublishResult {
  string
}

export interface IUnpublishBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStandardDivId: number,
  asUnPublishReason: string
}

export interface IUnpublishResult {
  string
}

export interface IGenerateAllBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStdDivId: number,
  asUserId: number,
  asUseAvarageFinalResult: string
}

export interface IGenerateAllResult {
  string
}

export interface IGenerateBody {
  asSchoolId: number,
  asAcadmeicYearId: number,
  asStudentId: number,
  asUserId: number
}

export interface IGenerateResult {
  listStudentsDetails: [],
  listSubjectsDetails: [],
  listTestDetails: [],
  listSubjectIdDetails: [],
  ListSchoolWiseTestNameDetail: [],
  listTestidDetails: [],
  Listtestid2Details: [],
  ListSubjectidDetails: [],
  ListTestTypeIdDetails: [],
  ListMarkssDetails: [],
  ListDisplayNameDetails: []
}



export interface IViewBody {
  asSchoolId: number,
  asAcademicYearId: number,
  asStudentId: number,
  asInsertedById: number,
  asWithGrace: number
}

export interface IViewResult {
  listStudentDetail: [
    YearWise_Student_Id: string,
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
  ],
  listSubjectDetails: [],
  listMarksDetails: [],
  listParentsubjectDetails: [],
  listParcentageDetails: [],
  listGreaceDetails: []
}

export interface IConfiguredTestPublishedBody {
  asSchoolId: number,
  asAcademicYrId: number,
  asStdDivId: number

}

export interface IConfiguredTestPublishedResult {
  IsConfiged: string
}

export interface isResultPublishedBody {
  asSchoolId: number,
  asAcadmicYearId: number,
  asStdDivId: number
}                                                       // generate all

export interface isResultPublishedResult {
  boolean
}

export interface isAtleastOneResultGeneratedBody {
  asSchoolId: number,
  asAcadmicYearId: number,
  asStdDivId: number
  asStandardId: number                                   // View result all 
}

export interface isAtleastOneResultGeneratedResult {

  AllowPublish: boolean,
  TotalAbsentStudents: number

}

export interface isTestPublishedBody {
  asSchoolId: number,
  asAcadmicYearId: number,
  asStdDivId: number
}

export interface isTestPublishedResult {
  boolean
}

export interface IconfiguredExamBody {
  asSchoolId: number,
  asAcademicYrId: number,
  asStdDivId: number
}


export interface IconfiguredExamResult {
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


