export interface IClassTeacherListBody {
  asSchoolId: number;
  asAcademicYearId: number;
}
export interface IClassTeacherListRsult {
  Teacher_Id: string;
  StdDivId: string;
  TeacherName: string;
  Original_Standard_Id: string;
  Original_Division_Id: string;
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
  asAcadmicYearId: number,
  asStdDivId: number
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
  asAcadmicYearId: number,
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