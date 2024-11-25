export const getCoCurricularFlag = (listSubjectIdDetails, subId) => {
    // console.log('delta', listSubjectIdDetails, subId)

    // Find the subject with the matching Subject_Id
    const subject = listSubjectIdDetails.find(
        (item) => item.Subject_Id[0] === subId
    );
    return subject ? subject.Is_CoCurricularActivity : null;
};

export function DataParserAndFormatter(toConvert) {
    // Initialize the desired format structure
    const desiredArray = {
        // ListDisplayNameDetails: displayNamesList ?? [],  // Not present in input, leaving empty
        // #region Array Start
        listGreaceDetails: [{
            "GraceMark": "0"
        }],
        listMarksDetails: (toConvert.Result ?? [])?.map(grade => ({
            Grade_Name: grade?.Grade_Name,
            Grade_id: grade?.Grade_id?.toString(),
            Percentage: grade?.Percentage?.toString(),
            Result: grade?.Result,
            Subjects_Total_Marks: grade?.Subjects_Total_Marks?.toString(),
            Total_Marks_Scored: grade?.Total_Marks_Scored?.toString(),
            rank: grade?.rank?.toString(),
            // IsForCoCurricularSubjects: grade?.IsForCoCurricularSubjects === 0 ? "False" : "True"
        })),
        listParcentageDetails: (toConvert.grades ?? [])?.map(result => ({
            Grade: result?.Grade_Name,
            Marks_Grades_Configuration_Detail_ID: result?.Marks_Grades_Configuration_Detail_ID?.toString(),
            Remarks: result?.Remarks,
        })),
        listParentsubjectDetails: [],
        listStudentDetail: (toConvert.Header ?? [])?.map(result => ({
            Academic_Year: result?.Academic_Year,
            Division_Name: result?.Division_Name,
            IsFailCriteriaNotApplicable: result?.IsFailCriteriaNotApplicable,
            IsPreprimaryStandard: result?.IsPreprimaryStandard === 0 ? "False" : "True",
            Roll_No: result?.Roll_No?.toString(),
            School_Name: result?.School_Name,
            ShowOnlyGrades: result?.ShowOnlyGrades.toString(),
            Standard_Division_Id: result?.Standard_Division_Id?.toString(),
            Standard_Id: result?.Standard_Id?.toString(),
            Standard_Name: result?.Standard_Name?.toString(),
            Student_Name: result?.Student_Name,
            YearWise_Student_Id: result?.YearWise_Student_Id?.toString(),
        })),
        listSubjectDetails: (toConvert.Subjects ?? [])?.map(result => ({
            ID_Num: result?.ID_Num?.toString(),
            Parent_Subject_Id: result?.Parent_Subject_Id?.toString(),
            Subject_Id: result?.Subject_Id?.toString(),
            Subject_Name: result?.Subject_Name,
            Total_Consideration: result?.Total_Consideration,
        })),
        //  #region Array End
    };

    return desiredArray;
}