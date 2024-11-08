import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    IGetStudentPrrogressReportBody, IUpdateStudentTestMarksBody, IViewBody
} from 'src/interfaces/FinalResult/IFinalResultGenerateAll';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import {
    StudentDetailsGA,
    UpdateStudentTestMarks, ViewResultGA
} from 'src/requests/FinalResult/RequestFinalResultGenerateAll';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const GenerateAll = ({ }) => {
    const [isResultGenerated, setIsResultGenerated] = useState(false); // State to track result generation
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { asStudentId, isGenerated, IsView } = useParams();
    //console.log("asStudentId", asStudentId);

    const asAcadmeicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));

    const [Itemlist, setItemlist] = useState([]);

    const StudentDetailsUS = useSelector((state: RootState) => state.FinalResultGenerateAll.getStudentDetails);
    const ExamDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getExamDetails);
    const TestMarksDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getTestMarksGA);
    const SubjectDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetails);
    // console.log(SubjectDetails, 'SubjectDetails');
    const MarkDetailsList = useSelector((state: RootState) => state.FinalResultGenerateAll.MarkDetailsList);
    const HeaderArray = useSelector((state: RootState) => state.FinalResultGenerateAll.HeaderArray);
    const SubHeaderArray = useSelector((state: RootState) => state.FinalResultGenerateAll.SubHeaderArray);
    const ShortenTestDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getShortenTestDetails);
    const EntireDataList: any = useSelector((state: RootState) => state.FinalResultGenerateAll.EntireDataList);
    const ListDisplayNameDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.ListDisplayNameDetails);
    console.log(ListDisplayNameDetails, "rows");

    const ViewProgress = useSelector((state: RootState) => state.FinalResultGenerateAll.getViewResult);
    const MarkDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getMarkDetailsView);
    const SubjectDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetailsView);
    const GradesDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView);
    const showOnlyGrades = ViewProgress.some((item) => item.ShowOnlyGrades.trim() === 'true');
    const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
    const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
    const TotalPerGradeView = useSelector((state: RootState) => state.FinalResultGenerateAll.getTotalPerGradeView);
    const PercentageDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getPerDetails);
    const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');

    useEffect(() => {
        if (UsGetSchoolSettings != null)
            setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
        console.log(IsTotalConsiderForProgressReport, "IsTotalConsiderForProgressReport ✅✅✅✅");
        // setIsTotalConsiderForProgressReport('False');
    }, [UsGetSchoolSettings])

    const getListDisplayName = (ShortName) => {
        let returnVal = ""
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName == ShortName)
                returnVal = Item.DisplayName
        })
        return returnVal

    }

    // #region Parent Header 
    const [dataList, setDataList] = useState<any>({});
    const [hasParentHeader, setHasParentHeader] = useState(false);
    useEffect(() => {
        setDataList(EntireDataList);
        console.log(dataList, "dataList");
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
        if (IsTotalConsiderForProgressReport.toLowerCase() === "true") {
            if (dataList.ListTestTypeIdDetails?.length === 1) {
                colSpan = (filteredArr.length) + (dataList.ListTestTypeIdDetails?.length + 1);  // 3 + ( 1 + 1 ) 
                return colSpan;
            } else {
                colSpan = (filteredArr.length + 1) * (dataList.ListTestTypeIdDetails?.length + 1);  // 3 + 1 * ( 1 + 1 ) 
                return colSpan;
            }
        } else if (IsTotalConsiderForProgressReport.toLowerCase() === "false") {
            colSpan = (filteredArr.length + 1) * dataList.ListTestTypeIdDetails?.length;
            return colSpan;
        }
    }
    function findRow1() {
        let ParentSubArr = [];
        let ans = [];

        dataList.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // For top-level subjects
                ans.push({ ...item, rowSpan: 2, colSpan: getColSpan(item.Subject_Id) }); // Corrected push syntax //3
            } else if (!ParentSubArr.includes(item.Parent_Subject_Id)) { // For child subjects with unique Parent_Subject_Id
                ParentSubArr.push(item.Parent_Subject_Id);
                console.log(item.Parent_Subject_Id);
                ans.push({
                    ...item,
                    Subject_Name: findName(item.Parent_Subject_Id),
                    rowSpan: 1,
                    colSpan: parentSubColSpan(item.Parent_Subject_Id)
                });
            }
            // No need for return since map is only used for iteration
        });
        console.log('ans ⭐⭐🦥🔥', ans);
        return ans;
    }
    function findRow2() {
        return dataList.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // Handle undefined or empty Parent_Subject_Id
                return { ...item, Subject_Name: '', rowSpan: 1, colSpan: getColSpan(item.Subject_Id) };//3 };
            } else {
                return { ...item, rowSpan: 1, colSpan: getColSpan(item.Subject_Id) };//3 };
            }
        });
    }
    // #endregion
    useEffect(() => {
        const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
            asSchoolId: Number(asSchoolId),
            asAcadmeicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asUserId: Number(asUserId)
        };
        dispatch(CDAGetSchoolSettings(GetSchoolSettings));
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody, IsTotalConsiderForProgressReport));
    }, [IsTotalConsiderForProgressReport]);

    useEffect(() => {
        const GetViewResultBody: IViewBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asWithGrace: 0,
        };
        dispatch(ViewResultGA(GetViewResultBody));
    }, []);

    const GetSchoolSettings: GetSchoolSettingsBody = {
        asSchoolId: Number(asSchoolId),
    };

    const onClickClose = () => {
        navigate('/extended-sidebar/Teacher/FinalResult');
    };

    const getXML = () => {
        let sXML =
            '<SchoolWiseStudentTestMarksDetails>';
        Itemlist.map((Item) => {
            sXML =
                sXML +
                '<SchoolWiseStudentTestMarksDetail >' +
                '<School_Id>' + asSchoolId + '</School_Id>' +
                '<Academic_Year_Id=>' + asAcadmeicYearId + '</Academic_Year_Id=>' +
                '<Student_Id>' + Item.Student_Id + '</Student_Id>' +
                '<TestWise_Subject_Marks_Id>' + Item.TestWise_Subject_Marks_Id + '</TestWise_Subject_Marks_Id>' +
                '<SchoolWise_Student_Test_Marks_Id>' + Item.SchoolWise_Student_Test_Marks_Id + '</SchoolWise_Student_Test_Marks_Id>' +
                '<TestType_Id>' + Item.TestType_Id + '</TestType_Id>' +
                '<Marks_Scored>' + Item.Marks_Scored + '</Marks_Scored> ' +
                '<Assigned_Grade_Id>' + Item.Grade_id + '</Assigned_Grade_Id> ' +
                '/>';
        });

        sXML = sXML + '</SchoolWiseStudentTestMarksDetails>';
        return sXML;
    };

    const onSaveGenerate = () => {
        const UpdateStudentTestMarksBody: IUpdateStudentTestMarksBody = {
            asschoolId: Number(asSchoolId),
            asStudentMarkDetails: getXML(),
            asUpdatedById: 0,
            asUseAvarageFinalResult: ""
        };
        dispatch(UpdateStudentTestMarks(UpdateStudentTestMarksBody));
        setIsResultGenerated(true); // Set the result as generated

    };

    // const handleVisibilityClick = () => {
    //     setShowProgressReport(!showProgressReport); // Toggle visibility
    // }

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

        let returnVal = ''
        StudentDetailsUS.map((item, i) => {
            returnVal = item.standardDivId
        })
        return returnVal
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
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Final Result',
                        path: '/extended-sidebar/Teacher/FinalResult/' + getstandardDivId()
                    },
                    {
                        title: 'Generate/View Final Result',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Box>
                            <Tooltip title={"View result of selected student."}>
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
                        </Box>                    </>
                }
            />
            {StudentDetailsUS && (

                //  {showProgressReport && (
                <div >
                    {(IsView == 'false' && isGenerated) && (
                        <div>
                            <Box sx={{ background: 'white' }}>
                                <Box>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"primary"}>
                                        Pawar Public Charitable Trust's
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h3"} textAlign={'center'} color={"black"} mb={1}>
                                        PAWAR PUBLIC SCHOOL
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"black"} pb={1}>
                                        Progress Report
                                    </Typography>
                                    <Table>
                                        <TableBody>
                                            {StudentDetailsUS.map((item, i) => {
                                                return (
                                                    <TableRow sx={{ bgcolor: '#38548A' }} key={i}>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No: {item.Text2}</b></TableCell>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name: {item.Text1}</b></TableCell>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class: {item.Text3} - {item.Text4}</b></TableCell>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year: {item.Text5}</b></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
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
                                                                    <TableCell rowSpan={3} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                                                                        <Typography color="#38548A" textAlign={'center'} px={1}>
                                                                            <b>Grade</b>
                                                                        </Typography>
                                                                    </TableCell>
                                                                </>}
                                                        </TableRow>
                                                        <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                                            {findRow2()?.map((item, index) => (
                                                                <>
                                                                    {index > 0 && findRow2()[index - 1].Parent_Subject_Id !== "0" && item.Parent_Subject_Id === '0' && (
                                                                        <>
                                                                            {/* IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&  */}
                                                                            {dataList?.ListTestTypeIdDetails?.map((item1, i) => {
                                                                                return (
                                                                                    <TableCell key={i} rowSpan={2} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, }}>  <Typography textAlign={'center'} mr={0} sx={{ color: '#38548A', fontWeight: '800' }}>Total {item1?.ShortenTestType_Name}</Typography></TableCell>
                                                                                )
                                                                            })}
                                                                            {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                                                <TableCell rowSpan={2} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>  <Typography sx={{ fontWeight: '800' }} color="#38548A" textAlign={'center'} mr={4}>Total</Typography></TableCell>}
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
                                                        <TableCell rowSpan={2} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                            <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={5}>
                                                                Subjects &#9654;
                                                            </Typography>
                                                            <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={5}>
                                                                &#9660; Exam
                                                            </Typography>
                                                        </TableCell>
                                                        {findRow1().map((item, index) => (
                                                            <TableCell key={index} colSpan={item.colSpan} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center', minWidth: '180px' }}>
                                                                <Typography color="black" textAlign={'center'} mr={0}>
                                                                    <b style={{ marginRight: "5px" }}>{item.Subject_Name}

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
                                                                    <Typography color="#38548A" textAlign={'center'} px={3}>
                                                                        <b>%</b>
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell rowSpan={3} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                                    <Typography color="#38548A" textAlign={'center'} px={5}>
                                                                        <b>Grade</b>
                                                                    </Typography>
                                                                </TableCell>
                                                            </>}
                                                    </TableRow>
                                                )}
                                                <TableRow>
                                                    {/* <TableCell></TableCell> ListTestTypeIdDetails */}


                                                    {dataList.listSubjectsDetails?.map((item, index1) => (
                                                        <>
                                                            {dataList.ListSubjectidDetails.map((item2, index) => (
                                                                <>
                                                                    {item.Subject_Id === item2.Subject_Id &&
                                                                        <TableCell key={index} sx={{ alignItems: 'center', minWidth: '100px', border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                                                            <Typography color="#38548A" textAlign={'center'} >
                                                                                <b style={{ marginRight: "0px" }}>{item2.ShortenTestType_Name}</b>
                                                                            </Typography>
                                                                        </TableCell>
                                                                    }
                                                                </>
                                                            ))}
                                                            {IsTotalConsiderForProgressReport.toLowerCase() === 'true' && dataList.ListSubjectidDetails.filter((itemFind) => itemFind.Subject_Id === item.Subject_Id).length > 1 && (
                                                                <TableCell key={`total-${index1}`} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                                                    <Typography color="#38548A" textAlign={'center'} px={2}>
                                                                        <b>Total</b>
                                                                    </Typography>
                                                                </TableCell>
                                                            )}
                                                            {item?.Is_CoCurricularActivity.toLowerCase() === 'true' && item?.Total_Consideration === 'N' && !Boolean(dataList.ListSubjectidDetails.find((itemFind) => itemFind.Subject_Id === item.Subject_Id)) &&
                                                                <TableCell key={index1} sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                                                    <Typography color="#38548A" textAlign={'center'} mr={0}>
                                                                        <b>Grade</b>
                                                                    </Typography>
                                                                </TableCell>
                                                            }
                                                        </>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            {MarkDetailsList.map((testItem, i) => (
                                                <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center', }}>
                                                    <TableRow>
                                                        <TableCell sx={{ alignItems: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                            <b> {testItem.TestName}</b>
                                                        </TableCell>

                                                        {testItem.MarksArr.map((MarkItem) => (
                                                            <TableCell sx={{ alignItems: 'center', pl: 3, backgroundColor: 'white', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
                                                                {
                                                                    !MarkItem
                                                                        ? '-'
                                                                        : (MarkItem?.MarksScored === ''
                                                                            ? '-'
                                                                            : (MarkItem?.IsAbsent !== 'N'
                                                                                ? getRemarkForGradeCell(MarkItem.IsAbsent)
                                                                                : (MarkItem?.MarksScored == null || MarkItem?.TotalMarks == null
                                                                                    ? '-'
                                                                                    : MarkItem.MarksScored + (MarkItem.TotalMarks === "-" ? "" : (" / " + MarkItem.TotalMarks))
                                                                                )
                                                                            )
                                                                        )
                                                                }

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
                    {(isResultGenerated || isGenerated == 'Y') && ( // Conditionally display the final result section
                        <Box sx={{ mt: 2, background: 'white', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                            <Box>
                                <hr />
                                {ViewProgress.length > 0 && (
                                    <>
                                        <Typography variant="h4" textAlign={'center'} color={'primary'} mb={1}>
                                            {ViewProgress[0].Text7}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h3" textAlign={'center'} color={'black'} mb={1}>
                                            {ViewProgress[0].Text6}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h4" textAlign={'center'} color={'black'} pb={1}>
                                            Final Result
                                        </Typography>
                                    </>
                                )}

                                <Table>
                                    <TableBody>
                                        {ViewProgress.map((item, i) => {
                                            return (
                                                <TableRow sx={{ bgcolor: '#38548A' }} key={i}>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Roll No: <b>{item.Text2}</b></TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Name: <b>{item.Text1}</b></TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Class: <b>{item.Text3} - {item.Text4}</b></TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Year: <b>{item.Text5}</b></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableBody>
                                        {totalconsidration.length > 0 && (
                                            <>
                                                <TableRow sx={{ bgcolor: 'white', p: 2 }}>
                                                    <TableCell sx={{ pl: 10 }}><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks </TableCell>
                                                </TableRow>
                                            </>
                                        )}

                                    </TableBody>
                                </Table>
                                <Box sx={{ overflowX: 'auto', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                    <Table sx={{}}>
                                        <TableBody >
                                            <TableRow sx={{ bgcolor: '#F0F0F0' }}>
                                                <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                    <Typography variant={"h4"} textAlign={'center'} color={"black"} ml={2}>
                                                        Subjects
                                                    </Typography>
                                                </TableCell>
                                                {SubjectDetailsView.map((subject, i) => (

                                                    <TableCell key={subject.Subject_Id} sx={{ textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}><b>{subject.Name}  </b>
                                                        {(subject.Total_Consideration === "N") && <span style={{ color: 'red' }}>*</span>}
                                                    </TableCell>
                                                ))}
                                                {IsTotalConsiderForProgressReport === "True" && !showOnlyGrades && (
                                                    <>
                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>Total</TableCell>
                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>%</TableCell>
                                                    </>
                                                )}
                                                {IsTotalConsiderForProgressReport === "True" && (
                                                    <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
                                                )}
                                            </TableRow>

                                            <TableRow>
                                                {!showOnlyGrades && (
                                                    <>
                                                        {/* <TableCell sx={{ backgroundColor: '#F0F0F0' }}>
                                                            <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                                                Marks
                                                            </Typography>
                                                        </TableCell> */}

                                                        {MarkDetailsView.map((marks, i) => (
                                                            <TableCell key={i} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}>
                                                                {marks.IsAbsent === '1' ? '-' : marks.Name}
                                                            </TableCell>
                                                        ))}

                                                        {IsTotalConsiderForProgressReport === "True" && TotalPerGradeView.map((totalData, index) => {
                                                            if (index === 0) {
                                                                const matchingRemark = PercentageDetails?.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                                return (
                                                                    <>
                                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}>{totalData.TotalMarks}</TableCell>
                                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}>{totalData.Percentage}%</TableCell>
                                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}>
                                                                            <Typography variant="body2">
                                                                                {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                                                            </Typography>
                                                                        </TableCell>
                                                                    </>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </>
                                                )}
                                            </TableRow>
                                            {/* <TableRow>
                                                {MarkDetailsView.map((subject, i) => (
                                                    <TableCell key={i} align="center">  {subject.IsAbsent === '1' ? '-' : subject.Name}</TableCell>
                                                ))}
                                            </TableRow> */}
                                            <TableRow>
                                                {/* {GradesDetailsView.map((Grade, i) => (
                                                    <TableCell key={i} align="center"> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                                ))} */}
                                                {GradesDetailsView.map((Grade, i) => (
                                                    <TableCell key={i} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                                ))}
                                                {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                                    <>
                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                    </>
                                                )}
                                                {showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                                    <>
                                                        {TotalPerGradeView.map((totalData, index) => {
                                                            if (index === 0) {
                                                                const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                                return (
                                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                                        <Typography variant="body2">
                                                                            {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                                                        </Typography>
                                                                    </TableCell>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </>
                                                )}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        </Box>
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
        </Box >

    );
};

export default GenerateAll;
