import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProgressReportGradeView from "src/components/ProgressReportNew/ProgressReportGradeView";
import ProgressReportMarkView from "src/components/ProgressReportNew/ProgressReportMarkView";

// Note : data1 is used for representing the isTotalConsiderForProgressReport Setting key flag.

const AllStudents = ({ data1, IStudentList, handleClose, handleClick, open1, formattedText,
    USGetAllMarksGradeConfiguration, USGetAllMarksGradeConfiguration1,
}) => {
    // #region  All useState hooks
    // ---  All useState hooks 
    const [ShowHeader, setShowHeader] = useState([]);
    const [ShowSubHeader, setShowSubHeader] = useState([]);
    const [ShowData, setShowData] = useState([]);
    const [ShowHeader1, setShowHeader1] = useState([]);
    const [ShowSubHeader1, setShowSubHeader1] = useState([]);
    const [ShowData1, setShowData1] = useState([]);
    const [RlistTestDetailsArr, setRlistTestDetailsArr] = useState([]);
    const [RlistTestDetailsArr1, setRlistTestDetailsArr1] = useState([]);
    const [RlistStudentsDetails, setRlistStudentsDetails] = useState([]);
    const [RlistSubjectsDetails, setRlistSubjectsDetails] = useState([]);
    const [RlistTestDetails, setRlistTestDetails] = useState([]);
    const [RlistSubjectIdDetails, setRlistSubjectIdDetails] = useState([]);
    const [RListSchoolWiseTestNameDetail, setRListSchoolWiseTestNameDetail] = useState([]);
    const [RlistTestidDetails, setRlistTestidDetails] = useState([]);
    const [RListSubjectidDetails, setRListSubjectidDetails] = useState([]);
    const [RListTestTypeIdDetails, setRListTestTypeIdDetails] = useState([]);
    const [RListMarkssDetails, setRListMarkssDetails] = useState([]);
    const [RListDisplayNameDetails, setRListDisplayNameDetails] = useState([]);
    const [RThirdHeaderColumn, setRThirdHeaderColumn] = useState([]);
    const [hasTotalConsiderationN, setHasTotalConsiderationN] = useState(false);
    const [showTables, setShowTables] = useState(false);
    // ---
    // #endregion 

    // #region  All useEffect hooks
    useEffect(() => {
        //    &&
        if (Object.keys(IStudentList).length > 0) {
            // data1, IStudentList, handleClose, handleClick, open1, formattedText,
            // USGetAllMarksGradeConfiguration, USGetAllMarksGradeConfiguration1,
            CDAStudentProgressReport();

        }
    }, [IStudentList])
    // ---  All useEffect hooks


    // Request Code isolated here for All student result functionality
    const CDAStudentProgressReport = () => {
        let data = { IsTotalConsiderForProgressReport: data1 }
        const response = { data: IStudentList };
        response.data.listSubjectsDetails
        let flag1 = response.data.listSubjectsDetails.some(subject => subject.Total_Consideration === "N");
        setHasTotalConsiderationN(flag1);

        let listStudentsDetails = response.data.listStudentsDetails.map((item) => {
            return {
                Id: item.YearWise_Student_Id,
                Student_Name: item.Student_Name,
                Roll_No: item.Roll_No,
                Standard_Name: item.Standard_Name,
                Division_Name: item.Division_Name,
                Academic_Year: item.Academic_Year,
                School_Name: item.School_Name,
                School_Orgn_Name: item.School_Orgn_Name,
                Standard_Id: item.Standard_Id,
                Standard_Division_Id: item.Standard_Division_Id,
            };
        });

        let listSubjectsDetails = response.data.listSubjectsDetails;

        const getListDisplayName = (cell) => {
            let returnVal: any = "";

            if (cell.Is_Absent === "N") {
                if (response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true') {
                    returnVal = cell.Grade;
                } else {
                    returnVal = parseFloat(cell.Marks_Scored);
                }
            } else {
                response.data.ListDisplayNameDetails.map((Item) => {
                    if (Item.ShortName === cell.Is_Absent) {
                        returnVal = Item.DisplayName;
                    }
                });
            }
            return returnVal;
        };

        const getListDisplayName1 = (cell) => {
            let returnVal = "";

            if (cell.Is_Absent === "N") {
                returnVal = cell.Grade;
            } else {
                response.data.ListDisplayNameDetails.map((Item) => {
                    if (Item.ShortName === cell.Is_Absent) {
                        returnVal = Item.DisplayName;
                    }
                });
            }
            return returnVal;
        };

        const getMatch = (TestId, SubjectId, TestTypeId) => {
            let returnVal = null;
            response.data.listSubjectIdDetails.map((Item) => {
                if (Item.Original_SchoolWise_Test_Id === TestId && Item.Subject_Id === SubjectId && Item.TestType_Id === TestTypeId) {
                    returnVal = Item;
                }
            });
            return returnVal;
        };

        const getParentHeader = (listSubjectsDetails, Subject, TestId) => {
            let returnVal = "";
            let colsPan = 0;
            if (Subject.Parent_Subject_Id !== '0') {
                colsPan = listSubjectsDetails.filter((obj) => obj.Parent_Subject_Id === Subject.Parent_Subject_Id).length;

                response.data.listTestidDetails
                    .filter((obj) => obj.Test_Id === TestId && obj.Parent_Subject_Id === Subject.Parent_Subject_Id)
                    .map((Item) => {
                        returnVal = Item.Parent_Subject_Name;
                    });
            }
            return { parent: returnVal, colsPan: colsPan };
        };

        function subIdDetailsLength(subId) {
            return response.data.ListSubjectidDetails.filter((item) => item.Subject_Id === subId).length;
        }

        let rows = [];
        let HeaderArray = [];
        let SubHeaderArray = [];
        let Arraytemp = [];

        function findCellValue(list, psId, testTypeId, testId) {
            let filter1 = list.filter((item) => item.Parent_Subject_Id === psId && item.TestType_Id === testTypeId && item.Test_Id === testId);
            if (filter1.length >= 1) {
                return parseFloat(filter1[0].TestType_Total_Marks);
            }
            return '-';
        }

        function findCellValue1(list, psId, testTypeId, testId) {
            let filter1 = list.filter((item) => item.Parent_Subject_Id === psId && item.TestType_Id === testTypeId && item.Test_Id === testId);
            if (filter1.length >= 1) {
                return parseFloat(filter1[0].TestType_Total_Marks_Scored);
            }
            return '-';
        }

        response.data.listTestDetails
            .filter((item) => item.Test_Id !== `-1`)
            .map((Test, TestIndex) => {
                let columns = [];
                let SubjectArray = response.data.listSubjectsDetails;

                response.data.listSubjectsDetails.map((Subject, SubjectIndex) => {
                    let HeaderCount = 0;
                    let arrTemp = response.data.ListSubjectidDetails.filter((obj) => obj.Subject_Id === Subject.Subject_Id);

                    function showTestTypeDetails() {
                        if (subIdDetailsLength(Subject.Subject_Id) === 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                            return false;
                        } else if (subIdDetailsLength(Subject.Subject_Id) === 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                            return true;
                        } else if (subIdDetailsLength(Subject.Subject_Id) > 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                            return true;
                        } else if (subIdDetailsLength(Subject.Subject_Id) > 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                            return true;
                        }
                        return false; // Default return
                    }

                    Arraytemp = arrTemp;
                    let TestTypeCount = arrTemp.length;
                    let temp = "";
                    let totalMarks = null;

                    arrTemp.map((TestType, TestTypeIndex) => {
                        HeaderCount += 1;
                        let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, TestType.TestType_Id);

                        if (showTestTypeDetails()) {
                            if (SubjectArray[SubjectIndex].Parent_Subject_Id === '0') {
                                columns.push({
                                    MarksScored: cell ? `${getListDisplayName(cell)}` : "-",
                                    TotalMarks: cell ? (cell.Is_Absent === "N" ? (response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ? cell.Grade : parseFloat(cell.TestType_Total_Marks)) : "") : "-",
                                    IsAbsent: cell ? cell.Is_Absent : "N",
                                });
                            } else if (SubjectArray[SubjectIndex].Parent_Subject_Id !== '0') {
                                columns.push({
                                    MarksScored: cell ? `${getListDisplayName(cell)}` : "-",
                                    TotalMarks: cell ? (cell.Is_Absent === "N" ? (response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ? cell.Grade : parseFloat(cell.TestType_Total_Marks)) : "") : "-",
                                    IsAbsent: cell ? cell.Is_Absent : "N",
                                });
                            }
                        }


                        if (TestIndex === 0) {
                            SubHeaderArray.push({
                                TestTypeName: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount === 1) ? "Total" : TestType.ShortenTestType_Name,
                            });
                        }

                        if (cell && temp !== (Subject.Subject_Id + "--" + Test.Test_Id)) {
                            temp = Subject.Subject_Id + "--" + Test.Test_Id;

                            const getGradeOrMarks = (cell, isGrade, totalGrade) => {
                                if (!cell) return "-";
                                return isGrade ? `${totalGrade}` : `${parseFloat(cell.Total_Marks_Scored)}`;
                            };


                            const calculateTotalMarks = (data, Subject, cell) => {
                                if (!cell) {
                                    return { MarksScored: " ", TotalMarks: "-", IsAbsent: "N" };
                                }

                                const isConsiderForReport = data.IsTotalConsiderForProgressReport.toLowerCase() === "true";
                                const isSingleSubject = subIdDetailsLength(Subject.Subject_Id) === 1;
                                const isGradeFormat = response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true';

                                const marksScored = isConsiderForReport && isSingleSubject ? (isGradeFormat ? `${cell.TotalGrade}` : `${parseFloat(cell.Total_Marks_Scored)}`) : getGradeOrMarks(cell, isGradeFormat, cell.TotalGrade);
                                const totalMarks = isConsiderForReport && isSingleSubject ? (isGradeFormat ? `${cell.TotalGrade}` : `${parseFloat(cell.Subject_Total_Marks)}`) : (isGradeFormat ? `${cell.TotalGrade}` : cell.Subject_Total_Marks);

                                return { MarksScored: marksScored, TotalMarks: totalMarks, IsAbsent: cell.Is_Absent };
                            };

                            totalMarks = calculateTotalMarks(data, Subject, cell);
                        }


                        if (TestTypeIndex === TestTypeCount - 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                            columns.push(totalMarks);
                        }


                        if (SubjectArray[SubjectIndex].Parent_Subject_Id !== '0' && SubjectArray[SubjectIndex + 1]?.Parent_Subject_Id === '0' && TestTypeIndex === arrTemp.length - 1) {
                            response.data.ListTestTypeIdDetails.map((itemArr) => {
                                columns.push({
                                    MarksScored: findCellValue1(response.data.Listtestid2Details, SubjectArray[SubjectIndex].Parent_Subject_Id, itemArr.TestType_Id, Test.Test_Id),
                                    TotalMarks: findCellValue(response.data.Listtestid2Details, SubjectArray[SubjectIndex].Parent_Subject_Id, itemArr.TestType_Id, Test.Test_Id),
                                    IsAbsent: "N",
                                });
                            });

                            if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                                let isDataPushed = false;
                                response.data.listTestidDetails.map((Item) => {
                                    if (Item.Test_Id === Test.Test_Id && !isDataPushed) {
                                        columns.push({
                                            MarksScored: `${parseFloat(Item.Total_Marks_Scored)}`,
                                            TotalMarks: `${Item.ChildSubject_Marks_Total}`,
                                            IsAbsent: "N",
                                        });
                                        isDataPushed = true;
                                    }
                                });
                            }
                        }

                    });


                    if (TestIndex === 0) {
                        if (HeaderCount > 1) {
                            SubHeaderArray.push({ TestTypeName: "Total" });
                        }
                        HeaderArray.push({
                            SubjectName: Subject.Subject_Name,
                            colSpan: HeaderCount > 1 ? HeaderCount + 1 : HeaderCount,
                            ParentSubjectId: Subject.Parent_Subject_Id,
                            ParentSubjectName: getParentHeader(listSubjectsDetails, Subject, Test.Test_Id).parent,
                        });
                    }


                    if (Subject.Is_CoCurricularActivity === 'True') {
                        let valArr = response.data.listSubjectIdDetails.filter(item => item.Original_SchoolWise_Test_Id === Test.Original_SchoolWise_Test_Id && item.Is_CoCurricularActivity.toLowerCase() === 'true' && item.Subject_Id === Subject.Subject_Id);

                        function showGradeHeader(subId) {
                            let filter = response?.data?.ListSubjectidDetails?.filter((item) => item.Subject_Id === subId);
                            return !(filter?.length > 0);
                        }

                        if ((response.data?.listStudentsDetails[0]?.ShowOnlyGrades.trim() === 'true' || !response.data?.listStudentsDetails[0]?.ShowOnlyGrades) && showGradeHeader(Subject.Subject_Id)) {
                            columns.push({
                                MarksScored: valArr.length > 0 ? `${valArr[0].Marks}` : '-',
                                TotalMarks: "-",
                                IsAbsent: "N",
                            });
                        }
                    }


                });

                const matchingTestId = response.data.Listtestid2Details.find(testDetail => testDetail.Test_Id)?.Test_Id;

                const matchingTest = response.data.listTestDetails.find(item => Number(item.Test_Id) === Number(matchingTestId));
                const matchingTestType_Id = response.data.Listtestid2Details.find(testDetail => testDetail.TestType_Id)?.TestType_Id;
                const matchingTestType = response.data.ListTestTypeIdDetails.find(item => Number(item.TestType_Id) === Number(matchingTestType_Id));


                if (matchingTest && matchingTestType) {
                    SubHeaderArray.push({ TestTypeName: matchingTestType.ShortenTestType_Name });
                }


                if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                    response.data.ListSchoolWiseTestNameDetail.map((Item) => {
                        if (Item.SchoolWise_Test_Id === Test.Test_Id) {
                            const matchingMarksDetails = response.data.ListMarkssDetails.find((marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id);

                            if (response.data?.listStudentsDetails[0]?.ShowOnlyGrades.trim() !== 'true') {
                                columns.push({
                                    MarksScored: Item.FailCount !== '' ? `${parseFloat(Item.Total_Marks_Scored)}` : '',
                                    TotalMarks: Item.Subjects_Total_Marks,
                                    IsAbsent: "N",
                                });

                                columns.push({
                                    MarksScored: Item.FailCount !== '' ? `${parseFloat(Item.Percentage).toFixed(2)}%` : '-',
                                    TotalMarks: "-",
                                    IsAbsent: "N",
                                });
                            }

                            columns.push({
                                MarksScored: Item.FailCount !== '' ? `${Item.Grade_Name} [${matchingMarksDetails?.Remarks}]` : '-',
                                TotalMarks: "-",
                                IsAbsent: "N",
                            });
                        }
                    });
                }


                rows.push({
                    TestName: Test.Test_Name,
                    MarksArr: columns,
                });
            });


        if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
            SubHeaderArray.push({ TestTypeName: "Total" });
            SubHeaderArray.push({ TestTypeName: "Total" });
            SubHeaderArray.push({ TestTypeName: "%" });
            SubHeaderArray.push({ TestTypeName: "Grade" });
        }



        let rows1 = [];
        let HeaderArray1 = [];
        let SubHeaderArray1 = [];

        response.data.listTestDetails
            .filter((item) => Number(item.Test_Id) !== -1)
            .map((Test, TestIndex) => {
                let columns = [];
                response.data.listSubjectsDetails.map((Subject) => {
                    let HeaderCount1 = 0;
                    let arrTemp = response.data.ListSubjectidDetails.filter((obj) => obj.Subject_Id === Subject.Subject_Id);

                    let TestTypeCount = arrTemp.length;
                    let temp = "";
                    let totalMarks = null;

                    arrTemp.map((TestType, TestTypeIndex) => {
                        HeaderCount1 += 1;
                        let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, TestType.TestType_Id);

                        if (TestTypeCount !== 1) {
                            columns.push({
                                MarksScored: cell ? `${getListDisplayName1(cell)}` : "-",
                                TotalMarks: cell ? (cell.Is_Absent === "N" ? parseFloat(cell.TotalGrade) : "") : "-",
                                IsAbsent: cell ? cell.Is_Absent : "N",
                            });
                        }

                        if (TestIndex === 0) {
                            SubHeaderArray1.push({
                                TestTypeName: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount === 1) ? "Total" : TestType.ShortenTestType_Name,
                            });
                        }

                        if (cell && temp !== (Subject.Subject_Id + "--" + Test.Test_Id)) {
                            temp = Subject.Subject_Id + "--" + Test.Test_Id;
                            totalMarks = {
                                MarksScored: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount === 1) ? `${cell.Grade}` : `${cell.TotalGrade}`,
                                TotalMarks: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount === 1) ? cell.Grade : "-",
                                IsAbsent: cell ? cell.Is_Absent : "N",
                            };
                        }


                        if (TestTypeCount === 1) {
                            columns.push(totalMarks);
                        }

                    });

                    let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, '');

                    function showGradeHeader(subId) {
                        let filter = response.data?.ListSubjectidDetails?.filter((item) => item.Subject_Id === subId);
                        return !(filter?.length > 0);
                    }


                    if (showGradeHeader(Subject.Subject_Id)) {
                        columns.push({
                            MarksScored: cell ? `${getListDisplayName1(cell)}` : "-",
                            TotalMarks: cell ? (cell.Is_Absent === "N" ? parseFloat(cell.TotalGrade) : "") : "-",
                            IsAbsent: cell ? cell.Is_Absent : "N",
                        });
                    }


                    if (TestIndex === 0) {
                        if (HeaderCount1 > 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                            columns.push(totalMarks);
                            SubHeaderArray1.push({ TestTypeName: "Total" });
                        }

                        HeaderArray1.push({
                            SubjectName: Subject.Subject_Name,
                            colSpan: HeaderCount1 > 1 ? HeaderCount1 + (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" ? 1 : 0) : HeaderCount1,
                            ParentSubjectId: Subject.Parent_Subject_Id,
                            ParentSubjectName: getParentHeader(listSubjectsDetails, Subject, Test.Test_Id).parent,
                            Is_CoCurricularActivity: Subject.Is_CoCurricularActivity,
                        });
                    }

                });


                if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                    response.data.ListSchoolWiseTestNameDetail.map((Item) => {
                        if (Item.SchoolWise_Test_Id === Test.Test_Id) {
                            const matchingMarksDetails = response.data.ListMarkssDetails.find((marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id);
                            columns.push({
                                MarksScored: `${Item.Grade_Name} [${matchingMarksDetails?.Remarks}]`,
                                TotalMarks: "-",
                                IsAbsent: "N",
                            });
                        }
                    });
                }

                rows1.push({
                    TestName: Test.Test_Name,
                    MarksArr: columns,
                });
            });


        let listTestDetailsArr = [];

        response.data.listTestDetails
            .filter((item) => Number(item.Test_Id) !== -1)
            .map((Tests) => {
                let arr = [];
                response.data.listSubjectsDetails.map((Subjects) => {
                    let temp = response.data.listSubjectIdDetails.filter((item) => item.Subject_Id === Subjects.Subject_Id && item.Original_SchoolWise_Test_Id === Tests.Original_SchoolWise_Test_Id);
                    arr.push({
                        SchoolWise_Test_Name: temp.length > 0 ? temp[0].SchoolWise_Test_Name : "-",
                        Grade: temp.length > 0 ? temp[0].Grade : "-",
                    });
                });


                if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                    let tempGrade = response.data.ListSchoolWiseTestNameDetail.filter((item) => item.SchoolWise_Test_Id === Tests.Test_Id);
                    arr.push({
                        SchoolWise_Test_Name: "-",
                        Grade: tempGrade.length > 0 ? tempGrade[0].Grade_Name : "-",
                    });
                }


                listTestDetailsArr.push({
                    Test_Id: Tests.Test_Id,
                    Test_Name: Tests.Test_Name,
                    subjectIdArr: arr,
                });
            });

        let listTestDetailsArr1 = [];


        let listSubjectIdDetails = response.data.listSubjectIdDetails.map((item) => ({
            Marks_Scored: item.Marks_Scored,
            Grade: item.Grade,
        }));

        let ThirdHeaderColumn = response.data.ListSubjectidDetails;

        let ListSchoolWiseTestNameDetail = response.data.ListSchoolWiseTestNameDetail.map((item) => ({
            Total: `${parseFloat(item.Total_Marks_Scored)} / ${item.Subjects_Total_Marks}`,
            Percentage: item.Percentage,
            Grade_Name: item.Grade_Name,
            SchoolWise_Test_Id: item.SchoolWise_Test_Id,
            Grade_id: item.Grade_id,
        }));


        let listTestidDetails = response.data.listTestidDetails.map((item) => ({
            Id: item.OutOfMarks,
            Text1: item.Parent_Subject_Name,
        }));

        let ListSubjectidDetails = response.data.ListSubjectidDetails.map((item) => ({
            Subject_Id: item.Subject_Id,
            ShortenTestType_Name: item.ShortenTestType_Name,
        }));


        if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
            ListSubjectidDetails.push({
                Subject_Id: "-1",
                ShortenTestType_Name: "Grade",
            });
        }



        let ListTestTypeIdDetails = response.data.ListTestTypeIdDetails.map((item) => ({
            Id: item.TestType_Name,
            Text1: item.TestTypeSort_Order,
            Text2: item.ShortenTestType_Name,
        }));



        let ListMarkssDetails = response.data.ListMarkssDetails.map((item) => ({
            Text1: '',
            Text2: item.Grade_Name,
            Remarks: item.Remarks,
            IsForCoCurricularSubjects: item.IsForCoCurricularSubjects,
            Marks_Grades_Configuration_Detail_ID: item.Marks_Grades_Configuration_Detail_ID,
        }));


        let ListDisplayNameDetails = response.data.ListDisplayNameDetails.map((item) => ({
            Id: item.DisplayValue,
            Text1: item.DisplayName,
        }));


        let listTestDetails = [];

        // #region update states
        // dispatch(ProgressReportSlice.actions.ShowHeader(HeaderArray));
        setShowHeader(HeaderArray);

        // dispatch(ProgressReportSlice.actions.ShowSubHeader(SubHeaderArray)); SubHeaderArray
        setShowSubHeader(SubHeaderArray);

        // dispatch(ProgressReportSlice.actions.ShowData(rows));
        setShowData(rows);

        // dispatch(ProgressReportSlice.actions.ShowHeader1(HeaderArray1));
        setShowHeader1(HeaderArray1);

        // dispatch(ProgressReportSlice.actions.ShowSubHeader1(SubHeaderArray1));
        setShowSubHeader1(SubHeaderArray1); //SubHeaderArray1

        // dispatch(ProgressReportSlice.actions.ShowData1(rows1));
        setShowData1(rows1);

        // dispatch(ProgressReportSlice.actions.RlistTestDetailsArr(listTestDetailsArr));
        setRlistTestDetailsArr(listTestDetailsArr);

        // dispatch(ProgressReportSlice.actions.RlistTestDetailsArr1(listTestDetailsArr1));
        setRlistTestDetailsArr1(listTestDetailsArr1);

        // dispatch(ProgressReportSlice.actions.RlistStudentsDetails(listStudentsDetails));
        setRlistStudentsDetails(listStudentsDetails);

        // dispatch(ProgressReportSlice.actions.RlistSubjectsDetails(listSubjectsDetails));
        setRlistSubjectsDetails(listSubjectsDetails);

        // dispatch(ProgressReportSlice.actions.RlistTestDetails(listTestDetails));
        setRlistTestDetails(listTestDetails);

        // dispatch(ProgressReportSlice.actions.RlistSubjectIdDetails(listSubjectIdDetails));
        setRlistSubjectIdDetails(listSubjectIdDetails);

        // dispatch(ProgressReportSlice.actions.RListSchoolWiseTestNameDetail(ListSchoolWiseTestNameDetail));
        setRListSchoolWiseTestNameDetail(ListSchoolWiseTestNameDetail);

        // dispatch(ProgressReportSlice.actions.RlistTestidDetails(listTestidDetails));
        setRlistTestidDetails(listTestidDetails);

        // dispatch(ProgressReportSlice.actions.RListSubjectidDetails(ListSubjectidDetails));
        setRListSubjectidDetails(ListSubjectidDetails);

        // dispatch(ProgressReportSlice.actions.RListTestTypeIdDetails(ListTestTypeIdDetails));
        setRListTestTypeIdDetails(ListTestTypeIdDetails);

        // dispatch(ProgressReportSlice.actions.RListMarkssDetails(ListMarkssDetails));
        setRListMarkssDetails(ListMarkssDetails);

        // dispatch(ProgressReportSlice.actions.RListDisplayNameDetails(ListDisplayNameDetails));
        setRListDisplayNameDetails(ListDisplayNameDetails);

        // dispatch(ProgressReportSlice.actions.RThirdHeaderColumn(ThirdHeaderColumn));
        setRThirdHeaderColumn(ThirdHeaderColumn);
        // ---
        setShowTables(true);
        // #endregion

    };

    return (
        <>
            {showTables && IStudentList?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ?
                <>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4">Grade Configuration Details</Typography>
                        </Link>
                        <Dialog
                            open={open1}
                            onClose={handleClose}
                            maxWidth="md" scroll="body"
                            sx={{ minHeight: '400px' }}
                            PaperProps={{
                                sx: {
                                    borderRadius: "15px",
                                }
                            }}>
                            <DialogTitle sx={{ bgcolor: '#223354' }}>

                                <ClearIcon onClick={handleClose}
                                    sx={{
                                        color: 'white',
                                        // background:'white',
                                        borderRadius: '7px',
                                        position: 'absolute',
                                        top: '5px',
                                        right: '8px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: 'red'
                                        }
                                    }} />
                            </DialogTitle>

                            <DialogContent>
                                <Typography variant="h3" my={1}>
                                    Grade Configuration Details
                                </Typography>
                                <Typography variant="h4" my={1}>
                                    Subjects :-
                                </Typography>
                                <GradeConfigurationList
                                    configurationList={USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")}
                                    HeaderArray={ShowHeader}
                                />
                            </DialogContent>
                            <DialogContent>
                                <Typography variant="h4" >
                                    Co-Curricular Subjects :-
                                </Typography>
                                <GradeConfigurationList
                                    configurationList={USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")}
                                    HeaderArray={ShowHeader}
                                />
                            </DialogContent>
                        </Dialog>
                    </Box> */}
                    <br></br>
                    <Box sx={{ mt: 1, background: 'white' }}>
                        <hr />
                        {RlistStudentsDetails.map((subject, index) => (
                            <div key={index}>
                                <Typography variant="h4" textAlign="center" color="primary" mb={1}>
                                    {subject.School_Orgn_Name}
                                </Typography>
                                <hr />
                                <Typography variant="h3" textAlign="center" color="black" mb={1}>
                                    {subject.School_Name}
                                </Typography>
                                <hr />
                                <Typography variant="h4" textAlign="center" color="black" mb={1}>
                                    Progress Report
                                </Typography>
                            </div>
                        ))}
                        <Table>
                            <TableBody>
                                {RlistStudentsDetails.map((item, key1) => {
                                    return (
                                        <TableRow key={key1} sx={{ bgcolor: '#38548A' }}>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No: </b>{item.Roll_No} </TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name: </b> {item.Student_Name}	</TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class: </b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year: </b> {item.Academic_Year}	</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                    {hasTotalConsiderationN && (
                        <Typography
                            sx={{ bgcolor: 'white', p: 2 }}
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                    )}
                    <Box sx={{ overflowX: 'auto' }}>
                        <ProgressReportGradeView
                            EntireDataList={IStudentList}
                            IsTotalConsiderForProgressReport={data1}
                            HeaderArray1={ShowHeader1}
                            SubHeaderArray1={ShowSubHeader1}
                            MarkDetailsList1={data1.toLowerCase() === 'true' ? ShowData : ShowData1}
                        />
                    </Box>
                </>
                :
                <>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

                        <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4">Grade Configuration Details</Typography>
                        </Link>
                        <Dialog
                            open={open1}
                            onClose={handleClose}
                            maxWidth="md"
                            scroll="body"
                            PaperProps={{
                                sx: {
                                    borderRadius: "15px",
                                }
                            }}
                        >
                            <Box sx={{ backgroundColor: "#223354" }}>
                                <DialogTitle
                                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <ClearIcon onClick={handleClose}
                                        sx={{
                                            color: 'white',
                                            // background:'white',
                                            borderRadius: '7px',
                                            position: 'absolute',
                                            top: '5px',
                                            right: '8px',
                                            cursor: 'pointer',
                                            '   &:hover': {
                                                color: 'red',
                                                //  backgroundColor: red[100]
                                            }
                                        }} />
                                </DialogTitle>
                            </Box>
                            <DialogContent>
                                <Typography variant="h3">Grade Configuration Details</Typography>
                                <Typography variant="h4" my={1}>
                                    Subjects :-
                                </Typography>
                                <GradeConfigurationList
                                    configurationList={USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")}
                                    HeaderArray={ShowHeader}
                                />
                            </DialogContent>
                            <DialogContent>
                                <Typography variant="h4" my={1}>
                                    Co-Curricular Subjects :-
                                </Typography>
                                <GradeConfigurationList
                                    configurationList={USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")}
                                    HeaderArray={ShowHeader}
                                />
                            </DialogContent>
                        </Dialog>
                    </Box> */}

                    <br></br>

                    <Box sx={{ mt: 1, background: 'white', }}>
                        <hr />
                        {RlistStudentsDetails.map((subject, index) => (
                            <div key={index}>
                                <Typography variant="h4" textAlign="center" color="primary" mb={1}>
                                    {subject.School_Orgn_Name}
                                </Typography>
                                <hr />
                                <Typography variant="h3" textAlign="center" color="black" mb={1}>
                                    {subject.School_Name}
                                </Typography>
                                <hr />
                                <Typography variant="h4" textAlign="center" color="black" mb={1}>
                                    Progress Report
                                </Typography>
                            </div>
                        ))}
                        <Table >
                            <TableBody>
                                {RlistStudentsDetails.map((item) => {
                                    return (
                                        <TableRow sx={{ bgcolor: '#38548A' }}>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No: </b>{item.Roll_No} </TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name: </b> {item.Student_Name}	</TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class: </b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year: </b> {item.Academic_Year}	</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                    {hasTotalConsiderationN && (
                        <Typography
                            sx={{ bgcolor: 'white', p: 2 }}
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                    )}
                    <Box sx={{ overflowX: 'auto' }}>
                        <ProgressReportMarkView
                            HeaderArray={ShowHeader}
                            SubHeaderArray={ShowSubHeader}
                            MarkDetailsList={ShowData}
                            ListDisplayNameDetails={RListDisplayNameDetails}
                            IsTotalConsiderForProgressReport={data1}
                            USListSchoolWiseTestNameDetail={RListSchoolWiseTestNameDetail}
                            USListMarkssDetails={RListMarkssDetails}
                            ListTestTypeIdDetails={RListTestTypeIdDetails}
                            ThirdHeaderRow={RThirdHeaderColumn}
                            EntireDataList={IStudentList}
                        />
                    </Box>
                </>
            }
        </>
    )
}

export default AllStudents;