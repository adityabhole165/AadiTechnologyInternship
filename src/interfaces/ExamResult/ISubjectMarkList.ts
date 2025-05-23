export interface IGetTestMarkBody {
    asSchoolId: number,
    asStandardDivision_Id: number,
    asSubject_Id: number,
    asTestId: number,
    asAcademicYearID: number,
    asShowTotalAsPerOutOfMarks: string
}
export interface IGetTestMarkResult {
    listTestTypeName: [
        {
        TestType_Id: string;
        TestType_Name: string;
        Grade_Or_Marks: string;
        TestType_Total_Marks: string;
        TestType_Passing_Marks: string;
        Passing_Grade_Id: string;
        TestOutOfMarks: string;
        TestTypeOutOfMarks: string;
        TotalMarks: string;
        ConsiderExamStatus: string;
    }
    ];
    listSchoolWise_Student_Test_Marks_Detail: [
        {
        SchoolWise_Student_Test_Marks_Detail_Id: string;
        Marks_Scored: string;
        Assigned_Grade_Id: string;
        TestType_Id: string;
        Subject_Id: string;
        School_Id: string;
        Student_Id: string;
        Roll_No: string;
        Academic_Year_ID: string;
        Standard_Division_Id: string;
        SchoolWise_Test_Id: string;
        Passing_Total_Marks: string;
        Passing_Grade_Id: string;
        Total_Marks_Scored: string;
        Subject_Total_Marks: string;
        Grade_Or_Marks: string;
        Is_Absent: string;
        Test_Date: string;
        TestType_Total_Marks: string;
        TestType_Name: string;
        Is_Applicable: string;
        IsSavedForSingleStudent: string;
        Joining_Date: string;
    }
];
    listDisplaysName: [
        {
        DisplayName: string;
        ShortName: string;
        ForeColor: string;
        BackColor: string;
        DisplayValue: string;
        ExamStatusId: string;
    }
];
}
export interface GetStudentsForSubjectMarkMouseOverBody {
    asSchoolId:number,
    asAcademicYearId:number,
    asStandardDivId:number,
    asNoOfRecord:number,
    asTestId:number,
    asSubjectId:number

}
export interface GetStudentsForSubjectMarkMouseOverResult {
            ID_Num: string,
            Name: string,
            Roll_No: string,
            SchoolWise_Standard_Division_Id: string,
            School_Id: string,
            Standard_Id: string,
            Division_id: string,
            Student_Id: string,
            Enrolment_Number: string,
            Admission_Date: string,
            First_Name: string,
            Middle_Name: string,
            Last_Name: string,
            SchoolWise_Student_Id: string,
            Standard_Division_Name:string
        

}
export interface GetFirstThreeToopersBody {
    asAcademicYearID:number,
    asSchoolId:number,
    asStandardDivision_Id:number,
    asSubject_Id:number,
    asTestId:number
}
export interface GetFirstThreeToopersResult {
    listGetFirstTooper: [
        {
            Student_id: string
        }
    ];
    listGetSecondTooper:[
        {
            Student_id:string
        }
    ];
    listGetThirdTooper:[
        {
            Student_id: string
        }
    ]
}

