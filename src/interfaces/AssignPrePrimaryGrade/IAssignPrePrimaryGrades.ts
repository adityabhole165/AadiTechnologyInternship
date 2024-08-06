export interface IGetTestwiseTermBody {
  asAcademicYearId: Number;
  asSchoolId: Number;
}

export interface IGetTestwiseTermResult {
  AssessmentId: string;
  Name: string;
}

export interface IGetTeacherDropdownBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
}

export interface IGetTeacherDropdownResult {

  Teacher_Id: number;
  TeacherName: string;
  Designation_Id: Number;
  Teacher_First_Name: string;
  DesignationSortOrder: string;
  Teacher_Middle_Name: string;
  Teacher_Last_Name: string
}


export interface IGetClassTeachersBody {
  asSchoolId: Number;
  asAcademicYearId: Number;
}

export interface IGetClassTeachersResult {
  listGradesDetails: [
    {
      GradeId?: number;
      GradeName?: string;
      ShortName?: string;
      ConsideredAsAbsent?: number;
      ConsideredAsExempted?: number;
      SortOrder?: number;
    }
  ],
  GradeId: number;
  GradeName: string;
  Teacher_Id: string;
  TeacherName: string;
  Designation_Id: string;
  Teacher_First_Name: string;
  DesignationSortOrder: string;
  Teacher_Middle_Name: string;
  Teacher_Last_Name: string;
}

export interface IGetGradeListBody {
  listGradesDetails: [
    {
      GradeId: number;
      GradeName: string;
      ShortName: string;
      ConsideredAsAbsent: number;
      ConsideredAsExempted: number;
      SortOrder: number;
    }
  ]
}

export interface IGetStudentsForStdDevMastersBody {
  listGradesDetails: [
    {
      GradeId: number;
      GradeName: string;
      ShortName: string;
      ConsideredAsAbsent: number;
      ConsideredAsExempted: number;
      SortOrder: number;
    }
  ],
  listYearwiseStudentDetails: [
    {
      StudentName: string,
      YearWise_Student_Id: number,
      SchoolWise_Standard_Division_Id: number,
      AssessmentId: number,
      SchoolLeft_Date: string,
      StartDate: string
    }
  ],
  ClassAndSubjectDetails: any,
  AssessmentSectionDetails: any,
  SubjectSectionDetails: any
}

export interface IGetTeacherXseedSubjectsBody {
  asSchoolId: Number;
  asAcademicYear_ID: Number;
  asTeacherId: Number;
  asAssessmentId: Number;
}

export interface IGetTeacherXseedSubjectsResult {
  StandardDivision: string;
  StandardDivisionID: string;
  SubjectId: string;
  Subject_Name: string;
  Original_Subject_Id: string;
  EditStatus: string;
  SubmitStatus: string;
  IsXseedSubject: string;
  IncompleteRollNoString: string;
}

export interface ISubmitExamMarksStatusBody {
  asStandard_Division_Id: Number;
  asAssessmentId: Number;
  asSubjectId: Number;
  asAcademicYearId: Number;
  asSchoolId: Number;
  asInserted_By_id: Number;
  asInsertDate: string;
}

export interface IGetStudentsForStdDevMasters {
  asSchoolId: Number,
  asAcademicYearId: Number,
  asStandardDivisionId: Number,
  asAssessmentId: Number,
  asSubjectId: Number
}

export interface IGetGetStudentsForNonXseedSubjectsBody {
  Roll_No: number,
  StudentName: string,
  YearwiseStudentId: number,
  Observation: string,
  GradeId: number
}

export interface IGetGetStudentsForNonXseedSubjects {
  asSchoolId: Number,
  asAcademicYearId: Number,
  asStandardDivisionId: Number,
  asAssessmentId: Number,
  asSubjectId: Number
}

export interface ISaveNonXseedSubGrades {
  asXseedGradesXML: string,
  asSchoolId: Number,
  asAcademicYearId: Number,
  asAssessmentId: Number,
  asStandardDivId: Number,
  asSubjectId: Number,
  asInsertedById: Number,
  asUpdatedById: Number
}

export interface IGetNonXseedStudentsObs {
  Roll_No: Number,
  StudentName: string,
  YearwiseStudentId: Number,
  Observation: string,
  GradeId: Number
}

export interface IGetSubmitUnsubmitExamMarksStatusBody {
  asStandard_Division_Id: Number,
  asAssessmentId: Number,
  asSubjectId: Number,
  IsSubmitted: boolean,
  asAcademicYearId: Number,
  asSchoolId: Number,
  asInserted_By_id: Number
}

export interface IGetXseedStudentsInfoBody {
  asSchoolId: Number,
  asAcademicYearId: Number,
  asStandardDivisionId: Number,
  asAssessmentId: Number,
  asSubjectId: Number
}

export interface IGetXseedStudentsInfoResult {
  listYearwiseStudentDetails: [
    {
      StudentName: string,
      YearWise_Student_Id: Number,
      SchoolWise_Standard_Division_Id: Number,
      AssessmentId: Number,
      SchoolLeft_Date: string,
      StartDate: string
    }
  ],
  SubjectSectionDetails: [
    {
      SubjectSectionConfigurationId: Number,
      SubjectSectionName: string
    }
  ],
  AssessmentSectionDetails: {
    AssessmentId: Number,
    Name: string
  },
  ClassAndSubjectDetails: {
    ClassName: string,
    Subject_Name: string
  },
  listGradesDetails: [
    {
      GradeId: Number,
      GradeName: string,
      ShortName: string,
      ConsideredAsAbsent: Number,
      ConsideredAsExempted: Number,
      SortOrder: Number
    }
  ]
}