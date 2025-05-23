import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, Grid, IconButton, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    IGetStudentPrrogressReportBody, IUpdateStudentTestMarksBody, IViewBody
} from 'src/interfaces/FinalResult/IFinalResultGenerateAll';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import {
    CDA_EntireStudentFinalResult,
    StudentDetailsGA,
    UpdateStudentTestMarks
} from 'src/requests/FinalResult/RequestFinalResultGenerateAll';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import { decodeURL, encodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import ViewResultAllTable from '../ViewResultAll/ViewResultAllTable';

const GenerateAll = ({ }) => {
    const [isResultGenerated, setIsResultGenerated] = useState(false); // State to track result generation
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {
        asStudentId,
        isGenerated,
        IsView,
        stdId
    } = useParams();

    // Decode in-place
    asStudentId = decodeURL(asStudentId);
    isGenerated = decodeURL(isGenerated);
    IsView = decodeURL(IsView);
    stdId = decodeURL(stdId);


    const asAcadmeicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));

    const [Itemlist, setItemlist] = useState([]);

    const StudentDetailsUS = useSelector((state: RootState) => state.FinalResultGenerateAll.getStudentDetails);
    const ExamDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getExamDetails);
    const TestMarksDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getTestMarksGA);
    const SubjectDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetails);
    const MarkDetailsList = useSelector((state: RootState) => state.FinalResultGenerateAll.MarkDetailsList);
    const showRankColumn = useSelector((state: RootState) => state.FinalResultGenerateAll.showRankColumn);
    const HeaderArray = useSelector((state: RootState) => state.FinalResultGenerateAll.HeaderArray);
    const SubHeaderArray = useSelector((state: RootState) => state.FinalResultGenerateAll.SubHeaderArray);
    const ShortenTestDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getShortenTestDetails);
    const EntireDataList: any = useSelector((state: RootState) => state.FinalResultGenerateAll.EntireDataList);
    const EntireStudentFinalResult: any = useSelector((state: RootState) => state.FinalResultGenerateAll.ISEntireStudentFinalResult);
    const ListDisplayNameDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.ListDisplayNameDetails);
    const ViewProgress = useSelector((state: RootState) => state.FinalResultGenerateAll.getViewResult);
    const MarkDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getMarkDetailsView);
    const SubjectDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetailsView);
    const GradesDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView);
    const showOnlyGrades = ViewProgress.some((item) => item.ShowOnlyGrades.trim() === 'true');
    const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
    const TotalconsidrationProgressReport = SubjectDetails.filter((item) => item.Total_Consideration === "N")
    const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
    const ToppersCount = UsGetSchoolSettings?.GetSchoolSettingsResult?.ToppersCount
    const TotalPerGradeView = useSelector((state: RootState) => state.FinalResultGenerateAll.getTotalPerGradeView);
    const PercentageDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getPerDetails);
    const Loading = useSelector((state: RootState) => state.FinalResultGenerateAll.Loading);
    const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');
    const [co_curricularDropdown, set_co_curricularDropdown] = useState([]);
    const [non_co_curricularDropdown, set_non_co_curricularDropdown] = useState([]);
    const hasTopRanks = TotalPerGradeView?.some((item) =>
        ['1', '2', '3'].includes(item.rank)
    );

    // Dropdown for Co-curricular subjects and Non-co-curricular subjects | Edit Cells
    useEffect(() => {
        if (EntireDataList?.ListMarkssDetails?.length > 0) {
            let initialArray = EntireDataList?.ListMarkssDetails;
            // let bothDropdownStructure = [
            //     {
            //         "Marks_Grades_Configuration_Detail_ID": "4042",
            //         "Grade_Name": "D",
            //         "Remarks": "Below Average",
            //         "IsForCoCurricularSubjects": "True"
            //     },...
            // ];
            set_co_curricularDropdown(initialArray
                .filter((item) => item.IsForCoCurricularSubjects?.toLowerCase() === "true")
                .map(item => ({
                    ...item,
                    uniqueId: `${item.Grade_Name}-${item.Marks_Grades_Configuration_Detail_ID}`
                }))
            ); // Co-curricular subjects
            set_non_co_curricularDropdown(initialArray
                .filter((item) => item.IsForCoCurricularSubjects?.toLowerCase() === "false")
                .map(item => ({
                    ...item,
                    uniqueId: `${item.Grade_Name}-${item.Marks_Grades_Configuration_Detail_ID}`
                }))
            ); // Non-co-curricular subjects
            // console.log(co_curricularDropdown, non_co_curricularDropdown);
        }
    }, [EntireDataList]);
    useEffect(() => {
        if (UsGetSchoolSettings != null)
            console.log('UsGetSchoolSettings', UsGetSchoolSettings);

        setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
    }, [UsGetSchoolSettings])

    const getListDisplayName = (ShortName) => {
        let returnVal = ""
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName == ShortName)
                returnVal = Item.DisplayName
        })
        return returnVal

    }
    const [totalCount, setTotalCount] = useState('0');
    useEffect(() => {
        if (UsGetSchoolSettings != null)
            setTotalCount(UsGetSchoolSettings?.GetSchoolSettingsResult?.ToppersCount.toString());
    }, [UsGetSchoolSettings])

    // Edit Table Cell Data 
    const [marksListArray, setMarksListArray] = useState([]);
    useEffect(() => {
        //console.log('MarkDetailsList', MarkDetailsList);

    }, [MarkDetailsList]);
    useEffect(() => {
        if (MarkDetailsList.length > 0) {
            setMarksListArray(MarkDetailsList);
        }
    }, [MarkDetailsList]);
    function findMarksScored(testId, testMarksId, subMarksId, testTypeId) {
        // MarkDetailsList
        const testObject = MarkDetailsList.find(obj => obj.Test_Id === testId);
        if (testObject) {
            const marksArray = testObject.MarksArr;
            const mark = marksArray.find(mark => mark.schoolWiseStudentTestMarksId === testMarksId && mark.testwiseSubjectMarksId === subMarksId && mark.testType === testTypeId);
            if (mark) {
                return mark.MarksScored;
            }
            return null;
        }
    }
    async function updateMarksListArray(testId, testMarksId, subMarksId, MarksScored, testTypeId) {
        // console.log(testId, testMarksId, subMarksId, MarksScored, testTypeId);

        await setMarksListArray(prevArray => {
            return prevArray.map(testObject => {
                //console.log('testObject >>>', testObject);

                if (testObject.Test_Id === testId) {
                    return {
                        ...testObject,
                        MarksArr: testObject.MarksArr.map(mark => {
                            if (mark.schoolWiseStudentTestMarksId === testMarksId && mark.testwiseSubjectMarksId === subMarksId && mark.testType === testTypeId && mark.isEdit) {
                                return {
                                    ...mark,
                                    MarksScored: MarksScored
                                };
                            }
                            return mark;
                        })
                    };
                }
                //console.log('testObject', testObject);

                return testObject;
            });
        });
        // console.log('following is markedscored', MarksScored);
        // console.log('marksListArray', marksListArray);

    }
    function updateGradeDropdown(testId, testMarksId, subMarksId, MarksScored, testTypeId) {
        //console.log('markslistarray part one', marksListArray);

        //console.log(testId, testMarksId, subMarksId, MarksScored, testTypeId);

        setMarksListArray(prevArray => {
            return prevArray.map(testObject => {
                if (testObject.Test_Id === testId) {
                    return {
                        ...testObject,
                        MarksArr: testObject.MarksArr.map(mark => {
                            if (mark.schoolWiseStudentTestMarksId === testMarksId && mark.testwiseSubjectMarksId === subMarksId && mark.isEdit && mark.MarksOrGrade === 'G') {
                                return {
                                    ...mark,
                                    MarksScored: MarksScored
                                };
                            }
                            return mark;
                        })
                    };
                }
                //console.log('newly formed array to add', testObject);
                return testObject;

            });
        });
        //console.log('following is markedscored', MarksScored);
        setTimeout(() => {
            //console.log('marksListArray', marksListArray);
        }, 1000);
    }
    function onBlurUpdateMarksListArray(testId, testMarksId, subMarksId, MarksScored, testTypeId) {
        setMarksListArray(prevArray => {
            return prevArray.map(testObject => {
                if (testObject.Test_Id === testId) {
                    return {
                        ...testObject,
                        MarksArr: testObject.MarksArr.map(mark => {
                            if (mark.schoolWiseStudentTestMarksId === testMarksId && mark.testwiseSubjectMarksId === subMarksId && mark.testType === testTypeId && mark.isEdit) {
                                return {
                                    ...mark,
                                    MarksScored: '0'
                                };
                            }
                            return mark;
                        })
                    };
                }
                return testObject;
            });
        });
    }
    function resetUpdateMarksListArray(testId, testMarksId, subMarksId, MarksScored, testTypeId) {
        setMarksListArray(prevArray => {
            return prevArray.map(testObject => {
                if (testObject.Test_Id === testId) {
                    return {
                        ...testObject,
                        MarksArr: testObject.MarksArr.map(mark => {
                            if (mark.schoolWiseStudentTestMarksId === testMarksId && mark.testwiseSubjectMarksId === subMarksId && mark.testType === testTypeId && mark.isEdit) {
                                return {
                                    ...mark,
                                    MarksScored: findMarksScored(testId, testMarksId, subMarksId, testTypeId)
                                };
                            }
                            return mark;
                        })
                    };
                }
                return testObject;
            });
        });
    }

    // #region Parent Header 
    const [dataList, setDataList] = useState<any>({});
    const [hasParentHeader, setHasParentHeader] = useState(false);
    useEffect(() => {
        setDataList(EntireDataList);
        if (EntireDataList?.listSubjectsDetails?.find((item) => item.Parent_Subject_Id !== '0')) {
            setHasParentHeader(true);
        } else {
            setHasParentHeader(false);
        }
    }, [EntireDataList]);
    function showTestTypeDetails() {
        let flag = false;
        if (dataList.ListTestTypeIdDetails?.length === 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
            return false;
        } else if (dataList.ListTestTypeIdDetails?.length === 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
            return true;
        } else if (dataList.ListTestTypeIdDetails?.length > 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
            return true;
        } else if (dataList.ListTestTypeIdDetails?.length > 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
            return true;
        }
    }
    function getColSpan(subId) {
        let colSpan = 1;
        let subMatchLength = dataList.ListSubjectidDetails.filter((itemFind) => itemFind.Subject_Id === subId).length
        if (IsTotalConsiderForProgressReport.toLowerCase() === "true") {
            colSpan = (showTestTypeDetails() ? subMatchLength : 0) + (subMatchLength !== 1 && 1);  // 🚩
            return colSpan;
        } else if (IsTotalConsiderForProgressReport.toLowerCase() === "false") {
            colSpan = subMatchLength;
            return colSpan;
        }
    }
    function findName(Id) {
        // Safeguard: Check if data.listTestIdDetails exists and filter properly
        if (!Array.isArray(dataList.listTestidDetails)) return 'No Name Available';

        const list1 = dataList.listTestidDetails.filter((item) => item.Parent_Subject_Id === Id);

        if (list1.length >= 1 && list1[0].Parent_Subject_Name) {
            return list1[0].Parent_Subject_Name; // Return the found Parent_Subject_Name
        }
        return 'No Name Available'; // Fallback if no valid name is found
    }
    function parentSubColSpan(parentSubId) {
        let colSpan = 1;
        let filteredArr = dataList.listSubjectsDetails.filter((item) => item.Parent_Subject_Id === parentSubId);
        let extendedColumn = dataList?.ListSubjectidDetails.filter(item => item.Subject_Id === filteredArr[0]?.Subject_Id);
        //console.log("extendedColumn", extendedColumn);
        if (IsTotalConsiderForProgressReport.toLowerCase() === "true") {
            if (dataList.ListTestTypeIdDetails?.length === 1) {
                colSpan = (filteredArr.length) + (dataList.ListTestTypeIdDetails?.length + 1);  // 3 + ( 1 + 1 ) 
                return colSpan;
            } else {
                colSpan = (filteredArr.length + 1) * (extendedColumn?.length + 1);  // 3 + 1 * ( 1 + 1 ) 
                return colSpan;
            }
        } else if (IsTotalConsiderForProgressReport.toLowerCase() === "false") {
            colSpan = (filteredArr.length + 1) * extendedColumn?.length;
            return colSpan;
        }
    }
    function findTestTypeForParentSubjects(parentSubId) {
        let filteredArr = dataList.listSubjectsDetails.filter((item) => item.Parent_Subject_Id === parentSubId);
        let result = dataList?.ListSubjectidDetails.filter(item => item.Subject_Id === filteredArr[0]?.Subject_Id);
        //console.log("result", result);
        //console.log("filteredArr", filteredArr);
        return result;
    }
    function findRow1() {
        let ParentSubArr = [];
        let ans = [];

        dataList.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // For top-level subjects
                ans.push({ ...item, rowSpan: 2, colSpan: getColSpan(item.Subject_Id) }); // Corrected push syntax //3
            } else if (!ParentSubArr.includes(item.Parent_Subject_Id)) { // For child subjects with unique Parent_Subject_Id
                ParentSubArr.push(item.Parent_Subject_Id);
                ans.push({
                    ...item,
                    Subject_Name: findName(item.Parent_Subject_Id),
                    rowSpan: 1,
                    colSpan: parentSubColSpan(item.Parent_Subject_Id)
                });
            }
            // No need for return since map is only used for iteration
        });
        //console.log('Row', ans)
        return ans;
    }
    function findRow2() {
        let result = dataList.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // Handle undefined or empty Parent_Subject_Id
                return { ...item, Subject_Name: '', rowSpan: 1, colSpan: getColSpan(item.Subject_Id) };//3 };
            } else {
                return { ...item, rowSpan: 1, colSpan: getColSpan(item.Subject_Id) };//3 };
            }
        });
        //console.log('Row res', result)
        result.push({
            "ID_Num": "54",
            "Subject_Name": "",
            "Subject_Id": "2365",
            "Parent_Subject_Id": "0",
            "Total_Consideration": "Y",
            "Is_CoCurricularActivity": "False",
            "Sort_Order": "7",
            "rowSpan": 1,
            "colSpan": 3
        })
        return result;
    }
    // #endregion
    const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
        asSchoolId: Number(asSchoolId),
        asAcadmeicYearId: Number(asAcadmeicYearId),
        asStudentId: Number(asStudentId),
        asUserId: Number(asUserId)
    };
    const GetSchoolSettings: GetSchoolSettingsBody = {
        asSchoolId: Number(asSchoolId),
    };
    const fetchStudentProgressReport = async () => {
        await dispatch(CDAGetSchoolSettings(GetSchoolSettings));
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody, IsTotalConsiderForProgressReport));
    }
    useEffect(() => {
        fetchStudentProgressReport();
    }, [IsTotalConsiderForProgressReport]);

    // Student Results API Call | Table 2 (Result to generate on clicking genarate button)
    useEffect(() => {
        dispatch(CDA_EntireStudentFinalResult(GetViewResultBody));
    }, []);

    const onClickClose = () => {
        navigate('/RITeSchool/Teacher/FinalResult', { state: { fromInternal: true } });
    };
    // f() to find the gradeId with Gade_Name and isCoCurricular flag
    function getGradeId(grade, isCoCurricular) {
        const dropdown = isCoCurricular === "True" ? co_curricularDropdown : non_co_curricularDropdown;
        return dropdown.find(item => item.Grade_Name === grade)?.Marks_Grades_Configuration_Detail_ID;
    }
    const getXML = () => {
        let sXML = '<SchoolWiseStudentTestMarksDetails>';
        // Ensure that marksListArray and StudentDetailsUS are properly populated before using them
        const studentID = StudentDetailsUS[0]?.Id;
        // Loop over marksListArray to create XML for each item
        marksListArray.forEach((marksItem) => {
            // Loop over the MarksArr within each marksItem to generate individual entries
            marksItem.MarksArr.forEach((mark) => {
                // Checking if isEdit is true before generating the XML entry and the student is not absent
                if (mark?.isEdit && mark?.IsAbsent === 'N') {
                    sXML +=
                        '<SchoolWiseStudentTestMarksDetail ' +
                        'School_Id="' + asSchoolId + '" ' +
                        'Academic_Year_Id="' + asAcadmeicYearId + '" ' +
                        'Student_Id="' + studentID + '" ' +
                        'TestWise_Subject_Marks_Id="' + mark.testwiseSubjectMarksId + '" ' +
                        'SchoolWise_Student_Test_Marks_Id="' + mark.schoolWiseStudentTestMarksId + '" ' +
                        'TestType_Id="' + (mark.testType !== '999' ? mark.testType : '1') + '" ' +
                        'Marks_Scored="' + (mark.MarksOrGrade === 'M' ? mark.MarksScored : '') + '" ' +
                        'Assigned_Grade_Id="' + (mark.MarksOrGrade === 'G' ? getGradeId(mark.MarksScored, mark.isCoCurricular) : '') + '" />';
                }
            });
        });

        sXML += '</SchoolWiseStudentTestMarksDetails>';
        return sXML;
    };
    const GetViewResultBody: IViewBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcadmeicYearId),
        asStudentsIds: [asStudentId],
        asStdDivId: Number(stdId),
        asWithGrace: 1,
    };
    const onSaveGenerate = async () => {
        const UpdateStudentTestMarksBody: IUpdateStudentTestMarksBody = {
            asschoolId: Number(asSchoolId),
            asStudentMarkDetails: getXML(),
            asUpdatedById: Number(asUserId),
            asUseAvarageFinalResult: "Y"
        };
        await dispatch(UpdateStudentTestMarks(UpdateStudentTestMarksBody));
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody, IsTotalConsiderForProgressReport));
        setIsResultGenerated(true); // Set the result as generated
        // dispatch(ViewResultGA(GetViewResultBody));
        dispatch(CDA_EntireStudentFinalResult(GetViewResultBody));

    };

    // const handleVisibilityClick = () => {
    //     setShowProgressReport(!showProgressReport); // Toggle visibility
    // }
    const [progressReportMessage, setProgressReportMessage] = useState(null);
    useEffect(() => {
        if (StudentDetailsUS?.length > 0) {
            const message = StudentDetailsUS.map((item, index) => (
                <b key={index}>
                    Progress Report is not available for the student : {item.Text2} - {item.Text1}.
                </b>
            ));
            setProgressReportMessage(message);
        }
    }, [StudentDetailsUS]);
    const getStudentGrade = () => {
        let returnVal = true
        TestMarksDetails.map((item) => {
            if (item.Grade == 'Absent') {
                returnVal = false
            }
            else {
                returnVal = true
            }
        })
        return returnVal
    }
    const Grade = getStudentGrade();

    const getstandardDivId = () => {

        let returnVal = '';
        StudentDetailsUS.map((item, i) => {
            returnVal = item.standardDivId
        })
        return returnVal === '' || undefined ? stdId : returnVal
    }
    function getRemarkForGradeCell(cellRemark) {
        // html element type
        let result: any;
        let remarkList = dataList.ListDisplayNameDetails?.filter((item) => item.ShortName === cellRemark);
        if (remarkList?.length > 0) {
            result = <span style={{ color: `${remarkList[0]?.ForeColor}`, fontWeight: 'bold' }}>{remarkList[0]?.DisplayName}</span>;
        }
        return result;
    }
    function findLastchildOfParentSubject(SubjectIndex) {
        let SubjectArray: any = dataList?.listSubjectsDetails;
        let parentSubjectId = SubjectArray[SubjectIndex].Parent_Subject_Id;
        // let isLastChild = SubjectArray[SubjectArray.length - 1]?.Parent_Subject_Id;
        if (SubjectArray[SubjectArray.length - 1]?.Parent_Subject_Id === parentSubjectId) {
            return true;
        } else if (SubjectArray[SubjectIndex].Parent_Subject_Id !== '0' && SubjectArray[SubjectIndex + 1]?.Parent_Subject_Id === '0') {
            return true;
        } else {
            return false;
        }
    }
    const [temp, setTemp] = useState('8');

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Final Result',
                        path: '/RITeSchool/Teacher/FinalResult/' + encodeURL(getstandardDivId())
                    },
                    {
                        title: 'Generate/View Final Result',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems="left"
                            sx={{
                                mt: { xs: 0, sm: 0 },
                                flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                            >
                                <Tooltip title='Edit marks of individual student and click on "Save".'>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            '&:hover': {
                                                backgroundColor: grey[600]
                                            }
                                        }}
                                    >
                                        <QuestionMark />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Stack>
                    </>
                }
            />
            {Loading ? <SuspenseLoader /> : <>
                {EntireDataList?.ErrorMessage !== '' && (
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            marginTop: 4,
                            backgroundColor: '#324b84',
                            padding: 1,
                            borderRadius: 2,
                            color: 'white',
                        }}
                    >
                        <b> {EntireDataList?.ErrorMessage}</b>
                    </Typography>
                )}
                {StudentDetailsUS?.length > 0 && (

                    //  {showProgressReport && ( -
                    <div >
                        {(IsView == 'false' && isGenerated) && (
                            <div>
                                <Box sx={{ background: 'white' }}>
                                    <Box>
                                        <hr />
                                        {StudentDetailsUS.map((item, index) => (
                                            <div key={index}>
                                                <Typography variant={"h4"} textAlign={'center'} color={"primary"}>
                                                    {item.School_Orgn_Name}
                                                </Typography>
                                                <hr />
                                                <Typography variant={"h3"} textAlign={'center'} color={"black"} mb={1}>
                                                    {item.School_Name}
                                                </Typography>
                                                <hr />
                                                <Typography variant={"h4"} textAlign={'center'} color={"black"} pb={1}>
                                                    Progress Report
                                                </Typography>
                                            </div>
                                        ))}
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                maxWidth: '100%',
                                                overflowX: 'auto', // Allows horizontal scrolling on small screens
                                            }}
                                        >
                                            <Table>
                                                <TableBody>
                                                    {StudentDetailsUS.map((item, i) => {
                                                        return (
                                                            <TableRow sx={{
                                                                bgcolor: '#38548A',
                                                                display: 'flex',
                                                                flexWrap: 'nowrap', // Ensures all cells stay in a single line
                                                            }} key={i}>
                                                                <TableCell
                                                                    sx={{
                                                                        flex: '0 0 200px', // Fixed width for Roll No
                                                                        minWidth: '200px',
                                                                        textAlign: 'left',
                                                                        whiteSpace: 'nowrap', // Prevent wrapping
                                                                        color: 'white',
                                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                                                    }}
                                                                ><b>Roll No: {item.Text2}</b></TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        flex: '0 0 500px', // Fixed width for Name
                                                                        minWidth: '500px',
                                                                        textAlign: 'left',
                                                                        whiteSpace: 'nowrap', // Prevent wrapping
                                                                        color: 'white',
                                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                                                    }}
                                                                ><b>Name: {item.Text1}</b></TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        flex: '1 1 auto', // Flexible width for Class
                                                                        minWidth: '200px',
                                                                        textAlign: 'left',
                                                                        whiteSpace: 'nowrap',
                                                                        color: 'white',
                                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                                                    }}
                                                                ><b>Class: {item.Text3} - {item.Text4}</b></TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        flex: '1 1 auto', // Flexible width for Year
                                                                        minWidth: '200px',
                                                                        textAlign: 'left',
                                                                        whiteSpace: 'nowrap',
                                                                        color: 'white',
                                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                                                    }}
                                                                ><b>Year: {item.Text5}</b></TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                            <Table>
                                                <TableBody>
                                                    {TotalconsidrationProgressReport.length > 0 && (
                                                        <>
                                                            <TableRow sx={{ bgcolor: 'white', p: 2, }}>
                                                                <TableCell sx={{
                                                                    minWidth: '600px',
                                                                    whiteSpace: 'nowrap',
                                                                }}><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks. </TableCell>
                                                            </TableRow>
                                                        </>
                                                    )}

                                                </TableBody>
                                            </Table></TableContainer>
                                        <Box sx={{ overflowX: 'auto', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                            <Table>
                                                <TableHead>
                                                    {hasParentHeader && (
                                                        <>
                                                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                                                <TableCell rowSpan={3} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                    <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={6}>
                                                                        Subjects &#9654;
                                                                    </Typography>
                                                                    <Typography variant={"h3"} textAlign={'center'} color={"black"}>
                                                                        &#9660; Exam
                                                                    </Typography>
                                                                </TableCell>
                                                                {findRow1().map((item, index) => (
                                                                    <TableCell
                                                                        key={index}
                                                                        colSpan={item.Total_Consideration == 'N' ? 1 : item.colSpan} rowSpan={item.rowSpan}
                                                                        sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center' }}
                                                                    >
                                                                        <Typography color="black" textAlign="center" mr={0}>
                                                                            <b style={{ marginRight: "0px" }}>
                                                                                {item.Subject_Name}
                                                                                {item.Is_CoCurricularActivity == "True" && (
                                                                                    <span style={{ color: 'red' }}>*</span>
                                                                                )}
                                                                            </b>
                                                                        </Typography>

                                                                    </TableCell>
                                                                ))}
                                                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                                    <>
                                                                        <TableCell rowSpan={3} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                            <Typography color="#38548A" textAlign={'center'} px={3}>
                                                                                <b>Total</b>
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell rowSpan={3} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                            <Typography color="#38548A" textAlign={'center'} px={1}>
                                                                                <b>%</b>
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell rowSpan={3} sx={{ minWidth: '160px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                                                                            <Typography color="#38548A" textAlign={'center'} px={0}>
                                                                                <b>Grade</b>
                                                                            </Typography>
                                                                        </TableCell>
                                                                    </>}
                                                                {StudentDetailsUS[0]?.IsFailCriteriaNotApplicable === 'N' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                                    <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                                                                        <Typography color="black" textAlign={'center'} px={0}>
                                                                            <b>Result</b>
                                                                        </Typography>
                                                                    </TableCell>}
                                                                {totalCount !== '0' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' && showRankColumn &&
                                                                    <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                                                                        <Typography color="black" textAlign={'center'} px={0}>
                                                                            <b>Rank</b>
                                                                        </Typography>
                                                                    </TableCell>}
                                                            </TableRow>
                                                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                                                {findRow2()?.map((item, index) => (
                                                                    <>
                                                                        {/* SubjectArray[SubjectIndex].Parent_Subject_Id !== '0' && (SubjectArray[SubjectIndex + 1]?.Parent_Subject_Id === '0' || SubjectArray[SubjectIndex + 1]?.Parent_Subject_Id === undefined) && */}
                                                                        {index > 0 && findRow2()[index - 1].Parent_Subject_Id !== "0" && item.Parent_Subject_Id === '0' && (
                                                                            <>
                                                                                {/* IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&  */}
                                                                                {findTestTypeForParentSubjects(findRow2()[index - 1]?.Parent_Subject_Id)?.map((item1, i) => {
                                                                                    return (
                                                                                        <TableCell key={i} rowSpan={2} sx={{ minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}`, }}>  <Typography textAlign={'center'} mr={0} sx={{ color: '#38548A', fontWeight: '800' }}>Total {item1?.ShortenTestType_Name}</Typography></TableCell>
                                                                                    )
                                                                                })}
                                                                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                                                    <TableCell rowSpan={2} sx={{ minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>  <Typography sx={{ fontWeight: '800' }} color="#38548A" textAlign={'center'} mr={4}>Total</Typography></TableCell>}
                                                                            </>
                                                                        )}
                                                                        {item.Subject_Name !== '' &&
                                                                            <TableCell key={index} colSpan={item.colSpan} rowSpan={item.rowSpan} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center', }}>
                                                                                <Typography color="black" textAlign={'center'} mr={0}>
                                                                                    <b style={{ marginRight: "5px" }}>{item.Subject_Name}
                                                                                        {item.Is_CoCurricularActivity == "True" && (
                                                                                            <span style={{ color: 'red' }}>*</span>
                                                                                        )}
                                                                                    </b>


                                                                                </Typography>
                                                                            </TableCell>}

                                                                        {/* Check if the previous item has a parent and the current item doesn't */}

                                                                    </>
                                                                ))}
                                                            </TableRow>
                                                        </>
                                                    )}
                                                    {!hasParentHeader && (
                                                        <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                                            <TableCell rowSpan={2} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={5}>
                                                                    Subjects &#9654;
                                                                </Typography>
                                                                <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={5}>
                                                                    &#9660; Exam
                                                                </Typography>
                                                            </TableCell>
                                                            {findRow1().map((item, index) => (
                                                                <TableCell key={index} colSpan={item.colSpan} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center', minWidth: '180px' }}>
                                                                    <Typography color="black" textAlign={'center'} mr={0}>
                                                                        <b style={{ marginRight: "5px" }}>{item.Subject_Name}

                                                                            {item.Total_Consideration == "N" && (
                                                                                <span style={{ color: 'red' }}>*</span>
                                                                            )}
                                                                        </b>
                                                                    </Typography>
                                                                </TableCell>
                                                            ))}
                                                            {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                                <>
                                                                    <TableCell rowSpan={3} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                        <Typography color="#38548A" textAlign={'center'} px={3}>
                                                                            <b>Total</b>
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell rowSpan={3} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                        <Typography color="#38548A" textAlign={'center'} px={3}>
                                                                            <b>%</b>
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell rowSpan={3} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                        <Typography color="#38548A" textAlign={'center'} px={5}>
                                                                            <b>Grade</b>
                                                                        </Typography>
                                                                    </TableCell>
                                                                </>}
                                                            {StudentDetailsUS[0]?.IsFailCriteriaNotApplicable === 'N' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                                <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                                                                    <Typography color="black" textAlign={'center'} px={0}>
                                                                        <b>Result</b>
                                                                    </Typography>
                                                                </TableCell>}
                                                            {totalCount !== '0' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' && showRankColumn &&
                                                                <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                                                                    <Typography color="black" textAlign={'center'} px={0}>
                                                                        <b>Rank</b>
                                                                    </Typography>
                                                                </TableCell>}
                                                        </TableRow>
                                                    )}
                                                    <TableRow>
                                                        {/* <TableCell></TableCell> ListTestTypeIdDetails */}
                                                        {dataList.listSubjectsDetails?.map((item, index1) => (
                                                            <>
                                                                {dataList.ListSubjectidDetails.map((item2, index) => (
                                                                    <>
                                                                        {item.Subject_Id === item2.Subject_Id &&
                                                                            <TableCell key={index} sx={{ py: 1, alignItems: 'center', minWidth: '120px', border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                                                                <Typography color="#38548A" textAlign={'center'} >
                                                                                    <b style={{ marginRight: "0px" }}>{item2.ShortenTestType_Name}</b>
                                                                                </Typography>
                                                                            </TableCell>
                                                                        }
                                                                    </>
                                                                ))}
                                                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' && dataList.ListSubjectidDetails.filter((itemFind) => itemFind.Subject_Id === item.Subject_Id).length > 1 && (
                                                                    <TableCell key={`total-${index1}`} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                                                        <Typography color="#38548A" textAlign={'center'} px={2}>
                                                                            <b>Total</b>
                                                                        </Typography>
                                                                    </TableCell>
                                                                )}
                                                                {item?.Is_CoCurricularActivity.toLowerCase() === 'true' && item?.Total_Consideration === 'N' && !Boolean(dataList.ListSubjectidDetails.find((itemFind) => itemFind.Subject_Id === item.Subject_Id)) &&
                                                                    <TableCell key={index1} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                                                        <Typography color="#38548A" textAlign={'center'} mr={0}>
                                                                            <b>Grade</b>
                                                                        </Typography>
                                                                    </TableCell>
                                                                }
                                                            </>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                {marksListArray.length > 0 && marksListArray.map((testItem, i) => (
                                                    <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center', }}>
                                                        <TableRow>
                                                            <TableCell sx={{ py: 1, alignItems: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}`, maxWidth: '100%', minWidth: '300px' }}>
                                                                <b> {testItem.TestName}</b>
                                                            </TableCell>
                                                            {testItem.MarksArr.map((MarkItem) => (
                                                                <TableCell sx={{ py: 1, alignItems: 'center', fontWeight: i === marksListArray.length - 1 ? 'bold' : 'normal', textAlign: 'center', backgroundColor: 'white', border: (theme) => `1px solid ${theme.palette.grey[200]}`, minWidth: '150px', width: '150px' }}>
                                                                    <span style={{ fontWeight: MarkItem?.IsGrades === 'Y' || i === marksListArray.length - 1 ? 'bold' : 'normal', display: 'flex', justifyContent: 'center', alignItems: 'center', color: MarkItem?.isResult ? MarkItem?.cellColor : 'inherit' }}>
                                                                        {
                                                                            !MarkItem
                                                                                ? '-'
                                                                                : (MarkItem?.MarksScored === undefined || MarkItem?.MarksScored === null || MarkItem?.MarksScored === '-'
                                                                                    ? '-'
                                                                                    : (MarkItem?.IsAbsent !== 'N'
                                                                                        ? getRemarkForGradeCell(MarkItem.IsAbsent)
                                                                                        : (MarkItem?.MarksScored == null || MarkItem?.TotalMarks == null || MarkItem?.MarksScored === '-'
                                                                                            ? '-'
                                                                                            : <>
                                                                                                {MarkItem?.isEdit && i !== marksListArray.length - 1
                                                                                                    ? MarkItem?.MarksOrGrade === 'M' ? <TextField
                                                                                                        size="small"
                                                                                                        value={MarkItem?.MarksScored}
                                                                                                        inputProps={{
                                                                                                            maxLength: 3,
                                                                                                            pattern: '[0-9]*'
                                                                                                        }}
                                                                                                        onChange={(e) => {
                                                                                                            const value = e.target.value.replace(/[^0-9]/g, '')
                                                                                                            if (value.length <= 3) {
                                                                                                                updateMarksListArray(MarkItem.testId, MarkItem.schoolWiseStudentTestMarksId, MarkItem.testwiseSubjectMarksId, value, MarkItem.testType);
                                                                                                            }
                                                                                                        }}
                                                                                                        onBlur={(e) => {
                                                                                                            if (e.target.value === '') {
                                                                                                                onBlurUpdateMarksListArray(MarkItem.testId, MarkItem.schoolWiseStudentTestMarksId, MarkItem.testwiseSubjectMarksId, '0', MarkItem.testType);
                                                                                                            } else if (Number(e.target.value) > Number(MarkItem.TotalMarks)) {
                                                                                                                resetUpdateMarksListArray(MarkItem.testId, MarkItem.schoolWiseStudentTestMarksId, MarkItem.testwiseSubjectMarksId, '0', MarkItem.testType);

                                                                                                            }
                                                                                                        }}
                                                                                                        sx={{ width: '60px', marginRight: '8px' }}
                                                                                                    /> : <Select
                                                                                                        size="small"
                                                                                                        value={MarkItem?.MarksScored || ''}
                                                                                                        onChange={(e) => {
                                                                                                            // updateMarksListArray(MarkItem.testId, MarkItem.schoolWiseStudentTestMarksId, MarkItem.testwiseSubjectMarksId, e.target.value, MarkItem.testType);
                                                                                                            updateGradeDropdown(MarkItem.testId, MarkItem.schoolWiseStudentTestMarksId, MarkItem.testwiseSubjectMarksId, e.target.value, MarkItem.testType);
                                                                                                        }}
                                                                                                        sx={{ width: '80px', marginRight: '8px' }}
                                                                                                    >
                                                                                                        {(MarkItem?.isCoCurricular === 'True' ? co_curricularDropdown : non_co_curricularDropdown)?.map((grade) => (
                                                                                                            <MenuItem key={grade.Marks_Grades_Configuration_Detail_ID} value={grade.Grade_Name}>
                                                                                                                {grade.Grade_Name}
                                                                                                            </MenuItem>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                    : MarkItem.MarksScored
                                                                                                }
                                                                                                {MarkItem.TotalMarks !== "-" && ` / ${MarkItem.TotalMarks}`}
                                                                                            </>
                                                                                        )
                                                                                    )
                                                                                )
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableBody>
                                                ))}
                                            </Table>
                                        </Box>

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                                    <Button
                                        onClick={onSaveGenerate}
                                        // variant="contained"
                                        // color="error"
                                        sx={{
                                            color: 'green',
                                            //   backgroundColor: green[500],
                                            '&:hover': {
                                                color: 'green',
                                                backgroundColor: green[100]
                                            }
                                        }}
                                    >
                                        Save & Generate Result
                                    </Button>
                                </Box>
                            </div>
                        )}
                        {Loading && <SuspenseLoader />}
                        {(isResultGenerated || isGenerated == 'Y') && ( // Conditionally display the final result section 
                            EntireStudentFinalResult.length > 0 && EntireStudentFinalResult?.map((studentResult, key) => {
                                return (
                                    <>
                                        <ViewResultAllTable stdFinalResult={studentResult} key={key}
                                            IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport}
                                            ToppersCount={ToppersCount} isAllStdSelect={false}
                                        />
                                    </>
                                )
                            })
                        )}
                    </div>
                )
                }

                {
                    !StudentDetailsUS && (
                        <Box>
                            {StudentDetailsUS.map((item, i) => (
                                <Typography key={i}>
                                    Progress Report is not available for the student:{item.Text2} {item.Text1}
                                </Typography>
                            ))}
                        </Box>
                    )
                }
            </>
            }
        </Box >

    );
};

export default GenerateAll;
