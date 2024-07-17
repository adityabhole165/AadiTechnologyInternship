
export interface IGetAllPrimaryClassTeachersBody {
    asSchoolId: Number,
    asAcadmicYearId: Number,
    asTeacher_id: Number
};
export interface IGetAllPrimaryClassTeachersResult {
    TeacherName: string,
    Teacher_Id: string,
    Designation_Id: string,
    Teacher_First_Name: string,
    Standard_Name: string,
    Division_Name: string,
    Original_Standard_Id: string,
    Original_Division_Id: string,
    SchoolWise_Standard_Division_Id: string,
    Is_PrePrimary: string
};

export interface IGetAssessmentDropdownBody {
    asAcademicYearId: Number,
    asSchoolId: Number,
};

export interface IGetAssessmentDropdownResult {
    AssessmentId: string,
    Name: string
};


export interface IGetPagedStudentsForMarkAssignmentBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asStandardDivId: Number,
    asAssessmentId: Number,
    asStartIndex: Number,
    asEndIndex: Number,
    asSortExp: string
};

export interface IGetPagedStudentsForMarkAssignmentResult {
    GetPagedStudentsForMarkAssignmentList: [
        {
            RollNo: string,
            StudentName: string,
            YearwiseStudentId: string,
            ProgresSheetID: string,
            Standard_Division_Id: string,
            StandardId: string,
            ProgressReportType: string,
            ShowProgressReport: string,
            RowNo: string,
            EditStatus: string,
            ShowDeleteButton: string
        }
    ],
    GetAllStudentRecordCount:
    [{
        Count: string
    }],
};

export interface IoneDeleteStudentTestMarksBody {
    asAcademicYearId: Number,
    asSchoolId: Number,
    asAssessmentId: Number,
    asStudentId: Number,
    asUpdatedById: Number
};
export interface IoneDeleteStudentTestMarksResult {
    string
};


export interface IDeleteAllStudentTestMarksBody {
    asSchoolId: Number,
    asAcademicYearId: Number,
    asAssessmentId: Number,
    asStandardDivId: Number,
    asUpdatedById: Number


};

export interface IDeleteAllStudentTestMarksResult {
    string

};


export interface IGetPublishStatusBody {
    asAcademicYearId: Number,
    asSchoolId: Number,
    asStandardDivId: Number,
    asAssessmentId: Number,
};

export interface IGetPublishStatusResult {
    AllowPublish: boolean,
    AllowUnpublish: boolean
}
;
export interface IPublishUnpublishXseedResultBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardDivisionId: number
    asAssessmentId: number
    asMode: string
    asInsertedById: number

}
;
export interface IPublishUnpublishXseedResultResult {
    asAcadmicYearId: Number,
    asSchoolId: Number,
    asStandardDivId: Number,
    asAssessmentId: Number,
    asMode: string,
    asInsertedById: Number
};
