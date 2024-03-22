export interface IAssignClassBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aTeacherId: number;
}

export interface IAssignClassResult {
  Standard_Division_Id: string;
  StandardDivision: string;
}

//ClasswiseExamDropdown
export interface IClasswiseExamDropdownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardDivisionId: number;
}

export interface IClasswiseExamDropdownResult {
  School_Id: string;
  original_schoolwise_test_id: string;
  schoolwise_test_id: string;
  schoolwise_test_name: string;
  IsFinalExam: string;
}

//SubjectList
export interface ISubjectsExamMarksStatusForClassBody {
  asSchoolId: number;
  asAcademicYearId: number;
  aTeacherId: number;
  asExamId: number;

  asStandardDivisionId: number;
}

export interface ISubjectsExamMarksStatusForClassBodyResult {
  StandardDivision: string;
  Standard_Division_Id: string;
  Standard_Id: string;
  Division_Id: string;
  Subject_Id: string;
  Subject_Name: String;
  Is_Submitted: string;
  STATUS: string;
  IncompleteRollNos: string;
  Is_MonthConfig: boolean;
  AllowPartialSubmit: string;
  IsXseedSubject: string;
  StatusDescription: string;
}

export interface ISubmitTestMarksToClassTeacherBody {
  asStandardDivisionId: string;
  asSubjectId: string;
  asTestId: string;
  asSchoolId: string;
  asAcademicYearId: string;
  asIsSubmitted: string;
}
